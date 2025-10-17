import Category from '../models/Category.model.js'
import Article from '../models/Article.model.js'

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const includeInactive = req.query.includeInactive === 'true'
    
    const query = includeInactive ? {} : { isActive: true }
    
    const categories = await Category.find(query)
      .sort({ order: 1, name: 1 })
      .populate('articleCount')
      .lean()

    res.status(200).json({
      success: true,
      data: categories
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single category by slug
// @route   GET /api/v1/categories/slug/:slug
// @access  Public
export const getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug })
      .populate('articleCount')

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      })
    }

    res.status(200).json({
      success: true,
      data: category
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single category by ID
// @route   GET /api/v1/categories/:id
// @access  Private (Admin)
export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('articleCount')

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      })
    }

    res.status(200).json({
      success: true,
      data: category
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create category
// @route   POST /api/v1/categories
// @access  Private (Admin)
export const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update category
// @route   PUT /api/v1/categories/:id
// @access  Private (Admin)
export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete category
// @route   DELETE /api/v1/categories/:id
// @access  Private (Admin)
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id)

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      })
    }

    // Check if category has articles
    const articleCount = await Article.countDocuments({ category: category._id })
    
    if (articleCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category. ${articleCount} articles are using this category. Please reassign them first.`
      })
    }

    await category.deleteOne()

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get articles by category
// @route   GET /api/v1/categories/:slug/articles
// @access  Public
export const getArticlesByCategory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 12
    const sortBy = req.query.sortBy || '-publishedAt'

    const category = await Category.findOne({ slug: req.params.slug })

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      })
    }

    const articles = await Article.find({ 
      category: category._id, 
      status: 'published' 
    })
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'name avatar')
      .populate('category', 'name slug icon color')
      .lean()

    const total = await Article.countDocuments({ 
      category: category._id, 
      status: 'published' 
    })

    res.status(200).json({
      success: true,
      data: {
        category,
        articles,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

