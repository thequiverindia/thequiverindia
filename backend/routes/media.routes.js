import express from 'express'
import multer from 'multer'
import { protect, authorize } from '../middleware/auth.js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const router = express.Router()

// Note: Images are now stored as base64 in MongoDB
// No external image service (Cloudinary) required
console.log('Media routes initialized - Using base64 storage')

// Configure multer for memory storage
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false)
    }
    cb(null, true)
  }
})

// @desc    Upload image
// @route   POST /api/v1/media/upload
// @access  Private (Author, Editor, Admin)
router.post('/upload', 
  protect, 
  authorize('author', 'editor', 'admin'),
  upload.single('image'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please upload an image'
        })
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid file format. Only JPEG, PNG, WebP, and GIF images are allowed.'
        })
      }

      // Validate file size (5MB limit for base64)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (req.file.size > maxSize) {
        return res.status(400).json({
          success: false,
          message: `File size too large. Maximum allowed size is ${(maxSize / 1024 / 1024).toFixed(1)}MB. Your file is ${(req.file.size / 1024 / 1024).toFixed(1)}MB.`
        })
      }

      console.log('Converting image to base64:', {
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      })

      // Convert to base64
      const base64Image = req.file.buffer.toString('base64')
      const dataUri = `data:${req.file.mimetype};base64,${base64Image}`

      // Generate a unique ID for the image
      const publicId = `img_${Date.now()}_${Math.random().toString(36).substring(7)}`

      console.log('Image converted successfully:', publicId)

      res.status(200).json({
        success: true,
        message: 'Image uploaded successfully',
        data: {
          url: dataUri,
          publicId: publicId,
          width: 1200, // Default dimensions (can calculate with sharp library if needed)
          height: 800,
          format: req.file.mimetype.split('/')[1],
          size: req.file.size,
          alt: req.file.originalname.split('.')[0]
        }
      })
    } catch (error) {
      console.error('Upload error:', error)
      
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to upload image'
      })
    }
  }
)

// @desc    Delete image (Base64 - no action needed)
// @route   DELETE /api/v1/media/:publicId
// @access  Private (Author, Editor, Admin)
router.delete('/:publicId',
  protect,
  authorize('author', 'editor', 'admin'),
  async (req, res, next) => {
    try {
      // For base64, images are stored in MongoDB with articles
      // No separate deletion needed
      // Just return success
      res.status(200).json({
        success: true,
        message: 'Image deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }
)

// @desc    Upload multiple images
// @route   POST /api/v1/media/upload-multiple
// @access  Private (Author, Editor, Admin)
router.post('/upload-multiple',
  protect,
  authorize('author', 'editor', 'admin'),
  upload.array('images', 10),
  async (req, res, next) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Please upload at least one image'
        })
      }

      // Convert all files to base64
      const results = req.files.map((file, index) => {
        const base64Image = file.buffer.toString('base64')
        const dataUri = `data:${file.mimetype};base64,${base64Image}`
        const publicId = `img_${Date.now()}_${index}_${Math.random().toString(36).substring(7)}`
        
        return {
          url: dataUri,
          publicId: publicId,
          width: 800,
          height: 600,
          format: file.mimetype.split('/')[1],
          size: file.size,
          alt: file.originalname.split('.')[0]
        }
      })

      res.status(200).json({
        success: true,
        message: 'Images uploaded successfully',
        data: results
      })
    } catch (error) {
      next(error)
    }
  }
)

export default router
