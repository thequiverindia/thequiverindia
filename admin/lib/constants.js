// Re-export constants from main app and add admin-specific ones
export * from '../../lib/constants'

// Admin-specific constants
export const ADMIN_NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/articles', label: 'Articles', icon: '📰' },
  { href: '/articles/create', label: 'New Article', icon: '✍️' },
  { href: '/categories', label: 'Categories', icon: '📂' },
  { href: '/ads', label: 'Advertisements', icon: '📢' },
  { href: '/media', label: 'Media Library', icon: '🖼️' },
  { href: '/users', label: 'Users', icon: '👥' },
  { href: '/analytics', label: 'Analytics', icon: '📈' },
  { href: '/settings', label: 'Settings', icon: '⚙️' }
]

export const ARTICLE_STATUSES = [
  { value: 'draft', label: 'Draft', color: 'gray', icon: '📝' },
  { value: 'published', label: 'Published', color: 'green', icon: '✅' },
  { value: 'scheduled', label: 'Scheduled', color: 'blue', icon: '⏰' },
  { value: 'archived', label: 'Archived', color: 'yellow', icon: '📦' }
]

export const ARTICLE_PRIORITIES = [
  { value: 'low', label: 'Low', color: 'gray' },
  { value: 'medium', label: 'Medium', color: 'blue' },
  { value: 'high', label: 'High', color: 'orange' },
  { value: 'critical', label: 'Critical', color: 'red' }
]

export const AD_TYPES = [
  { value: 'banner', label: 'Banner', icon: '🎯' },
  { value: 'sidebar', label: 'Sidebar', icon: '📌' },
  { value: 'in-article', label: 'In-Article', icon: '📄' },
  { value: 'popup', label: 'Popup', icon: '🪟' },
  { value: 'native', label: 'Native', icon: '🔗' }
]

export const AD_SIZES = [
  { value: '300x250', label: '300 x 250 (Medium Rectangle)' },
  { value: '728x90', label: '728 x 90 (Leaderboard)' },
  { value: '160x600', label: '160 x 600 (Wide Skyscraper)' },
  { value: '300x600', label: '300 x 600 (Half Page)' },
  { value: 'responsive', label: 'Responsive' }
]

export const USER_ROLES = [
  { value: 'user', label: 'User', description: 'Regular user with read access' },
  { value: 'author', label: 'Author', description: 'Can create and edit own articles' },
  { value: 'editor', label: 'Editor', description: 'Can edit all articles' },
  { value: 'admin', label: 'Admin', description: 'Full system access' }
]

