// Application-wide constants and configuration

// Site Configuration
export const SITE_CONFIG = {
  name: 'The Quiver',
  fullName: 'The Quiver India',
  tagline: 'India\'s Digital News',
  description: 'Your trusted source for breaking news, in-depth analysis, and compelling stories from India and around the world.',
  url: 'https://thequiverindia.com',
  locale: 'en_IN',
  twitter: '@thequiverindia',
}

// Navigation Items
export const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/featured', label: 'Featured', icon: '⭐' },
  { href: '/category/national', label: 'National', icon: '🇮🇳' },
  { href: '/category/cricket', label: 'Cricket', icon: '🏏' },
  { href: '/category/bollywood', label: 'Bollywood', icon: '🎬' },
  { href: '/category/economy', label: 'Economy', icon: '💰' },
  { href: '/weather', label: 'Weather', icon: '🌤️' },
  { href: '/saved', label: 'Saved', icon: '🔖' }
]

// Category Configuration
export const CATEGORY_ICONS = {
  'National': '🇮🇳',
  'Cricket': '🏏',
  'Bollywood': '🎬',
  'Economy': '💰',
  'Regional': '🗺️',
  'Science': '🔬',
  'Defence': '🛡️',
  'Culture': '🎭',
  'Health': '🏥',
  'World': '🌍'
}

export const CATEGORY_COLORS = {
  'National': 'bg-orange-100 text-orange-700',
  'Cricket': 'bg-green-100 text-green-700',
  'Bollywood': 'bg-pink-100 text-pink-700',
  'Economy': 'bg-blue-100 text-blue-700',
  'Regional': 'bg-purple-100 text-purple-700',
  'Science': 'bg-indigo-100 text-indigo-700',
  'Defence': 'bg-yellow-100 text-yellow-700',
  'Culture': 'bg-red-100 text-red-700',
  'Health': 'bg-green-100 text-green-700',
  'World': 'bg-blue-100 text-blue-700'
}

