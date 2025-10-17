// API client for frontend to communicate with backend
import { API_CONFIG, STORAGE_KEYS } from './constants'
import { storage } from './utils'

/**
 * Base API request function
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise} Response data
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_CONFIG.baseUrl}${endpoint}`
  
  // Get auth token
  const token = storage.get(STORAGE_KEYS.authToken)
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }
  
  // Add auth token if available
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include'
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 401) {
        // Token expired, try to refresh
        const refreshed = await refreshAuthToken()
        if (refreshed) {
          // Retry the original request
          return apiRequest(endpoint, options)
        } else {
          // Refresh failed, logout user
          logout()
          throw new Error('Session expired. Please login again.')
        }
      }
      
      throw new Error(data.message || 'API request failed')
    }
    
    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

/**
 * Refresh authentication token
 */
async function refreshAuthToken() {
  try {
    const refreshToken = storage.get(STORAGE_KEYS.refreshToken)
    if (!refreshToken) return false
    
    const response = await fetch(`${API_CONFIG.baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    })
    
    if (response.ok) {
      const data = await response.json()
      storage.set(STORAGE_KEYS.authToken, data.data.token)
      storage.set(STORAGE_KEYS.refreshToken, data.data.refreshToken)
      return true
    }
    
    return false
  } catch (error) {
    return false
  }
}

/**
 * Logout user
 */
function logout() {
  storage.remove(STORAGE_KEYS.authToken)
  storage.remove(STORAGE_KEYS.refreshToken)
  storage.remove(STORAGE_KEYS.user)
  if (typeof window !== 'undefined') {
    window.location.href = '/login'
  }
}

// ============================================
// AUTHENTICATION API
// ============================================

export const authAPI = {
  /**
   * Register new user
   */
  async register(userData) {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
    
    if (response.success) {
      storage.set(STORAGE_KEYS.authToken, response.data.token)
      storage.set(STORAGE_KEYS.refreshToken, response.data.refreshToken)
      storage.set(STORAGE_KEYS.user, response.data.user)
    }
    
    return response
  },
  
  /**
   * Login user
   */
  async login(credentials) {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
    
    if (response.success) {
      storage.set(STORAGE_KEYS.authToken, response.data.token)
      storage.set(STORAGE_KEYS.refreshToken, response.data.refreshToken)
      storage.set(STORAGE_KEYS.user, response.data.user)
    }
    
    return response
  },
  
  /**
   * Logout user
   */
  async logout() {
    try {
      await apiRequest('/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      logout()
    }
  },
  
  /**
   * Get current user
   */
  async getMe() {
    return apiRequest('/auth/me')
  },
  
  /**
   * Update user profile
   */
  async updateProfile(profileData) {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    })
  },
  
  /**
   * Change password
   */
  async changePassword(passwords) {
    return apiRequest('/auth/password', {
      method: 'PUT',
      body: JSON.stringify(passwords)
    })
  }
}

// ============================================
// ARTICLES API
// ============================================

export const articlesAPI = {
  /**
   * Get all articles
   */
  async getAll(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/articles${queryString ? `?${queryString}` : ''}`)
  },
  
  /**
   * Get article by slug
   */
  async getBySlug(slug) {
    return apiRequest(`/articles/slug/${slug}`)
  },
  
  /**
   * Search articles
   */
  async search(query, params = {}) {
    const queryString = new URLSearchParams({ q: query, ...params }).toString()
    return apiRequest(`/articles/search?${queryString}`)
  },
  
  /**
   * Get trending articles
   */
  async getTrending(limit = 10) {
    return apiRequest(`/articles/trending?limit=${limit}`)
  },
  
  /**
   * Get featured articles
   */
  async getFeatured(limit = 10) {
    return apiRequest(`/articles/featured?limit=${limit}`)
  },
  
  /**
   * Create new article (admin/author)
   */
  async create(articleData) {
    return apiRequest('/articles', {
      method: 'POST',
      body: JSON.stringify(articleData)
    })
  },
  
  /**
   * Update article (admin/author)
   */
  async update(id, articleData) {
    return apiRequest(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(articleData)
    })
  },
  
  /**
   * Delete article (admin)
   */
  async delete(id) {
    return apiRequest(`/articles/${id}`, {
      method: 'DELETE'
    })
  },
  
  /**
   * Increment article shares
   */
  async incrementShares(id) {
    return apiRequest(`/articles/${id}/share`, {
      method: 'POST'
    })
  },
  
  /**
   * Toggle article like
   */
  async toggleLike(id, action) {
    return apiRequest(`/articles/${id}/like`, {
      method: 'POST',
      body: JSON.stringify({ action })
    })
  },
  
  /**
   * Add comment to article
   */
  async addComment(id, content) {
    return apiRequest(`/articles/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content })
    })
  }
}

// ============================================
// CATEGORIES API
// ============================================

export const categoriesAPI = {
  /**
   * Get all categories
   */
  async getAll(includeInactive = false) {
    return apiRequest(`/categories${includeInactive ? '?includeInactive=true' : ''}`)
  },
  
  /**
   * Get category by slug
   */
  async getBySlug(slug) {
    return apiRequest(`/categories/slug/${slug}`)
  },
  
  /**
   * Get articles by category
   */
  async getArticles(slug, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/categories/slug/${slug}/articles${queryString ? `?${queryString}` : ''}`)
  },
  
  /**
   * Create category (admin)
   */
  async create(categoryData) {
    return apiRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData)
    })
  },
  
  /**
   * Update category (admin)
   */
  async update(id, categoryData) {
    return apiRequest(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData)
    })
  },
  
  /**
   * Delete category (admin)
   */
  async delete(id) {
    return apiRequest(`/categories/${id}`, {
      method: 'DELETE'
    })
  }
}

