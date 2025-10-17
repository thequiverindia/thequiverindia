import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const mongoURI = process.env.NODE_ENV === 'production' 
      ? process.env.MONGODB_URI_PROD 
      : process.env.MONGODB_URI

    if (!mongoURI) {
      throw new Error('MongoDB URI not found in environment variables. Please set MONGODB_URI in backend/.env file.')
    }

    const conn = await mongoose.connect(mongoURI)

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    console.log(`📊 Database: ${conn.connection.name}`)
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`)
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 SOLUTION:')
      console.error('   MongoDB is not running or not accessible.')
      console.error('   Option 1: Use MongoDB Atlas (free cloud database)')
      console.error('      → Visit: https://www.mongodb.com/cloud/atlas/register')
      console.error('      → See: SETUP_MONGODB.md for instructions')
      console.error('   Option 2: Install MongoDB locally')
      console.error('      → macOS: brew install mongodb-community && brew services start mongodb-community')
      console.error('      → See: SETUP_MONGODB.md for other platforms\n')
    }
    
    process.exit(1)
  }
}

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected')
})

mongoose.connection.on('error', (err) => {
  console.error(`❌ MongoDB error: ${err.message}`)
})

export default connectDB

