import express from 'express'
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  refreshToken,
  logout
} from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.js'
import { registerValidation, loginValidation } from '../middleware/validation.js'

const router = express.Router()

// Public routes
router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)
router.post('/refresh', refreshToken)

// Protected routes
router.use(protect) // All routes below require authentication

router.get('/me', getMe)
router.put('/profile', updateProfile)
router.put('/password', changePassword)
router.post('/logout', logout)

export default router