// ============================================
// ADS API
// ============================================

export const adsAPI = {
  /**
   * Get active ads for placement
   */
  async getActive(placement = 'all', limit = 5) {
    return apiRequest(`/ads?placement=${placement}&limit=${limit}`)
  },
  
  /**
   * Get all ads (admin)
   */
  async getAll(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/ads/all${queryString ? `?${queryString}` : ''}`)
  },
  
  /**
   * Get single ad (admin)
   */
  async getById(id) {
    return apiRequest(`/ads/${id}`)
  },
  
  /**
   * Create ad (admin)
   */
  async create(adData) {
    return apiRequest('/ads/create', {
      method: 'POST',
      body: JSON.stringify(adData)
    })
  },
  
  /**
   * Update ad (admin)
   */
  async update(id, adData) {
    return apiRequest(`/ads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(adData)
    })
  },
  
  /**
   * Delete ad (admin)
   */
  async delete(id) {
    return apiRequest(`/ads/${id}`, {
      method: 'DELETE'
    })
  },
  
  /**
   * Track ad impression
   */
  async trackImpression(id) {
    return apiRequest(`/ads/${id}/impression`, {
      method: 'POST'
    })
  },
  
  /**
   * Track ad click
   */
  async trackClick(id) {
    return apiRequest(`/ads/${id}/click`, {
      method: 'POST'
    })
  },
  
  /**
   * Get ad analytics (admin)
   */
  async getAnalytics(id) {
    return apiRequest(`/ads/${id}/analytics`)
  }
}

// ============================================
// MEDIA API
// ============================================

export const mediaAPI = {
  /**
   * Upload single image
   */
  async uploadImage(file) {
    const formData = new FormData()
    formData.append('image', file)
    
    const token = storage.get(STORAGE_KEYS.authToken)
    
    const response = await fetch(`${API_CONFIG.baseUrl}/media/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })
    
    return response.json()
  },
  
  /**
   * Upload multiple images
   */
  async uploadMultiple(files) {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('images', file)
    })
    
    const token = storage.get(STORAGE_KEYS.authToken)
    
    const response = await fetch(`${API_CONFIG.baseUrl}/media/upload-multiple`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })
    
    return response.json()
  },
  
  /**
   * Delete image
   */
  async deleteImage(publicId) {
    const encodedId = publicId.replace(/\//g, '-')
    return apiRequest(`/media/${encodedId}`, {
      method: 'DELETE'
    })
  }
}

// ============================================
// ANALYTICS API
// ============================================

export const analyticsAPI = {
  /**
   * Get dashboard analytics (admin)
   */
  async getDashboard() {
    return apiRequest('/analytics/dashboard')
  },
  
  /**
   * Get article analytics (admin)
   */
  async getArticleAnalytics(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/analytics/articles${queryString ? `?${queryString}` : ''}`)
  }
}

// ============================================
// WEATHER API
// ============================================

export const weatherAPI = {
  /**
   * Get all weather data
   */
  async getAll() {
    return apiRequest('/weather')
  },
  
  /**
   * Get weather for specific city
   */
  async getByCity(city) {
    return apiRequest(`/weather/${city}`)
  }
}

// ============================================
// TRENDING API
// ============================================

export const trendingAPI = {
  /**
   * Get trending topics
   */
  async getTopics() {
    return apiRequest('/trending/topics')
  },
  
  /**
   * Get live updates
   */
  async getLiveUpdates() {
    return apiRequest('/trending/live-updates')
  },
  
  /**
   * Get stock market data
   */
  async getStocks() {
    return apiRequest('/trending/stocks')
  }
}

// ============================================
// USERS API (Admin)
// ============================================

export const usersAPI = {
  /**
   * Get all users (admin)
   */
  async getAll(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/users${queryString ? `?${queryString}` : ''}`)
  },
  
  /**
   * Get single user (admin)
   */
  async getById(id) {
    return apiRequest(`/users/${id}`)
  },
  
  /**
   * Update user (admin)
   */
  async update(id, userData) {
    return apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    })
  },
  
  /**
   * Delete user (admin)
   */
  async delete(id) {
    return apiRequest(`/users/${id}`, {
      method: 'DELETE'
    })
  }
}

// Export all APIs
export default {
  auth: authAPI,
  articles: articlesAPI,
  categories: categoriesAPI,
  ads: adsAPI,
  media: mediaAPI,
  analytics: analyticsAPI,
  weather: weatherAPI,
  trending: trendingAPI,
  users: usersAPI
}

