import mongoose from 'mongoose'
import User from './models/User.model.js'
import dotenv from 'dotenv'

dotenv.config()

async function checkAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
    
    const admin = await User.findOne({ role: 'admin' })
    if (admin) {
      console.log('Admin user found:', admin.email)
    } else {
      console.log('No admin user found')
    }
    
    process.exit(0)
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

checkAdmin()
