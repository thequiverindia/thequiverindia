import express from 'express'
import {
  getArticles,
  getArticleBySlug,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
  getTrendingArticles,
  getFeaturedArticles,
  incrementShares,
  toggleLike,
  addComment
} from '../controllers/article.controller.js'
import { protect, authorize, optionalAuth } from '../middleware/auth.js'
import { 
  createArticleValidation, 
  updateArticleValidation,
  searchValidation 
} from '../middleware/validation.js'

const router = express.Router()

// Public routes
router.get('/', getArticles)
router.get('/search', searchValidation, searchArticles)
router.get('/trending', getTrendingArticles)
router.get('/featured', getFeaturedArticles)
router.get('/slug/:slug', getArticleBySlug)
router.post('/:id/share', incrementShares)

// Protected routes
router.get('/:id', protect, authorize('author', 'editor', 'admin'), getArticleById)
router.post('/', protect, authorize('author', 'editor', 'admin'), createArticleValidation, createArticle)
router.put('/:id', protect, authorize('author', 'editor', 'admin'), updateArticleValidation, updateArticle)
router.delete('/:id', protect, authorize('editor', 'admin'), deleteArticle)
router.post('/:id/like', protect, toggleLike)
router.post('/:id/comments', protect, addComment)

export default router

