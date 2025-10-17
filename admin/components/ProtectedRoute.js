'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { authAPI } from '../lib/api'

export default function ProtectedRoute({ children }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const hasCheckedAuth = useRef(false)

  useEffect(() => {
    // Only check auth once per session to prevent constant re-authentication
    if (!hasCheckedAuth.current) {
      checkAuth()
      hasCheckedAuth.current = true
    }
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      
      console.log('ProtectedRoute: Checking auth, token:', !!token, 'user:', !!user)
      
      if (!token || !user) {
        console.log('ProtectedRoute: No token or user, redirecting to login')
        router.push('/login')
        return
      }

      // Check if token is expired (basic check without API call)
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]))
        const now = Math.floor(Date.now() / 1000)
        
        if (tokenData.exp && tokenData.exp < now) {
          console.log('ProtectedRoute: Token expired locally, clearing storage')
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('user')
          router.push('/login')
          return
        }
      } catch (tokenError) {
        console.log('ProtectedRoute: Invalid token format, clearing storage')
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        router.push('/login')
        return
      }

      // If we have a valid token format and user data, proceed
      setIsAuthenticated(true)
      
      // Don't verify with API immediately to prevent logout issues
      // Let the individual API calls handle token validation
      console.log('ProtectedRoute: Token appears valid, proceeding')
      
    } catch (error) {
      console.log('ProtectedRoute: Auth check failed:', error.message)
      router.push('/login')
    } finally {
      setIsChecking(false)
    }
  }

  // Add a global error handler for 401s
  useEffect(() => {
    const handleGlobalAuthError = (event) => {
      if (event.detail?.type === 'AUTH_ERROR' && event.detail?.status === 401) {
        console.log('ProtectedRoute: Global auth error detected, logging out')
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        router.push('/login')
      }
    }

    window.addEventListener('authError', handleGlobalAuthError)
    return () => window.removeEventListener('authError', handleGlobalAuthError)
  }, [router])

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return children
}
