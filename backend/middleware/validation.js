import { body, param, query, validationResult } from 'express-validator'

// Custom validator for image URLs - accepts both HTTP URLs and base64 data URIs
const isValidImageUrl = (value) => {
  // Check if it's a base64 data URI
  if (value.startsWith('data:image/')) {
    return true
  }
  // Check if it's a valid HTTP/HTTPS URL
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

// Validation middleware to check for errors
export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    })
  }
  next()
}

// User validation rules
export const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain uppercase, lowercase, and number'),
  validate
]

export const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
  validate
]

// Article validation rules
export const createArticleValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 10, max: 200 }).withMessage('Title must be between 10 and 200 characters'),
  body('excerpt')
    .trim()
    .notEmpty().withMessage('Excerpt is required')
    .isLength({ min: 50, max: 500 }).withMessage('Excerpt must be between 50 and 500 characters'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 100 }).withMessage('Content must be at least 100 characters'),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isMongoId().withMessage('Invalid category ID'),
  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array'),
  body('image.url')
    .notEmpty().withMessage('Image URL is required')
    .custom(isValidImageUrl).withMessage('Invalid image URL (must be HTTP URL or base64 data URI)'),
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived', 'scheduled']).withMessage('Invalid status'),
  validate
]

export const updateArticleValidation = [
  param('id')
    .isMongoId().withMessage('Invalid article ID'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 10, max: 200 }).withMessage('Title must be between 10 and 200 characters'),
  body('excerpt')
    .optional()
    .trim()
    .isLength({ min: 50, max: 500 }).withMessage('Excerpt must be between 50 and 500 characters'),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 100 }).withMessage('Content must be at least 100 characters'),
  validate
]

// Category validation rules
export const createCategoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('icon')
    .optional()
    .trim(),
  body('color')
    .optional()
    .matches(/^#[0-9A-F]{6}$/i).withMessage('Invalid color format. Use hex format (#RRGGBB)'),
  validate
]

// Ad validation rules
export const createAdValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Ad title is required'),
  body('type')
    .notEmpty().withMessage('Ad type is required')
    .isIn(['banner', 'sidebar', 'in-article', 'popup', 'native']).withMessage('Invalid ad type'),
  body('size')
    .notEmpty().withMessage('Ad size is required')
    .isIn(['300x250', '728x90', '160x600', '300x600', 'responsive']).withMessage('Invalid ad size'),
  body('image.url')
    .notEmpty().withMessage('Image URL is required')
    .custom(isValidImageUrl).withMessage('Invalid image URL (must be HTTP URL or base64 data URI)'),
  body('link')
    .notEmpty().withMessage('Ad link is required')
    .isURL().withMessage('Invalid ad link'),
  body('schedule.startDate')
    .notEmpty().withMessage('Start date is required')
    .isISO8601().withMessage('Invalid start date format'),
  body('schedule.endDate')
    .notEmpty().withMessage('End date is required')
    .isISO8601().withMessage('Invalid end date format'),
  validate
]

// Search validation
export const searchValidation = [
  query('q')
    .trim()
    .notEmpty().withMessage('Search query is required')
    .isLength({ min: 2 }).withMessage('Search query must be at least 2 characters'),
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  validate
]

// User creation validation (admin only)
export const createUserValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['user', 'author', 'editor', 'admin']).withMessage('Invalid role'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters'),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
  validate
]

// ID validation
export const idValidation = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
  validate
]
