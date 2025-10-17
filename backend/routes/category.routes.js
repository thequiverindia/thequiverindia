import express from 'express'
import {
  getCategories,
  getCategoryBySlug,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getArticlesByCategory
} from '../controllers/category.controller.js'
import { protect, authorize } from '../middleware/auth.js'
import { createCategoryValidation, idValidation } from '../middleware/validation.js'

const router = express.Router()

// Public routes
router.get('/', getCategories)
router.get('/slug/:slug', getCategoryBySlug)
router.get('/slug/:slug/articles', getArticlesByCategory)

// Protected routes (Admin only)
router.get('/:id', protect, authorize('admin'), idValidation, getCategoryById)
router.post('/', protect, authorize('admin'), createCategoryValidation, createCategory)
router.put('/:id', protect, authorize('admin'), idValidation, updateCategory)
router.delete('/:id', protect, authorize('admin'), idValidation, deleteCategory)

export default router

