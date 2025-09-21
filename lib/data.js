// Enhanced data service for TheQuiverIndia - Comprehensive Indian News Platform

const mockArticles = [
  {
    id: 1,
    title: "PM Modi Announces New Digital India 2.0 Initiative",
    slug: "pm-modi-announces-digital-india-2-initiative",
    excerpt: "Prime Minister unveils ambitious roadmap for digital transformation with focus on rural connectivity and AI integration across government services.",
    author: "Rajesh Sharma",
    category: "National",
    tags: ["modi", "digital-india", "technology", "government"],
    published_at: "2024-01-15T10:30:00Z",
    image: {
      src: "https://picsum.photos/seed/modi-digital-india/1200/800",
      alt: "PM Modi at Digital India 2.0 launch event"
    },
    reading_time: 6,
    views: 125000,
    shares: 2500,
    location: "New Delhi",
    region: "National",
    priority: "high",
    related_ids: [2, 15, 18],
    is_featured: true,
    is_breaking: false,
    sponsored: false,
    full_content: "In a landmark announcement today, Prime Minister Narendra Modi unveiled the Digital India 2.0 initiative, marking a significant leap forward in the country's digital transformation journey...",
    multimedia: {
      videos: [
        {
          id: "video-1",
          url: "https://example.com/video1.mp4",
          thumbnail: "https://picsum.photos/seed/video1/400/300",
          duration: "5:23",
          title: "PM Modi's Full Speech"
        }
      ],
      gallery: [
        {
          id: "img-1",
          url: "https://picsum.photos/seed/gallery1/800/600",
          caption: "PM Modi addressing the gathering"
        },
        {
          id: "img-2", 
          url: "https://picsum.photos/seed/gallery2/800/600",
          caption: "Digital India 2.0 presentation"
        }
      ]
    }
  },
  {
    id: 2,
    title: "India Beats Australia by 6 Wickets in MCG Thriller",
    slug: "india-beats-australia-mcg-thriller",
    excerpt: "Virat Kohli's magnificent century leads India to a stunning victory at the Melbourne Cricket Ground in the Border-Gavaskar Trophy.",
    author: "Anil Kumar",
    category: "Cricket",
    tags: ["cricket", "india", "australia", "kohli", "mcg"],
    published_at: "2024-01-15T09:45:00Z",
    image: {
      src: "https://picsum.photos/seed/cricket-india-australia/1200/800",
      alt: "Virat Kohli celebrating his century at MCG"
    },
    reading_time: 4,
    views: 250000,
    shares: 5000,
    location: "Melbourne",
    region: "International",
    priority: "high",
    related_ids: [12, 20, 25],
    is_featured: true,
    is_breaking: true,
    sponsored: false,
    full_content: "In a nail-biting finish at the iconic Melbourne Cricket Ground, Team India secured a remarkable 6-wicket victory over Australia...",
    multimedia: {
      videos: [
        {
          id: "video-2",
          url: "https://example.com/cricket-highlights.mp4",
          thumbnail: "https://picsum.photos/seed/cricket-video/400/300",
          duration: "8:45",
          title: "Match Highlights"
        }
      ],
      gallery: []
    }
  },
  {
    id: 3,
    title: "Bollywood Star Deepika Padukone Announces Mental Health Foundation",
    slug: "deepika-padukone-mental-health-foundation",
    excerpt: "The acclaimed actress launches comprehensive mental health initiative targeting youth across India with focus on destigmatization.",
    author: "Priya Malhotra",
    category: "Bollywood",
    tags: ["bollywood", "deepika-padukone", "mental-health", "foundation"],
    published_at: "2024-01-15T08:30:00Z",
    image: {
      src: "https://picsum.photos/seed/deepika-foundation/1200/800",
      alt: "Deepika Padukone at foundation launch event"
    },
    reading_time: 5,
    views: 180000,
    shares: 3200,
    location: "Mumbai",
    region: "National",
    priority: "medium",
    related_ids: [8, 14, 19],
    is_featured: true,
    is_breaking: false,
    sponsored: false,
    full_content: "Bollywood superstar Deepika Padukone today announced the launch of her mental health foundation...",
    multimedia: {
      videos: [],
      gallery: [
        {
          id: "img-3",
          url: "https://picsum.photos/seed/foundation-event/800/600",
          caption: "Foundation launch ceremony"
        }
      ]
    }
  },
  {
    id: 4,
    title: "Sensex Surges 800 Points on Strong Q3 Corporate Earnings",
    slug: "sensex-surges-q3-corporate-earnings",
    excerpt: "Indian stock markets witness massive rally as major companies report better-than-expected quarterly results, boosting investor confidence.",
    author: "Vikram Singh",
    category: "Economy",
    tags: ["sensex", "stock-market", "earnings", "economy"],
    published_at: "2024-01-15T07:45:00Z",
    image: {
      src: "https://picsum.photos/seed/sensex-rally/1200/800",
      alt: "BSE Sensex trading floor showing upward trends"
    },
    reading_time: 3,
    views: 95000,
    shares: 1200,
    location: "Mumbai",
    region: "National",
    priority: "medium",
    related_ids: [6, 11, 16],
    is_featured: false,
    is_breaking: false,
    sponsored: false,
    full_content: "The BSE Sensex soared over 800 points in today's trading session...",
    multimedia: {
      videos: [],
      gallery: []
    }
  },
  {
    id: 5,
    title: "Tamil Nadu Launches Revolutionary Green Energy Project",
    slug: "tamil-nadu-green-energy-project",
    excerpt: "State government unveils massive renewable energy initiative targeting 50% green power by 2027, creating 100,000 jobs.",
    author: "Meera Krishnan",
    category: "Regional",
    tags: ["tamil-nadu", "green-energy", "renewable", "jobs"],
    published_at: "2024-01-14T16:30:00Z",
    image: {
      src: "https://picsum.photos/seed/tn-green-energy/1200/800",
      alt: "Solar panels and wind turbines in Tamil Nadu"
    },
    reading_time: 7,
    views: 75000,
    shares: 900,
    location: "Chennai",
    region: "South India",
    priority: "medium",
    related_ids: [13, 17, 22],
    is_featured: true,
    is_breaking: false,
    sponsored: false,
    full_content: "The Tamil Nadu government today launched an ambitious green energy project...",
    multimedia: {
      videos: [
        {
          id: "video-3",
          url: "https://example.com/green-energy.mp4",
          thumbnail: "https://picsum.photos/seed/green-video/400/300",
          duration: "6:12",
          title: "Green Energy Project Overview"
        }
      ],
      gallery: []
    }
  },
  {
    id: 6,
    title: "Indian Space Mission to Venus Gets Cabinet Approval",
    slug: "isro-venus-mission-cabinet-approval",
    excerpt: "ISRO's ambitious Shukrayaan-1 mission receives government nod with ₹2,500 crore budget allocation for 2028 launch.",
    author: "Dr. Kiran Rao",
    category: "Science",
    tags: ["isro", "venus", "space-mission", "science"],
    published_at: "2024-01-14T15:00:00Z",
    image: {
      src: "https://picsum.photos/seed/isro-venus/1200/800",
      alt: "ISRO scientists working on Venus mission spacecraft"
    },
    reading_time: 8,
    views: 150000,
    shares: 2800,
    location: "Bangalore",
    region: "National",
    priority: "high",
    related_ids: [4, 21, 24],
    is_featured: true,
    is_breaking: false,
    sponsored: false,
    full_content: "In a significant milestone for India's space program, the Cabinet has approved ISRO's Venus mission...",
    multimedia: {
      videos: [],
      gallery: [
        {
          id: "img-4",
          url: "https://picsum.photos/seed/isro-lab/800/600",
          caption: "ISRO scientists at work"
        }
      ]
    }
  },
  {
    id: 7,
    title: "Rajasthan Desert Festival Showcases Rich Cultural Heritage",
    slug: "rajasthan-desert-festival-cultural-heritage",
    excerpt: "Three-day extravaganza in Jaisalmer attracts international tourists with traditional music, dance, and camel races.",
    author: "Amit Sharma",
    category: "Culture",
    tags: ["rajasthan", "festival", "culture", "tourism"],
    published_at: "2024-01-14T14:00:00Z",
    image: {
      src: "https://picsum.photos/seed/rajasthan-festival/1200/800",
      alt: "Dancers performing at Rajasthan Desert Festival"
    },
    reading_time: 4,
    views: 68000,
    shares: 1500,
    location: "Jaisalmer",
    region: "North India",
    priority: "low",
    related_ids: [9, 23, 26],
    is_featured: false,
    is_breaking: false,
    sponsored: false,
    full_content: "The annual Rajasthan Desert Festival kicked off in the golden city of Jaisalmer...",
    multimedia: {
      videos: [],
      gallery: []
    }
  },
  {
    id: 8,
    title: "Army Successfully Tests New Indigenous Drone Technology",
    slug: "army-tests-indigenous-drone-technology",
    excerpt: "Indian Army conducts successful trials of domestically developed surveillance drones along China border, boosting Make in India.",
    author: "Colonel Ravi Shankar (Retd.)",
    category: "Defence",
    tags: ["army", "drone", "indigenous", "china-border", "make-in-india"],
    published_at: "2024-01-14T13:15:00Z",
    image: {
      src: "https://picsum.photos/seed/army-drone/1200/800",
      alt: "Indian Army drone during testing operations"
    },
    reading_time: 6,
    views: 110000,
    shares: 1800,
    location: "Ladakh",
    region: "National",
    priority: "high",
    related_ids: [1, 15, 20],
    is_featured: false,
    is_breaking: false,
    sponsored: false,
    full_content: "The Indian Army has successfully tested a new generation of indigenous surveillance drones...",
    multimedia: {
      videos: [],
      gallery: []
    }
  }
]

