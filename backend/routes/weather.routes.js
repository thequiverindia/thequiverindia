import express from 'express'

const router = express.Router()

// Mock weather data (in production, integrate with real weather API)
const mockWeatherData = {
  "delhi": {
    city: "New Delhi",
    state: "Delhi",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 8,
    uvIndex: 6,
    pressure: 1013,
    icon: "partly-cloudy",
    forecast: [
      { day: "Today", high: 32, low: 18, condition: "Partly Cloudy", icon: "partly-cloudy" },
      { day: "Tomorrow", high: 30, low: 16, condition: "Sunny", icon: "sunny" },
      { day: "Wed", high: 28, low: 15, condition: "Cloudy", icon: "cloudy" }
    ]
  },
  "mumbai": {
    city: "Mumbai",
    state: "Maharashtra",
    temperature: 31,
    condition: "Humid",
    humidity: 78,
    windSpeed: 15,
    visibility: 6,
    uvIndex: 8,
    pressure: 1009,
    icon: "humid",
    forecast: [
      { day: "Today", high: 33, low: 24, condition: "Humid", icon: "humid" },
      { day: "Tomorrow", high: 32, low: 23, condition: "Partly Cloudy", icon: "partly-cloudy" },
      { day: "Wed", high: 31, low: 22, condition: "Rainy", icon: "rainy" }
    ]
  }
}

// @desc    Get weather for all cities
// @route   GET /api/v1/weather
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: mockWeatherData
    })
  } catch (error) {
    next(error)
  }
})

// @desc    Get weather for specific city
// @route   GET /api/v1/weather/:city
// @access  Public
router.get('/:city', async (req, res, next) => {
  try {
    const city = req.params.city.toLowerCase()
    const weather = mockWeatherData[city]

    if (!weather) {
      return res.status(404).json({
        success: false,
        message: 'Weather data not available for this city'
      })
    }

    res.status(200).json({
      success: true,
      data: weather
    })
  } catch (error) {
    next(error)
  }
})

export default router

