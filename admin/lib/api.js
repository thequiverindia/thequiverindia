// Admin-specific API client
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'

// Request cache to prevent duplicate calls
const requestCache = new Map()
const activeRequests = new Map()

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    return token
  }
  return null
}

// Generate cache key for requests
const getCacheKey = (endpoint, options = {}) => {
  const method = options.method || 'GET'
  const body = options.body ? JSON.stringify(options.body) : ''
  return `${method}:${endpoint}:${body}`
}

// Base API request function with caching and cancellation support
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const token = getAuthToken()
  const cacheKey = getCacheKey(endpoint, options)
  
  // For GET requests, check cache first
  if ((!options.method || options.method === 'GET') && requestCache.has(cacheKey)) {
    const cached = requestCache.get(cacheKey)
    // Return cached data if it's less than 30 seconds old
    if (Date.now() - cached.timestamp < 30000) {
      console.log('API: Returning cached data for', endpoint)
      return cached.data
    }
    // Remove expired cache
    requestCache.delete(cacheKey)
  }

  // Check if the same request is already in progress
  if (activeRequests.has(cacheKey)) {
    console.log('API: Request already in progress for', endpoint)
    return activeRequests.get(cacheKey)
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  }

  // Create AbortController for request cancellation
  const abortController = new AbortController()
  config.signal = abortController.signal

  // Create the request promise
  const requestPromise = fetch(url, config)
    .then(async (response) => {
      const data = await response.json()

      if (!response.ok) {
        // Handle 401 Unauthorized - token expired or invalid
        if (response.status === 401) {
          console.log('API: 401 Unauthorized - token invalid or expired')
          
          // Clear invalid tokens
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('user')
          
          // Dispatch global auth error event instead of immediate redirect
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('authError', {
              detail: { type: 'AUTH_ERROR', status: 401 }
            }))
          }
        }
        
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    })
    .finally(() => {
      // Clean up active request
      activeRequests.delete(cacheKey)
      
      // Cache successful GET requests
      if ((!options.method || options.method === 'GET')) {
        requestPromise.then(data => {
          requestCache.set(cacheKey, {
            data,
            timestamp: Date.now()
          })
        }).catch(() => {
          // Don't cache errors
        })
      }
    })

  // Store the active request
  activeRequests.set(cacheKey, requestPromise)

  return requestPromise
}

// Function to cancel all active requests
export const cancelAllRequests = () => {
  activeRequests.forEach((promise, key) => {
    console.log('API: Cancelling request', key)
    activeRequests.delete(key)
  })
  requestCache.clear()
}

// Function to clear cache
export const clearCache = () => {
  requestCache.clear()
}

// Authentication API
export const authAPI = {
  async login(credentials) {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })

    if (response.success && response.data.token) {
      localStorage.setItem('token', response.data.token)
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken)
      }
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
      }
    }

    return response
  },

  async logout() {
    try {
      await apiRequest('/auth/logout', { method: 'POST' })
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    }
  },

  async getMe() {
    return apiRequest('/auth/me')
  }
}

// Articles API
export const articlesAPI = {
  async getAll(params = {}) {
    // For admin panel, default to getting all articles regardless of status
    const adminParams = { status: 'all', ...params }
    const queryString = new URLSearchParams(adminParams).toString()
    return apiRequest(`/articles${queryString ? `?${queryString}` : ''}`)
  },

  async getById(id) {
    return apiRequest(`/articles/${id}`)
  },

  async create(articleData) {
    const result = await apiRequest('/articles', {
      method: 'POST',
      body: JSON.stringify(articleData)
    })
    // Clear cache after creating an article
    clearCache()
    return result
  },

  async update(id, articleData) {
    const result = await apiRequest(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(articleData)
    })
    // Clear cache after updating an article
    clearCache()
    return result
  },

  async delete(id) {
    const result = await apiRequest(`/articles/${id}`, {
      method: 'DELETE'
    })
    // Clear cache after deleting an article
    clearCache()
    return result
  }
}

// Categories API
export const categoriesAPI = {
  async getAll() {
    // For admin panel, include inactive categories
    return apiRequest('/categories?includeInactive=true')
  },

  async getById(id) {
    return apiRequest(`/categories/${id}`)
  },

  async create(categoryData) {
    const result = await apiRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData)
    })
    // Clear cache after creating a category
    clearCache()
    return result
  },

  async update(id, categoryData) {
    const result = await apiRequest(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData)
    })
    // Clear cache after updating a category
    clearCache()
    return result
  },

  async delete(id) {
    const result = await apiRequest(`/categories/${id}`, {
      method: 'DELETE'
    })
    // Clear cache after deleting a category
    clearCache()
    return result
  }
}

// Media API
export const mediaAPI = {
  async uploadImage(file) {
    const formData = new FormData()
    formData.append('image', file)

    const token = getAuthToken()
    const response = await fetch(`${API_BASE_URL}/media/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: formData
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed')
    }

    return data
  },

  async deleteImage(publicId) {
    return apiRequest(`/media/${publicId}`, {
      method: 'DELETE'
    })
  }
}

// Analytics API
export const analyticsAPI = {
  async getDashboard() {
    return apiRequest('/analytics/dashboard')
  },

  async getArticleAnalytics(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/analytics/articles${queryString ? `?${queryString}` : ''}`)
  }
}

// Users API
export const usersAPI = {
  async getAll(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/users${queryString ? `?${queryString}` : ''}`)
  },

  async getById(id) {
    return apiRequest(`/users/${id}`)
  },

  async create(userData) {
    const result = await apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
    // Clear cache after creating a user
    clearCache()
    return result
  },

  async update(id, userData) {
    const result = await apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    })
    // Clear cache after updating a user
    clearCache()
    return result
  },

  async delete(id) {
    const result = await apiRequest(`/users/${id}`, {
      method: 'DELETE'
    })
    // Clear cache after deleting a user
    clearCache()
    return result
  }
}

// Ads API
export const adsAPI = {
  async getAll(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/ads/all${queryString ? `?${queryString}` : ''}`)
  },

  async getById(id) {
    return apiRequest(`/ads/${id}`)
  },

  async create(adData) {
    const result = await apiRequest('/ads/create', {
      method: 'POST',
      body: JSON.stringify(adData)
    })
    // Clear cache after creating an ad
    clearCache()
    return result
  },

  async update(id, adData) {
    const result = await apiRequest(`/ads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(adData)
    })
    // Clear cache after updating an ad
    clearCache()
    return result
  },

  async delete(id) {
    const result = await apiRequest(`/ads/${id}`, {
      method: 'DELETE'
    })
    // Clear cache after deleting an ad
    clearCache()
    return result
  }
}

export default {
  auth: authAPI,
  articles: articlesAPI,
  categories: categoriesAPI,
  media: mediaAPI,
  analytics: analyticsAPI,
  users: usersAPI,
  ads: adsAPI
}
