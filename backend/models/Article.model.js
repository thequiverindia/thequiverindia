import mongoose from 'mongoose'
import slugify from 'slugify'

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide article title'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide article excerpt'],
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Please provide article content']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please select a category']
  },
  tags: [{
    type: String,
    trim: true
  }],
  image: {
    url: {
      type: String,
      required: [true, 'Please provide article image']
    },
    publicId: String,
    alt: String
  },
  multimedia: {
    videos: [{
      id: String,
      url: String,
      thumbnail: String,
      duration: String,
      title: String
    }],
    gallery: [{
      id: String,
      url: String,
      publicId: String,
      caption: String
    }]
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived', 'scheduled'],
    default: 'draft'
  },
  publishedAt: {
    type: Date
  },
  scheduledFor: {
    type: Date
  },
  location: {
    type: String,
    trim: true
  },
  region: {
    type: String,
    trim: true
  },
  readingTime: {
    type: Number,
    default: 5
  },
  views: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isBreaking: {
    type: Boolean,
    default: false
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    ogImage: String
  },
  relatedArticles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    likes: {
      type: Number,
      default: 0
    },
    isApproved: {
      type: Boolean,
      default: false
    }
  }],
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Indexes for better query performance
// Note: slug already has unique index from schema definition
articleSchema.index({ category: 1, status: 1 })
articleSchema.index({ author: 1, status: 1 })
articleSchema.index({ publishedAt: -1 })
articleSchema.index({ views: -1 })
articleSchema.index({ isFeatured: 1, status: 1 })
articleSchema.index({ isBreaking: 1, status: 1 })
articleSchema.index({ tags: 1 })
articleSchema.index({ '$**': 'text' }) // Text search index

// Generate slug before saving
articleSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    })
  }
  next()
})

// Calculate reading time before saving
articleSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const wordsPerMinute = 200
    const wordCount = this.content.trim().split(/\s+/).length
    this.readingTime = Math.ceil(wordCount / wordsPerMinute)
  }
  next()
})

// Set publishedAt when status changes to published
articleSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  next()
})

// Virtual for comment count
articleSchema.virtual('commentCount').get(function() {
  return this.comments ? this.comments.filter(c => c.isApproved).length : 0
})

// Method to increment views
articleSchema.methods.incrementViews = async function() {
  this.views += 1
  return this.save({ validateBeforeSave: false })
}

// Method to increment shares
articleSchema.methods.incrementShares = async function() {
  this.shares += 1
  return this.save({ validateBeforeSave: false })
}

// Static method to get trending articles
articleSchema.statics.getTrending = function(limit = 10) {
  return this.find({ status: 'published' })
    .sort({ shares: -1, views: -1 })
    .limit(limit)
    .populate('author', 'name avatar')
    .populate('category', 'name slug')
}

// Static method to get featured articles
articleSchema.statics.getFeatured = function(limit = 10) {
  return this.find({ status: 'published', isFeatured: true })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .populate('author', 'name avatar')
    .populate('category', 'name slug')
}

// Static method to search articles
articleSchema.statics.searchArticles = function(query, options = {}) {
  const { page = 1, limit = 12, category, sortBy = '-publishedAt' } = options
  
  const searchQuery = {
    status: 'published',
    $text: { $search: query }
  }
  
  if (category) {
    searchQuery.category = category
  }
  
  return this.find(searchQuery)
    .sort(sortBy)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('author', 'name avatar')
    .populate('category', 'name slug')
}

const Article = mongoose.model('Article', articleSchema)

export default Article