const mockBreakingNews = [
  {
    id: "breaking-1",
    headline: "🔴 LIVE: India wins Cricket World Cup Final by 7 wickets",
    url: "/cricket/india-wins-world-cup-final",
    published_at: "2024-01-15T12:30:00Z",
    priority: "critical",
    category: "Cricket"
  },
  {
    id: "breaking-2", 
    headline: "🚨 BREAKING: Supreme Court delivers historic verdict on Article 370",
    url: "/national/supreme-court-article-370-verdict",
    published_at: "2024-01-15T12:15:00Z",
    priority: "high",
    category: "National"
  },
  {
    id: "breaking-3",
    headline: "⚡ ALERT: Cyclone Biparjoy approaches Gujarat coast, NDRF deployed",
    url: "/regional/cyclone-biparjoy-gujarat-alert",
    published_at: "2024-01-15T12:00:00Z",
    priority: "high", 
    category: "Regional"
  },
  {
    id: "breaking-4",
    headline: "📈 Sensex crosses 75,000 for first time, rupee strengthens",
    url: "/economy/sensex-75000-milestone",
    published_at: "2024-01-15T11:45:00Z",
    priority: "medium",
    category: "Economy"
  }
]

// Mock trending topics data
const mockTrendingTopics = [
  { id: 1, topic: "#DigitalIndia2", count: 125000, trend: "up" },
  { id: 2, topic: "#CricketWorldCup", count: 250000, trend: "up" },
  { id: 3, topic: "#Budget2024", count: 98000, trend: "stable" },
  { id: 4, topic: "#ClimateAction", count: 75000, trend: "up" },
  { id: 5, topic: "#StartupIndia", count: 45000, trend: "down" },
  { id: 6, topic: "#VocalForLocal", count: 62000, trend: "up" },
  { id: 7, topic: "#SkillIndia", count: 38000, trend: "stable" },
  { id: 8, topic: "#SwachhBharat", count: 55000, trend: "up" }
]

