import Ad from '../models/Ad.model.js'

// @desc    Get active ads for placement
// @route   GET /api/v1/ads
// @access  Public
export const getAds = async (req, res, next) => {
  try {
    const { placement = 'all', limit = 5 } = req.query

    const ads = await Ad.getActiveAds(placement, parseInt(limit))

    res.status(200).json({
      success: true,
      data: ads
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get all ads (admin)
// @route   GET /api/v1/ads/all
// @access  Private (Admin)
export const getAllAds = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const statusFilter = req.query.status // 'draft', 'published', 'paused', 'expired', 'all'

    let query = {}
    const now = new Date()

    if (statusFilter && statusFilter !== 'all') {
      if (statusFilter === 'expired') {
        query = {
          'schedule.endDate': { $lt: now }
        }
      } else if (statusFilter === 'active') {
        query = {
          status: 'published',
          isActive: true,
          'schedule.startDate': { $lte: now },
          'schedule.endDate': { $gte: now }
        }
      } else {
        query.status = statusFilter
      }
    }

    const ads = await Ad.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('createdBy', 'name email')
      .populate('targeting.categories', 'name')

    const total = await Ad.countDocuments(query)

    // Calculate stats
    const stats = {
      total: await Ad.countDocuments(),
      draft: await Ad.countDocuments({ status: 'draft' }),
      published: await Ad.countDocuments({ status: 'published' }),
      paused: await Ad.countDocuments({ status: 'paused' }),
      expired: await Ad.countDocuments({ 'schedule.endDate': { $lt: now } }),
      active: await Ad.countDocuments({
        status: 'published',
        isActive: true,
        'schedule.startDate': { $lte: now },
        'schedule.endDate': { $gte: now }
      })
    }

    res.status(200).json({
      success: true,
      data: {
        ads,
        stats,
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
}

// @desc    Get single ad
// @route   GET /api/v1/ads/:id
// @access  Private (Admin)
export const getAd = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('targeting.categories', 'name slug')

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: 'Ad not found'
      })
    }

    res.status(200).json({
      success: true,
      data: ad
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create new ad
// @route   POST /api/v1/ads
// @access  Private (Admin)
export const createAd = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id

    const ad = await Ad.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Ad created successfully',
      data: ad
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update ad
// @route   PUT /api/v1/ads/:id
// @access  Private (Admin)
export const updateAd = async (req, res, next) => {
  try {
    const ad = await Ad.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: 'Ad not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Ad updated successfully',
      data: ad
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete ad
// @route   DELETE /api/v1/ads/:id
// @access  Private (Admin)
export const deleteAd = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id)

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: 'Ad not found'
      })
    }

    await ad.deleteOne()

    res.status(200).json({
      success: true,
      message: 'Ad deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Track ad impression
// @route   POST /api/v1/ads/:id/impression
// @access  Public
export const trackImpression = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id)

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: 'Ad not found'
      })
    }

    await ad.incrementImpressions()

    res.status(200).json({
      success: true
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Track ad click
// @route   POST /api/v1/ads/:id/click
// @access  Public
export const trackClick = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id)

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: 'Ad not found'
      })
    }

    await ad.incrementClicks()

    res.status(200).json({
      success: true,
      data: { link: ad.link }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get ad analytics
// @route   GET /api/v1/ads/:id/analytics
// @access  Private (Admin)
export const getAdAnalytics = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id)

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: 'Ad not found'
      })
    }

    const analytics = {
      impressions: ad.impressions,
      clicks: ad.clicks,
      ctr: ad.ctr,
      daysActive: Math.ceil((new Date() - ad.schedule.startDate) / (1000 * 60 * 60 * 24)),
      daysRemaining: Math.ceil((ad.schedule.endDate - new Date()) / (1000 * 60 * 60 * 24))
    }

    res.status(200).json({
      success: true,
      data: analytics
    })
  } catch (error) {
    next(error)
  }
}

