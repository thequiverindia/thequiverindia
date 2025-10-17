import express from 'express'
import {
  getAds,
  getAllAds,
  getAd,
  createAd,
  updateAd,
  deleteAd,
  trackImpression,
  trackClick,
  getAdAnalytics
} from '../controllers/ad.controller.js'
import { protect, authorize } from '../middleware/auth.js'
import { createAdValidation, idValidation } from '../middleware/validation.js'

const router = express.Router()

// Public routes
router.get('/', getAds)
router.post('/:id/impression', trackImpression)
router.post('/:id/click', trackClick)

// Protected routes (Admin only)
router.get('/all', protect, authorize('admin'), getAllAds)
router.get('/:id', protect, authorize('admin'), idValidation, getAd)
router.post('/create', protect, authorize('admin'), createAdValidation, createAd)
router.put('/:id', protect, authorize('admin'), idValidation, updateAd)
router.delete('/:id', protect, authorize('admin'), idValidation, deleteAd)
router.get('/:id/analytics', protect, authorize('admin'), idValidation, getAdAnalytics)

export default router