// Mock live updates data
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
  },
  {
    id: "live-3",
    time: "14:00",
    update: "Sensex gains 500 points in opening session",
    category: "Economy", 
    priority: "medium"
  },
  {
    id: "live-4",
    time: "13:45",
    update: "Tamil Nadu announces ₹1000 crore flood relief package",
    category: "Regional",
    priority: "high"
  }
]

// Mock stock market data
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
  bankNifty: {
    value: 48750.20,
    change: +380.90,
    changePercent: +0.79,
    trend: "up"
  },
  lastUpdated: "2024-01-15T14:30:00Z"
}

// Mock weather data for major Indian cities
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
  },
  "bangalore": {
    city: "Bangalore",
    state: "Karnataka",
    temperature: 24,
    condition: "Pleasant",
    humidity: 60,
    windSpeed: 8,
    visibility: 10,
    uvIndex: 5,
    pressure: 1016,
    icon: "sunny",
    forecast: [
      { day: "Today", high: 27, low: 19, condition: "Pleasant", icon: "sunny" },
      { day: "Tomorrow", high: 26, low: 18, condition: "Partly Cloudy", icon: "partly-cloudy" },
      { day: "Wed", high: 25, low: 17, condition: "Cloudy", icon: "cloudy" }
    ]
  },
  "chennai": {
    city: "Chennai",
    state: "Tamil Nadu",
    temperature: 33,
    condition: "Hot",
    humidity: 72,
    windSpeed: 18,
    visibility: 7,
    uvIndex: 9,
    pressure: 1008,
    icon: "hot",
    forecast: [
      { day: "Today", high: 36, low: 26, condition: "Hot", icon: "hot" },
      { day: "Tomorrow", high: 35, low: 25, condition: "Partly Cloudy", icon: "partly-cloudy" },
      { day: "Wed", high: 34, low: 24, condition: "Thunderstorms", icon: "stormy" }
    ]
  },
  "kolkata": {
    city: "Kolkata",
    state: "West Bengal", 
    temperature: 29,
    condition: "Humid",
    humidity: 80,
    windSpeed: 10,
    visibility: 6,
    uvIndex: 7,
    pressure: 1010,
    icon: "humid",
    forecast: [
      { day: "Today", high: 32, low: 24, condition: "Humid", icon: "humid" },
      { day: "Tomorrow", high: 31, low: 23, condition: "Rainy", icon: "rainy" },
      { day: "Wed", high: 30, low: 22, condition: "Thunderstorms", icon: "stormy" }
    ]
  },
  "hyderabad": {
    city: "Hyderabad",
    state: "Telangana",
    temperature: 30,
    condition: "Clear",
    humidity: 55,
    windSpeed: 14,
    visibility: 9,
    uvIndex: 8,
    pressure: 1012,
    icon: "sunny",
    forecast: [
      { day: "Today", high: 34, low: 22, condition: "Clear", icon: "sunny" },
      { day: "Tomorrow", high: 33, low: 21, condition: "Partly Cloudy", icon: "partly-cloudy" },
      { day: "Wed", high: 32, low: 20, condition: "Sunny", icon: "sunny" }
    ]
  },
  "pune": {
    city: "Pune",
    state: "Maharashtra",
    temperature: 26,
    condition: "Pleasant",
    humidity: 58,
    windSpeed: 11,
    visibility: 9,
    uvIndex: 6,
    pressure: 1014,
    icon: "partly-cloudy",
    forecast: [
      { day: "Today", high: 29, low: 20, condition: "Pleasant", icon: "partly-cloudy" },
      { day: "Tomorrow", high: 28, low: 19, condition: "Sunny", icon: "sunny" },
      { day: "Wed", high: 27, low: 18, condition: "Cloudy", icon: "cloudy" }
    ]
  },
  "ahmedabad": {
    city: "Ahmedabad",
    state: "Gujarat",
    temperature: 32,
    condition: "Hot",
    humidity: 45,
    windSpeed: 16,
    visibility: 8,
    uvIndex: 9,
    pressure: 1011,
    icon: "hot",
    forecast: [
      { day: "Today", high: 37, low: 23, condition: "Hot", icon: "hot" },
      { day: "Tomorrow", high: 36, low: 22, condition: "Sunny", icon: "sunny" },
      { day: "Wed", high: 35, low: 21, condition: "Partly Cloudy", icon: "partly-cloudy" }
    ]
  }
}

