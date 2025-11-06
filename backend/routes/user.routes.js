import express from 'express'
import User from '../models/User.model.js'
import { protect, authorize } from '../middleware/auth.js'
import { idValidation, createUserValidation } from '../middleware/validation.js'

const router = express.Router()

// All routes are protected and admin only
router.use(protect, authorize('admin'))

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private (Admin)
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const role = req.query.role

    const query = role ? { role } : {}

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-password')

    const total = await User.countDocuments(query)

    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    next(error)
  }
})

// @desc    Create new user
// @route   POST /api/v1/users
// @access  Private (Admin)
router.post('/', createUserValidation, async (req, res, next) => {
  try {
    const { name, email, password, role, bio, socialLinks, isActive } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
      bio,
      socialLinks,
      isActive: isActive !== undefined ? isActive : true
    })

    // Remove password from response
    const userResponse = user.toObject()
    delete userResponse.password

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userResponse
    })
  } catch (error) {
    next(error)
  }
})

// @desc    Get single user
// @route   GET /api/v1/users/:id
// @access  Private (Admin)
router.get('/:id', idValidation, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('articles')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    next(error)
  }
})

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private (Admin)
router.put('/:id', idValidation, async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).select('-password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    })
  } catch (error) {
    next(error)
  }
})

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private (Admin)
router.delete('/:id', idValidation, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      })
    }

    await user.deleteOne()

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    })
  } catch (error) {
    next(error)
  }
})

// @desc    Get user statistics
// @route   GET /api/v1/users/stats/overview
// @access  Private (Admin)
router.get('/stats/overview', async (req, res, next) => {
  try {
    // Total users by role
    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ])

    // Active vs Inactive users
    const activeUsers = await User.countDocuments({ isActive: true })
    const inactiveUsers = await User.countDocuments({ isActive: false })

    // Recently joined users (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const recentUsers = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    })

    // Users with recent activity (logged in within last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const activeInLast7Days = await User.countDocuments({
      lastLogin: { $gte: sevenDaysAgo }
    })

    // Total users
    const totalUsers = await User.countDocuments()

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        recentUsers,
        activeInLast7Days,
        usersByRole: usersByRole.reduce((acc, curr) => {
          acc[curr._id] = curr.count
          return acc
        }, {})
      }
    })
  } catch (error) {
    next(error)
  }
})

// @desc    Get user login history
// @route   GET /api/v1/users/:id/login-history
// @access  Private (Admin)
router.get('/:id/login-history', idValidation, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('name email loginHistory sessions lastLogin')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          name: user.name,
          email: user.email,
          lastLogin: user.lastLogin
        },
        loginHistory: user.loginHistory || [],
        sessions: user.sessions || []
      }
    })
  } catch (error) {
    next(error)
  }
})

// @desc    Revoke user session
// @route   DELETE /api/v1/users/:id/sessions/:sessionIndex
// @access  Private (Admin)
router.delete('/:id/sessions/:sessionIndex', idValidation, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const sessionIndex = parseInt(req.params.sessionIndex)
    
    if (user.sessions && user.sessions[sessionIndex]) {
      user.sessions[sessionIndex].isActive = false
      await user.save()

      res.status(200).json({
        success: true,
        message: 'Session revoked successfully'
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'Session not found'
      })
    }
  } catch (error) {
    next(error)
  }
})

export default router
