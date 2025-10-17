import express from 'express'

const router = express.Router()

// Mock trending data
const mockTrendingTopics = [
  { id: 1, topic: "#DigitalIndia2", count: 125000, trend: "up" },
  { id: 2, topic: "#CricketWorldCup", count: 250000, trend: "up" },
  { id: 3, topic: "#Budget2024", count: 98000, trend: "stable" },
  { id: 4, topic: "#ClimateAction", count: 75000, trend: "up" },
  { id: 5, topic: "#StartupIndia", count: 45000, trend: "down" }
]

const mockLiveUpdates = [
  {
    id: "live-1",
    time: "14:30",
    update: "PM Modi addresses nation on Digital India 2.0",
    category: "National",
    priority: "high"
  },
  {
    id: "live-2",
    time: "14:15",
    update: "India 287/4, chasing 342 in World Cup Final",
    category: "Cricket",
    priority: "critical"
  }
]

const mockStockData = {
  sensex: {
    value: 74850.25,
    change: +825.40,
    changePercent: +1.12,
    trend: "up"
  },
  nifty: {
    value: 22450.75,
    change: +245.30,
    changePercent: +1.10,
    trend: "up"
  },
  lastUpdated: new Date().toISOString()
}

// @desc    Get trending topics
// @route   GET /api/v1/trending/topics
// @access  Public
router.get('/topics', async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: mockTrendingTopics
    })
  } catch (error) {
    next(error)
  }
})

// @desc    Get live updates
// @route   GET /api/v1/trending/live-updates
// @access  Public
router.get('/live-updates', async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: mockLiveUpdates
    })
  } catch (error) {
    next(error)
  }
})

// @desc    Get stock market data
// @route   GET /api/v1/trending/stocks
// @access  Public
router.get('/stocks', async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: mockStockData
    })
  } catch (error) {
    next(error)
  }
})

export default router