// Date formatting utility to ensure consistency
function formatDate(dateString, options = {}) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  })
}

export async function fetchFeaturedArticles() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  return mockArticles
}

export async function fetchBreakingNews() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))

  return mockBreakingNews
}

export async function fetchArticleBySlug(slug) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))

  const article = mockArticles.find(a => a.slug === slug)

  if (!article) {
    throw new Error('Article not found')
  }

  const relatedArticles = mockArticles
    .filter(a => article.related_ids.includes(a.id))
    .slice(0, 3)

  return {
    article,
    related_articles: relatedArticles,
    author_info: {
      name: article.author,
      bio: `${article.author} is a senior correspondent covering ${article.category.toLowerCase()}.`,
      avatar: `https://picsum.photos/seed/${article.author.toLowerCase().replace(' ', '-')}/200/200`,
      social_links: {
        twitter: `@${article.author.toLowerCase().replace(' ', '')}`,
        linkedin: `/in/${article.author.toLowerCase().replace(' ', '-')}`
      }
    }
  }
}

export async function fetchArticlesByCategory(category, page = 1, perPage = 10) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600))

  const filteredArticles = mockArticles.filter(a => a.category === category)
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

  return {
    articles: paginatedArticles,
    pagination: {
      page,
      per_page: perPage,
      total: filteredArticles.length,
      total_pages: Math.ceil(filteredArticles.length / perPage),
      has_next: endIndex < filteredArticles.length,
      has_prev: page > 1
    }
  }
}

