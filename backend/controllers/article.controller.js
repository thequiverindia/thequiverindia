import Article from '../models/Article.model.js'
import Category from '../models/Category.model.js'

// @desc    Get all articles
// @route   GET /api/v1/articles
// @access  Public
export const getArticles = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 12
    const status = req.query.status || 'published'
    const category = req.query.category
    const isFeatured = req.query.featured === 'true'
    const isBreaking = req.query.breaking === 'true'
    const sortBy = req.query.sortBy || '-publishedAt'

    // Build query
    const query = {}
    
    // Only filter by status if it's not 'all'
    if (status !== 'all') {
      query.status = status
    }
    
    if (category) {
      const categoryDoc = await Category.findOne({ slug: category })
      if (categoryDoc) {
        query.category = categoryDoc._id
      }
    }
    
    if (isFeatured) query.isFeatured = true
    if (isBreaking) query.isBreaking = true

    // Execute query
    const articles = await Article.find(query)
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'name avatar bio')
      .populate('category', 'name slug icon color')
      .lean()

    // Get total count
    const total = await Article.countDocuments(query)

    res.status(200).json({
      success: true,
      data: {
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

// @desc    Get single article by slug
// @route   GET /api/v1/articles/slug/:slug
// @access  Public
export const getArticleBySlug = async (req, res, next) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug, status: 'published' })
      .populate('author', 'name avatar bio socialLinks')
      .populate('category', 'name slug icon color')
      .populate('relatedArticles', 'title slug excerpt image author category publishedAt readingTime')

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      })
    }

    // Increment views (async, don't wait)
    article.incrementViews().catch(err => console.error('Error incrementing views:', err))

    res.status(200).json({
      success: true,
      data: {
        article,
        authorInfo: article.author,
        relatedArticles: article.relatedArticles
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single article by ID
// @route   GET /api/v1/articles/:id
// @access  Private (Author, Editor, Admin)
export const getArticleById = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'name avatar bio socialLinks')
      .populate('category', 'name slug icon color')

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      })
    }

    res.status(200).json({
      success: true,
      data: article
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create new article
// @route   POST /api/v1/articles
// @access  Private (Author, Editor, Admin)
export const createArticle = async (req, res, next) => {
  try {
    // Add author from logged in user
    req.body.author = req.user.id
    req.body.lastModifiedBy = req.user.id

    const article = await Article.create(req.body)

    // Populate fields
    await article.populate('author', 'name avatar')
    await article.populate('category', 'name slug')

    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      data: article
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update article
// @route   PUT /api/v1/articles/:id
// @access  Private (Author, Editor, Admin)
export const updateArticle = async (req, res, next) => {
  try {
    let article = await Article.findById(req.params.id)

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      })
    }

    // Check ownership (authors can only edit their own, editors/admins can edit all)
    if (article.author.toString() !== req.user.id && 
        !['editor', 'admin'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this article'
      })
    }

    // Update lastModifiedBy
    req.body.lastModifiedBy = req.user.id

    article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    .populate('author', 'name avatar')
    .populate('category', 'name slug')

    res.status(200).json({
      success: true,
      message: 'Article updated successfully',
      data: article
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete article
// @route   DELETE /api/v1/articles/:id
// @access  Private (Editor, Admin)
export const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id)

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      })
    }

    await article.deleteOne()

    res.status(200).json({
      success: true,
      message: 'Article deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Search articles
// @route   GET /api/v1/articles/search
// @access  Public
export const searchArticles = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 12, category, sortBy = '-publishedAt' } = req.query

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy
    }

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category })
      if (categoryDoc) {
        options.category = categoryDoc._id
      }
    }

    const articles = await Article.searchArticles(q, options)
    const total = await Article.countDocuments({
      status: 'published',
      $text: { $search: q },
      ...(options.category && { category: options.category })
    })

    res.status(200).json({
      success: true,
      data: {
        articles,
        pagination: {
          page: options.page,
          limit: options.limit,
          total,
          totalPages: Math.ceil(total / options.limit),
          hasNext: options.page * options.limit < total,
          hasPrev: options.page > 1
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get trending articles
// @route   GET /api/v1/articles/trending
// @access  Public
export const getTrendingArticles = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10
    const articles = await Article.getTrending(limit)

    res.status(200).json({
      success: true,
      data: articles
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get featured articles
// @route   GET /api/v1/articles/featured
// @access  Public
export const getFeaturedArticles = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10
    const articles = await Article.getFeatured(limit)

    res.status(200).json({
      success: true,
      data: articles
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Increment article shares
// @route   POST /api/v1/articles/:id/share
// @access  Public
export const incrementShares = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id)

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      })
    }

    await article.incrementShares()

    res.status(200).json({
      success: true,
      data: { shares: article.shares }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Toggle article like
// @route   POST /api/v1/articles/:id/like
// @access  Private
export const toggleLike = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id)

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      })
    }

    // In a real app, track which users liked which articles
    // For now, just increment/decrement
    const action = req.body.action // 'like' or 'unlike'
    
    if (action === 'like') {
      article.likes += 1
    } else if (action === 'unlike' && article.likes > 0) {
      article.likes -= 1
    }

    await article.save({ validateBeforeSave: false })

    res.status(200).json({
      success: true,
      data: { likes: article.likes }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Add comment to article
// @route   POST /api/v1/articles/:id/comments
// @access  Private
export const addComment = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id)

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      })
    }

    const comment = {
      user: req.user.id,
      content: req.body.content,
      isApproved: req.user.role === 'admin' // Auto-approve admin comments
    }

    article.comments.push(comment)
    await article.save()

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: comment
    })
  } catch (error) {
    next(error)
  }
}

