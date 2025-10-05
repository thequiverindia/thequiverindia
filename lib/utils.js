// Utility functions for the application

/**
 * Generate share URLs for different social media platforms
 * @param {string} platform - The social media platform name
 * @param {string} url - The URL to share
 * @param {string} text - The text/title to share
 * @returns {string} The share URL
 */
export function generateShareUrl(platform, url, text) {
  const shareUrls = {
    'X (Twitter)': `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    'Twitter': `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    'Facebook': `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    'WhatsApp': `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    'LinkedIn': `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    'Telegram': `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
  }
  
  return shareUrls[platform] || '#'
}

/**
 * Format large numbers with K/M suffixes
 * @param {number} num - The number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

/**
 * Truncate text to a specific length
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

/**
 * Get category color class
 * @param {string} category - Category name
 * @returns {string} Tailwind CSS class string
 */
export function getCategoryColor(category) {
  const colors = {
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
  
  return colors[category] || 'bg-gray-100 text-gray-700'
}

/**
 * Debounce function for search and other operations
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Check if running in browser environment
 * @returns {boolean} True if in browser
 */
export function isBrowser() {
  return typeof window !== 'undefined'
}

/**
 * Safe localStorage operations
 */
export const storage = {
  get(key, defaultValue = null) {
    if (!isBrowser()) return defaultValue
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error)
      return defaultValue
    }
  },
  
  set(key, value) {
    if (!isBrowser()) return false
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error writing to localStorage: ${key}`, error)
      return false
    }
  },
  
  remove(key) {
    if (!isBrowser()) return false
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing from localStorage: ${key}`, error)
      return false
    }
  },
  
  clear() {
    if (!isBrowser()) return false
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage', error)
      return false
    }
  }
}

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Generate slug from title
 * @param {string} title - Title to convert to slug
 * @returns {string} URL-friendly slug
 */
export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

/**
 * Calculate reading time
 * @param {string} content - Article content
 * @param {number} wordsPerMinute - Average reading speed
 * @returns {number} Reading time in minutes
 */
export function calculateReadingTime(content, wordsPerMinute = 200) {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes
}

/**
 * Get time ago string
 * @param {string|Date} date - Date to compare
 * @returns {string} Time ago string
 */
export function getTimeAgo(date) {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now - past) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`
  return `${Math.floor(diffInSeconds / 31536000)} years ago`
}