export async function searchArticles(query, page = 1, perPage = 10) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700))

  const searchResults = mockArticles.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  )

  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const paginatedResults = searchResults.slice(startIndex, endIndex)

  return {
    articles: paginatedResults,
    pagination: {
      page,
      per_page: perPage,
      total: searchResults.length,
      total_pages: Math.ceil(searchResults.length / perPage),
      has_next: endIndex < searchResults.length,
      has_prev: page > 1
    }
  }
}

export async function fetchCategories() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))

  return [
    {
      id: "national",
      name: "National",
      slug: "national",
      description: "Latest national politics and governance news",
      article_count: 156,
      color: "#ff6b35",
      icon: "flag"
    },
    {
      id: "cricket",
      name: "Cricket",
      slug: "cricket",
      description: "Cricket news, scores, and analysis",
      article_count: 89,
      color: "#1a365d",
      icon: "sports"
    },
    {
      id: "bollywood",
      name: "Bollywood",
      slug: "bollywood", 
      description: "Entertainment news and celebrity updates",
      article_count: 124,
      color: "#e53e3e",
      icon: "film"
    },
    {
      id: "economy",
      name: "Economy",
      slug: "economy",
      description: "Financial markets, business, and economic news",
      article_count: 78,
      color: "#38a169",
      icon: "chart-line"
    },
    {
      id: "regional",
      name: "Regional",
      slug: "regional",
      description: "State-wise news and regional developments",
      article_count: 112,
      color: "#3182ce",
      icon: "map"
    },
    {
      id: "science",
      name: "Science & Tech",
      slug: "science",
      description: "Scientific discoveries and technology updates",
      article_count: 45,
      color: "#805ad5",
      icon: "atom"
    },
    {
      id: "defence",
      name: "Defence", 
      slug: "defence",
      description: "Armed forces and security-related news",
      article_count: 34,
      color: "#d69e2e",
      icon: "shield"
    },
    {
      id: "culture",
      name: "Culture",
      slug: "culture",
      description: "Arts, traditions, and cultural events",
      article_count: 52,
      color: "#ed64a6",
      icon: "palette"
    },
    {
      id: "health",
      name: "Health",
      slug: "health",
      description: "Medical news and healthcare updates",
      article_count: 67,
      color: "#48bb78",
      icon: "heart"
    },
    {
      id: "world",
      name: "World",
      slug: "world",
      description: "International news and global affairs",
      article_count: 93,
      color: "#4299e1",
      icon: "globe"
    }
  ]
}

// New data fetching functions for enhanced features

export async function fetchTrendingTopics() {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockTrendingTopics
}

export async function fetchLiveUpdates() {
  await new Promise(resolve => setTimeout(resolve, 250))
  return mockLiveUpdates
}

export async function fetchStockData() {
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockStockData
}

export async function fetchWeatherByCity(city = 'delhi') {
  await new Promise(resolve => setTimeout(resolve, 400))
  return mockWeatherData[city.toLowerCase()] || mockWeatherData.delhi
}

export async function fetchAllWeatherData() {
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockWeatherData
}

export async function fetchArticlesByRegion(region, page = 1, perPage = 10) {
  await new Promise(resolve => setTimeout(resolve, 600))
  
  const filteredArticles = mockArticles.filter(a => a.region === region)
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

  return {
    articles: paginatedArticles,
    pagination: {
      page,
      per_page: perPage,
      total: filteredArticles.length,
      total_pages: Math.ceil(filteredArticles.length / perPage),
      has_next: endIndex < filteredArticles.length,
      has_prev: page > 1
    }
  }
}

export async function fetchPopularArticles(limit = 5) {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const sortedByViews = [...mockArticles]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit)
  
  return sortedByViews
}

export async function fetchRelatedArticles(articleId, limit = 3) {
  await new Promise(resolve => setTimeout(resolve, 250))
  
  const article = mockArticles.find(a => a.id === articleId)
  if (!article) return []
  
  return mockArticles
    .filter(a => article.related_ids.includes(a.id))
    .slice(0, limit)
}
