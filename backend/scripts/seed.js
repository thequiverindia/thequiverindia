import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.model.js'
import Category from '../models/Category.model.js'
import Article from '../models/Article.model.js'
import Ad from '../models/Ad.model.js'
import connectDB from '../config/database.js'

dotenv.config()

// Sample data
const categories = [
  {
    name: 'National',
    description: 'Latest national politics and governance news',
    icon: '🇮🇳',
    color: '#ff6b35',
    order: 1
  },
  {
    name: 'Cricket',
    description: 'Cricket news, scores, and analysis',
    icon: '🏏',
    color: '#1a365d',
    order: 2
  },
  {
    name: 'Bollywood',
    description: 'Entertainment news and celebrity updates',
    icon: '🎬',
    color: '#e53e3e',
    order: 3
  },
  {
    name: 'Economy',
    description: 'Financial markets, business, and economic news',
    icon: '💰',
    color: '#38a169',
    order: 4
  },
  {
    name: 'Regional',
    description: 'State-wise news and regional developments',
    icon: '🗺️',
    color: '#3182ce',
    order: 5
  },
  {
    name: 'Science',
    description: 'Scientific discoveries and technology updates',
    icon: '🔬',
    color: '#805ad5',
    order: 6
  }
]

const seedDatabase = async () => {
  try {
    await connectDB()

    console.log('🗑️  Clearing existing data...')
    await User.deleteMany()
    await Category.deleteMany()
    await Article.deleteMany()
    await Ad.deleteMany()

    console.log('👤 Creating admin user...')
    const adminUser = await User.create({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@thequiver.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      role: 'admin',
      isVerified: true,
      isActive: true
    })

    console.log('📝 Creating author user...')
    const authorUser = await User.create({
      name: 'Rajesh Sharma',
      email: 'rajesh@thequiver.com',
      password: 'Author@123',
      role: 'author',
      bio: 'Senior correspondent covering national politics and governance.',
      isVerified: true,
      isActive: true
    })

    console.log('📂 Creating categories...')
    const createdCategories = await Category.insertMany(categories)

    console.log('📰 Creating sample articles...')
    const nationalCategory = createdCategories.find(c => c.name === 'National')
    const cricketCategory = createdCategories.find(c => c.name === 'Cricket')

    const articles = [
      {
        title: 'PM Modi Announces New Digital India 2.0 Initiative',
        excerpt: 'Prime Minister unveils ambitious roadmap for digital transformation with focus on rural connectivity and AI integration across government services.',
        content: '<p>In a landmark announcement today, Prime Minister Narendra Modi unveiled the Digital India 2.0 initiative...</p>',
        author: authorUser._id,
        category: nationalCategory._id,
        tags: ['modi', 'digital-india', 'technology', 'government'],
        image: {
          url: 'https://picsum.photos/seed/modi-digital-india/1200/800',
          alt: 'PM Modi at Digital India 2.0 launch event'
        },
        location: 'New Delhi',
        region: 'National',
        status: 'published',
        publishedAt: new Date(),
        isFeatured: true,
        isBreaking: false,
        priority: 'high',
        views: 125000,
        shares: 2500,
        likes: 6250
      },
      {
        title: 'India Beats Australia by 6 Wickets in MCG Thriller',
        excerpt: 'Virat Kohli\'s magnificent century leads India to a stunning victory at the Melbourne Cricket Ground in the Border-Gavaskar Trophy.',
        content: '<p>In a nail-biting finish at the iconic Melbourne Cricket Ground, Team India secured a remarkable 6-wicket victory...</p>',
        author: authorUser._id,
        category: cricketCategory._id,
        tags: ['cricket', 'india', 'australia', 'kohli', 'mcg'],
        image: {
          url: 'https://picsum.photos/seed/cricket-india-australia/1200/800',
          alt: 'Virat Kohli celebrating his century at MCG'
        },
        location: 'Melbourne',
        region: 'International',
        status: 'published',
        publishedAt: new Date(),
        isFeatured: true,
        isBreaking: true,
        priority: 'high',
        views: 250000,
        shares: 5000,
        likes: 12500
      }
    ]

    await Article.insertMany(articles)

    console.log('📢 Creating sample advertisements...')
    const ads = [
      {
        title: 'TechCorp - Latest Smartphones',
        type: 'banner',
        size: '728x90',
        placement: 'homepage',
        link: 'https://techcorp.com/smartphones',
        image: {
          url: 'https://picsum.photos/seed/techcorp-banner/728/90',
          publicId: 'techcorp-banner-728x90'
        },
        advertiser: {
          name: 'TechCorp India',
          email: 'marketing@techcorp.com',
          phone: '+91-9876543210'
        },
        schedule: {
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          timezone: 'Asia/Kolkata'
        },
        targeting: {
          devices: ['desktop', 'mobile'],
          categories: [nationalCategory._id, cricketCategory._id],
          regions: ['India']
        },
        priority: 8,
        isActive: true,
        createdBy: adminUser._id,
        impressions: 15000,
        clicks: 450
      },
      {
        title: 'FinanceHub - Investment Opportunities',
        type: 'sidebar',
        size: '300x250',
        placement: 'article',
        link: 'https://financehub.com/invest',
        image: {
          url: 'https://picsum.photos/seed/financehub-sidebar/300/250',
          publicId: 'financehub-sidebar-300x250'
        },
        advertiser: {
          name: 'FinanceHub',
          email: 'ads@financehub.com',
          phone: '+91-9876543211'
        },
        schedule: {
          startDate: new Date(),
          endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
          timezone: 'Asia/Kolkata'
        },
        targeting: {
          devices: ['desktop', 'tablet'],
          categories: [createdCategories.find(c => c.name === 'Economy')._id],
          regions: ['India']
        },
        priority: 5,
        isActive: true,
        createdBy: adminUser._id,
        impressions: 8500,
        clicks: 170
      }
    ]

    await Ad.insertMany(ads)

    console.log('✅ Database seeded successfully!')
    console.log('\n📊 Summary:')
    console.log(`   - Users created: 2`)
    console.log(`   - Categories created: ${createdCategories.length}`)
    console.log(`   - Articles created: ${articles.length}`)
    console.log(`   - Advertisements created: ${ads.length}`)
    console.log('\n🔐 Admin Credentials:')
    console.log(`   Email: ${adminUser.email}`)
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}`)
    console.log('\n👤 Author Credentials:')
    console.log(`   Email: ${authorUser.email}`)
    console.log(`   Password: Author@123`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