// Mobile Categories for Navigation
export const MOBILE_CATEGORIES = [
  { name: 'National', icon: '🇮🇳', href: '/category/national', color: 'bg-orange-50 border-orange-200 text-orange-700' },
  { name: 'Cricket', icon: '🏏', href: '/category/cricket', color: 'bg-green-50 border-green-200 text-green-700' },
  { name: 'Bollywood', icon: '🎬', href: '/category/bollywood', color: 'bg-pink-50 border-pink-200 text-pink-700' },
  { name: 'Economy', icon: '💰', href: '/category/economy', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { name: 'Regional', icon: '🗺️', href: '/category/regional', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { name: 'Science', icon: '🔬', href: '/category/science', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' }
]

// Social Media Configuration
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/thequiver',
  facebook: 'https://facebook.com/thequiver',
  instagram: 'https://instagram.com/thequiver',
  youtube: 'https://youtube.com/thequiver',
  linkedin: 'https://linkedin.com/company/thequiver'
}

export const SOCIAL_PLATFORMS = [
  { name: 'Twitter', followers: '2.5M', icon: '🐦', color: 'bg-black', href: SOCIAL_LINKS.twitter },
  { name: 'Facebook', followers: '1.8M', icon: '📘', color: 'bg-blue-600', href: SOCIAL_LINKS.facebook },
  { name: 'Instagram', followers: '1.2M', icon: '📷', color: 'bg-pink-500', href: SOCIAL_LINKS.instagram },
  { name: 'YouTube', followers: '950K', icon: '📺', color: 'bg-red-600', href: SOCIAL_LINKS.youtube }
]

// Social Share Configuration
export const SHARE_PLATFORMS = [
  { 
    name: 'X (Twitter)', 
    color: '#000000',
    bgColor: 'bg-black',
    hoverColor: 'hover:bg-gray-800',
  },
  { 
    name: 'Facebook', 
    color: '#4267B2',
    bgColor: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
  },
  { 
    name: 'WhatsApp', 
    color: '#25D366',
    bgColor: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
  },
  { 
    name: 'LinkedIn', 
    color: '#0077B5',
    bgColor: 'bg-blue-700',
    hoverColor: 'hover:bg-blue-800',
  },
  { 
    name: 'Telegram', 
    color: '#0088cc',
    bgColor: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
  }
]

// Footer Links
export const FOOTER_LINKS = {
  legal: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/advertise', label: 'Advertise' }
  ],
  categories: [
    { href: '/politics', label: 'Politics' },
    { href: '/business', label: 'Business' },
    { href: '/technology', label: 'Technology' },
    { href: '/sports', label: 'Sports' },
    { href: '/world', label: 'World' }
  ],
  quickLinks: [
    { href: '/sitemap', label: 'Sitemap' },
    { href: '/rss', label: 'RSS' }
  ]
}

// Sort Options
export const SORT_OPTIONS = {
  articles: [
    { value: 'latest', label: 'Latest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'trending', label: 'Trending' }
  ],
  featured: [
    { value: 'latest', label: 'Latest First', icon: '🕐' },
    { value: 'popular', label: 'Most Popular', icon: '🔥' },
    { value: 'trending', label: 'Trending', icon: '📈' },
    { value: 'oldest', label: 'Oldest First', icon: '📅' }
  ]
}

// View Mode Options
export const VIEW_MODES = [
  { value: 'grid', label: 'Grid View', icon: '⊞' },
  { value: 'list', label: 'List View', icon: '☰' },
  { value: 'magazine', label: 'Magazine View', icon: '📰' }
]

// Weather Icons
export const WEATHER_ICONS = {
  'sunny': '☀️',
  'partly-cloudy': '⛅',
  'cloudy': '☁️',
  'rainy': '🌧️',
  'stormy': '⛈️',
  'humid': '🌫️',
  'hot': '🥵',
  'cold': '🥶',
  'default': '🌤️'
}

// Major Indian Cities
export const MAJOR_CITIES = [
  { name: 'New Delhi', key: 'delhi', state: 'Delhi' },
  { name: 'Mumbai', key: 'mumbai', state: 'Maharashtra' },
  { name: 'Bangalore', key: 'bangalore', state: 'Karnataka' },
  { name: 'Chennai', key: 'chennai', state: 'Tamil Nadu' },
  { name: 'Kolkata', key: 'kolkata', state: 'West Bengal' },
  { name: 'Hyderabad', key: 'hyderabad', state: 'Telangana' },
  { name: 'Pune', key: 'pune', state: 'Maharashtra' },
  { name: 'Ahmedabad', key: 'ahmedabad', state: 'Gujarat' }
]

// Search Suggestions
export const SEARCH_SUGGESTIONS = [
  '🇮🇳 Modi Digital India',
  '🏏 Cricket World Cup',
  '💰 Stock Market Today',
  '🎬 Bollywood News',
  '🌍 International Affairs',
  '🔬 Science Technology',
  '🏥 Health Updates',
  '🌾 Agriculture Policy'
]

// Popular Search Topics
export const POPULAR_SEARCH_TOPICS = [
  'National News',
  'Cricket Updates',
  'Bollywood Gossip',
  'Stock Market',
  'Weather Forecast'
]

// Pagination Configuration
export const PAGINATION_CONFIG = {
  articlesPerPage: 12,
  searchResultsPerPage: 12,
  relatedArticlesCount: 3,
  popularArticlesCount: 5,
  trendingTopicsCount: 6
}

// Newsletter Configuration
export const NEWSLETTER_CONFIG = {
  subscriberCount: '2.5M+',
  features: [
    'Breaking news alerts',
    'Daily digest',
    'Weekly roundup',
    'No spam guarantee'
  ]
}

// API Configuration (backend integration)
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  timeout: 10000,
  endpoints: {
    articles: '/articles',
    categories: '/categories',
    search: '/search',
    trending: '/trending',
    weather: '/weather',
    auth: '/auth'
  }
}

// Local Storage Keys
export const STORAGE_KEYS = {
  savedArticles: 'savedArticles',
  viewedArticles: 'viewedArticles',
  likedArticles: 'likedArticles',
  authToken: 'token',
  refreshToken: 'refreshToken',
  user: 'user',
  guestMode: 'guest_mode',
  preferences: 'userPreferences'
}

// Feature Flags (for gradual feature rollout)
export const FEATURE_FLAGS = {
  enableComments: true,
  enableBookmarks: true,
  enableSharing: true,
  enableNewsletter: true,
  enableLiveUpdates: true,
  enablePushNotifications: false,
  enableDarkMode: false
}

// Error Messages
export const ERROR_MESSAGES = {
  articleNotFound: 'Article not found. It may have been removed or the link is incorrect.',
  searchFailed: 'Search failed. Please try again.',
  networkError: 'Network error. Please check your connection.',
  authFailed: 'Authentication failed. Please try again.',
  saveFailed: 'Failed to save article. Please try again.',
  loadFailed: 'Failed to load content. Please refresh the page.'
}

// Success Messages
export const SUCCESS_MESSAGES = {
  articleSaved: 'Article saved successfully!',
  articleRemoved: 'Article removed from saved items',
  subscribed: 'Successfully subscribed to newsletter!',
  loginSuccess: 'Login successful!',
  logoutSuccess: 'Logged out successfully'
}

// Date Format Options
export const DATE_FORMATS = {
  full: { year: 'numeric', month: 'long', day: 'numeric' },
  short: { year: 'numeric', month: 'short', day: 'numeric' },
  monthDay: { month: 'short', day: 'numeric' },
  time: { hour: '2-digit', minute: '2-digit' }
}

// Meta Tags Configuration
export const META_CONFIG = {
  defaultTitle: 'The Quiver India - Breaking News & Analysis',
  titleTemplate: '%s - The Quiver India',
  defaultDescription: 'Your trusted source for breaking news, in-depth analysis, and compelling stories from India and around the world.',
  keywords: 'news, india, politics, business, technology, breaking news, analysis',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
}

// Advertisement Slots (for future ad integration)
export const AD_SLOTS = {
  sidebar: 'sidebar-300x250',
  header: 'header-728x90',
  inArticle: 'in-article-responsive',
  footer: 'footer-728x90'
}

// Analytics Events (for future analytics integration)
export const ANALYTICS_EVENTS = {
  articleView: 'article_view',
  articleShare: 'article_share',
  articleSave: 'article_save',
  searchPerformed: 'search_performed',
  categoryView: 'category_view',
  newsletterSignup: 'newsletter_signup'
}
