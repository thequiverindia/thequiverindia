import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import errorHandler from './middleware/errorHandler.js'
import { notFound } from './middleware/errorHandler.js'

// Load environment variables
dotenv.config()

// Connect to database
connectDB()

// Initialize Express app
const app = express()

// Security middleware
app.use(helmet())

// CORS configuration
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    process.env.ADMIN_URL || 'http://localhost:3001'
  ],
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Body parser middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Serve static files (for local uploads in development)
app.use('/uploads', express.static('uploads'))

// Compression middleware
app.use(compression())

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('combined'))
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  })
})

// API Routes
const API_VERSION = process.env.API_VERSION || 'v1'

// Import routes
import authRoutes from './routes/auth.routes.js'
import articleRoutes from './routes/article.routes.js'
import categoryRoutes from './routes/category.routes.js'
import userRoutes from './routes/user.routes.js'
import mediaRoutes from './routes/media.routes.js'
import adRoutes from './routes/ad.routes.js'
import analyticsRoutes from './routes/analytics.routes.js'
import weatherRoutes from './routes/weather.routes.js'
import trendingRoutes from './routes/trending.routes.js'

// Mount routes
app.use(`/api/${API_VERSION}/auth`, authRoutes)
app.use(`/api/${API_VERSION}/articles`, articleRoutes)
app.use(`/api/${API_VERSION}/categories`, categoryRoutes)
app.use(`/api/${API_VERSION}/users`, userRoutes)
app.use(`/api/${API_VERSION}/media`, mediaRoutes)
app.use(`/api/${API_VERSION}/ads`, adRoutes)
app.use(`/api/${API_VERSION}/analytics`, analyticsRoutes)
app.use(`/api/${API_VERSION}/weather`, weatherRoutes)
app.use(`/api/${API_VERSION}/trending`, trendingRoutes)

// 404 handler
app.use(notFound)

// Error handler
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 The Quiver Backend Server                           ║
║                                                           ║
║   Environment: ${process.env.NODE_ENV?.padEnd(10)}                            ║
║   Port: ${PORT.toString().padEnd(10)}                                   ║
║   API Version: ${API_VERSION.padEnd(10)}                              ║
║                                                           ║
║   📡 Server running at: http://localhost:${PORT}          ║
║   📚 API Docs: http://localhost:${PORT}/api/${API_VERSION}         ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message)
  server.close(() => process.exit(1))
})

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...')
  server.close(() => {
    console.log('✅ Process terminated')
  })
})

export default app

