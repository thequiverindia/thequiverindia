// Google OAuth stub service for prototyping

export const googleAuthStub = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Mock Google OAuth response
  const mockUser = {
    id: 'google-user-123',
    email: 'user@example.com',
    name: 'John Doe',
    avatar: 'https://picsum.photos/seed/google-user/200/200',
    provider: 'google',
    preferences: {
      categories: ['politics', 'technology'],
      reading_list: [],
      notifications: true
    }
  }

  const mockToken = 'google-jwt-token-abc123def456'

  return {
    user: mockUser,
    token: mockToken,
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  }
}

// Email/password login stub
export const emailLoginStub = async (credentials) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))

  // Mock validation
  if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
    const mockUser = {
      id: 'email-user-456',
      email: credentials.email,
      name: 'John Doe',
      avatar: 'https://picsum.photos/seed/email-user/200/200',
      provider: 'email',
      preferences: {
        categories: ['politics', 'business'],
        reading_list: [],
        notifications: true
      }
    }

    const mockToken = 'email-jwt-token-xyz789uvw456'

    return {
      user: mockUser,
      token: mockToken,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }
  } else {
    throw new Error('Invalid credentials')
  }
}

// Auth service utilities
export const authService = {
  async loginWithGoogle() {
    try {
      const result = await googleAuthStub()
      localStorage.setItem('token', result.token)
      localStorage.setItem('user', JSON.stringify(result.user))
      return result
    } catch (error) {
      throw new Error('Google authentication failed')
    }
  },

  async loginWithEmail(credentials) {
    try {
      const result = await emailLoginStub(credentials)
      localStorage.setItem('token', result.token)
      localStorage.setItem('user', JSON.stringify(result.user))
      return result
    } catch (error) {
      throw new Error('Email authentication failed')
    }
  },

  async logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  getToken() {
    return localStorage.getItem('token')
  },

  isAuthenticated() {
    return !!this.getToken()
  },

  isGuest() {
    return localStorage.getItem('guest_mode') === 'true'
  },

  loginAsGuest() {
    localStorage.setItem('guest_mode', 'true')
    return { guest: true }
  }
}

