import mongoose from 'mongoose'

const adSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide ad title'],
    trim: true
  },
  type: {
    type: String,
    enum: ['banner', 'sidebar', 'in-article', 'popup', 'native'],
    required: true
  },
  size: {
    type: String,
    enum: ['300x250', '728x90', '160x600', '300x600', 'responsive'],
    required: true
  },
  placement: {
    type: String,
    enum: ['homepage', 'article', 'category', 'search', 'all'],
    default: 'all'
  },
  image: {
    url: {
      type: String,
      required: true
    },
    publicId: String,
    alt: String
  },
  link: {
    type: String,
    required: [true, 'Please provide ad link']
  },
  targetBlank: {
    type: Boolean,
    default: true
  },
  advertiser: {
    name: {
      type: String,
      required: true
    },
    email: String,
    company: String
  },
  schedule: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  targeting: {
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }],
    regions: [String],
    devices: {
      type: [String],
      enum: ['desktop', 'mobile', 'tablet'],
      default: ['desktop', 'mobile', 'tablet']
    }
  },
  priority: {
    type: Number,
    default: 1,
    min: 1,
    max: 10
  },
  impressions: {
    type: Number,
    default: 0
  },
  clicks: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'paused', 'expired'],
    default: 'draft'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Virtual for CTR (Click Through Rate)
adSchema.virtual('ctr').get(function() {
  if (this.impressions === 0) return 0
  return ((this.clicks / this.impressions) * 100).toFixed(2)
})

// Check if ad is currently active
adSchema.virtual('isCurrentlyActive').get(function() {
  const now = new Date()
  return this.status === 'published' &&
         this.isActive && 
         this.schedule.startDate <= now && 
         this.schedule.endDate >= now
})

// Check if ad is expired
adSchema.virtual('isExpired').get(function() {
  const now = new Date()
  return this.schedule.endDate < now
})

// Indexes
adSchema.index({ placement: 1, isActive: 1 })
adSchema.index({ 'schedule.startDate': 1, 'schedule.endDate': 1 })
adSchema.index({ priority: -1 })

// Method to increment impressions
adSchema.methods.incrementImpressions = async function() {
  this.impressions += 1
  return this.save({ validateBeforeSave: false })
}

// Method to increment clicks
adSchema.methods.incrementClicks = async function() {
  this.clicks += 1
  return this.save({ validateBeforeSave: false })
}

// Static method to get active ads for placement
adSchema.statics.getActiveAds = function(placement, limit = 5) {
  const now = new Date()
  return this.find({
    status: 'published',
    isActive: true,
    $or: [
      { placement: placement },
      { placement: 'all' }
    ],
    'schedule.startDate': { $lte: now },
    'schedule.endDate': { $gte: now }
  })
  .sort({ priority: -1 })
  .limit(limit)
}

const Ad = mongoose.model('Ad', adSchema)

export default Ad

