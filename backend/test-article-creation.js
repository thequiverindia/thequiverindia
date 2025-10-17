import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Article from './models/Article.model.js'
import Category from './models/Category.model.js'
import User from './models/User.model.js'

// Load environment variables
dotenv.config()

const testArticleCreation = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB Connected\n')

    // Check for users
    console.log('👤 Checking for users...')
    const userCount = await User.countDocuments()
    console.log(`   Found ${userCount} users`)
    
    if (userCount === 0) {
      console.log('   ❌ No users found. Run: npm run seed')
      process.exit(1)
    }

    const adminUser = await User.findOne({ role: 'admin' })
    if (!adminUser) {
      console.log('   ❌ No admin user found. Run: npm run seed')
      process.exit(1)
    }
    console.log(`   ✅ Admin user found: ${adminUser.email}\n`)

    // Check for categories
    console.log('📁 Checking for categories...')
    const categoryCount = await Category.countDocuments()
    console.log(`   Found ${categoryCount} categories`)
    
    if (categoryCount === 0) {
      console.log('   ❌ No categories found. Run: npm run seed')
      process.exit(1)
    }

    const category = await Category.findOne()
    console.log(`   ✅ Sample category: ${category.name}\n`)

    // Test article data
    console.log('📝 Testing article creation...')
    const testArticleData = {
      title: 'Test Article - Base64 Image Storage',
      excerpt: 'This is a test article to verify base64 image storage is working correctly.',
      content: '<p>This is the content of the test article. Base64 images are now stored directly in MongoDB!</p>',
      author: adminUser._id,
      category: category._id,
      image: {
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        publicId: 'test_123',
        alt: 'Test image'
      },
      tags: ['test', 'base64'],
      status: 'draft'
    }

    console.log('   Creating article with data:')
    console.log('   - Title:', testArticleData.title)
    console.log('   - Author:', adminUser.email)
    console.log('   - Category:', category.name)
    console.log('   - Image URL length:', testArticleData.image.url.length, 'characters')
    console.log('   - Status:', testArticleData.status)

    const article = await Article.create(testArticleData)
    console.log('\n✅ Article created successfully!')
    console.log('   ID:', article._id)
    console.log('   Slug:', article.slug)
    console.log('   Image URL length:', article.image.url.length)

    // Clean up test article
    await Article.findByIdAndDelete(article._id)
    console.log('\n🧹 Test article cleaned up')

    console.log('\n' + '='.repeat(60))
    console.log('✅ ALL TESTS PASSED!')
    console.log('='.repeat(60))
    console.log('\nYour backend is configured correctly.')
    console.log('You can now create articles with base64 images.\n')

    process.exit(0)
  } catch (error) {
    console.error('\n❌ ERROR:', error.message)
    
    if (error.name === 'ValidationError') {
      console.error('\n📋 Validation Errors:')
      Object.keys(error.errors).forEach(key => {
        console.error(`   - ${key}: ${error.errors[key].message}`)
      })
    }

    if (error.message.includes('connect')) {
      console.error('\n💡 SOLUTION:')
      console.error('   1. Make sure MongoDB is running')
      console.error('   2. Check your MONGODB_URI in backend/.env')
      console.error('   3. See SETUP_MONGODB.md for help')
    }

    process.exit(1)
  }
}

testArticleCreation()


