import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.model.js'

// Load environment variables
dotenv.config()

const ensureAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_URI_PROD)
    console.log('✅ Connected to MongoDB')

    // Check if admin user exists
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@thequiver.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123'

    let adminUser = await User.findOne({ email: adminEmail })

    if (!adminUser) {
      console.log('📝 Creating admin user...')
      adminUser = await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        isActive: true,
        isVerified: true
      })
      console.log('✅ Admin user created successfully')
    } else {
      console.log('✅ Admin user already exists')
      
      // Update admin user if needed
      if (adminUser.role !== 'admin') {
        adminUser.role = 'admin'
        await adminUser.save()
        console.log('✅ Updated user role to admin')
      }
      
      if (!adminUser.isActive) {
        adminUser.isActive = true
        await adminUser.save()
        console.log('✅ Activated admin user')
      }
    }

    console.log('\n📋 Admin User Details:')
    console.log(`   Email: ${adminUser.email}`)
    console.log(`   Role: ${adminUser.role}`)
    console.log(`   Active: ${adminUser.isActive}`)
    console.log(`   Password: ${adminPassword}`)
    console.log('\n🔐 You can now login with these credentials\n')

    // Close connection
    await mongoose.connection.close()
    console.log('✅ Database connection closed')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

ensureAdminUser()

