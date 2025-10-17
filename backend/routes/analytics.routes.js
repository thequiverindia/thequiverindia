import express from 'express'
import Article from '../models/Article.model.js'
import User from '../models/User.model.js'
import Category from '../models/Category.model.js'
import Ad from '../models/Ad.model.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// All routes require admin access
router.use(protect, authorize('admin'))

// @desc    Get dashboard analytics
// @route   GET /api/v1/analytics/dashboard
// @access  Private (Admin)
router.get('/dashboard', async (req, res, next) => {
  try {
    const now = new Date()
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30))

    // Get counts
    const totalArticles = await Article.countDocuments()
    const publishedArticles = await Article.countDocuments({ status: 'published' })
    const draftArticles = await Article.countDocuments({ status: 'draft' })
    const totalUsers = await User.countDocuments()
    const totalCategories = await Category.countDocuments()
    const activeAds = await Ad.countDocuments({ 
      isActive: true,
      'schedule.endDate': { $gte: new Date() }
    })

    // Get recent articles
    const recentArticles = await Article.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('author', 'name')
      .populate('category', 'name')
      .select('title slug status createdAt views')

    // Get total views and shares
    const articleStats = await Article.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: '$views' },
          totalShares: { $sum: '$shares' },
          totalLikes: { $sum: '$likes' }
        }
      }
    ])

    // Get articles by category
    const articlesByCategory = await Article.aggregate([
      { $match: { status: 'published' } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: '$category' },
      {
        $project: {
          name: '$category.name',
          count: 1
        }
      },
      { $sort: { count: -1 } }
    ])

    // Get recent activity (last 30 days)
    const recentActivity = await Article.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ])

    // Get top authors
    const topAuthors = await Article.aggregate([
      { $match: { status: 'published' } },
      {
        $group: {
          _id: '$author',
          articleCount: { $sum: 1 },
          totalViews: { $sum: '$views' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'author'
        }
      },
      { $unwind: '$author' },
      {
        $project: {
          name: '$author.name',
          email: '$author.email',
          articleCount: 1,
          totalViews: 1
        }
      },
      { $sort: { articleCount: -1 } },
      { $limit: 5 }
    ])

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalArticles,
          publishedArticles,
          draftArticles,
          totalUsers,
          totalCategories,
          activeAds,
          totalViews: articleStats[0]?.totalViews || 0,
          totalShares: articleStats[0]?.totalShares || 0,
          totalLikes: articleStats[0]?.totalLikes || 0
        },
        recentArticles,
        articlesByCategory,
        recentActivity,
        topAuthors
      }
    })
  } catch (error) {
    next(error)
  }
})

// @desc    Get article analytics
// @route   GET /api/v1/analytics/articles
// @access  Private (Admin)
router.get('/articles', async (req, res, next) => {
  try {
    const { startDate, endDate, category, limit = 10 } = req.query

    const matchQuery = { status: 'published' }

    if (startDate && endDate) {
      matchQuery.publishedAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category })
      if (categoryDoc) {
        matchQuery.category = categoryDoc._id
      }
    }

    // Get individual articles with their analytics
    const articles = await Article.find(matchQuery)
      .sort({ views: -1 })
      .limit(parseInt(limit))
      .populate('author', 'name')
      .populate('category', 'name')
      .select('title slug views shares likes publishedAt readingTime')
      .lean()

    // Also get aggregate analytics for summary
    const analytics = await Article.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: null,
          totalArticles: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalShares: { $sum: '$shares' },
          totalLikes: { $sum: '$likes' },
          avgViews: { $avg: '$views' },
          avgShares: { $avg: '$shares' },
          avgReadingTime: { $avg: '$readingTime' }
        }
      }
    ])

    res.status(200).json({
      success: true,
      data: {
        articles: articles.map(article => ({
          title: article.title,
          slug: article.slug,
          author: article.author?.name || 'Unknown',
          category: article.category?.name || 'Uncategorized',
          views: article.views || 0,
          shares: article.shares || 0,
          likes: article.likes || 0,
          publishedAt: article.publishedAt,
          readingTime: article.readingTime || 0
        })),
        summary: analytics[0] || {}
      }
    })
  } catch (error) {
    next(error)
  }
})

export default router
