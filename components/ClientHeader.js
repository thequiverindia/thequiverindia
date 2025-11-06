'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from './Header'

export default function ClientHeader() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
      
      if (token && userStr) {
        const user = JSON.parse(userStr)
        setIsLoggedIn(true)
        setUserName(user.name || user.email)
      } else {
        setIsLoggedIn(false)
        setUserName('')
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
      setIsLoggedIn(false)
      setUserName('')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = () => {
    router.push('/login')
  }

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    
    // Update state
    setIsLoggedIn(false)
    setUserName('')
    
    // Redirect to home
    router.push('/')
    
    // Force page reload to clear any cached data
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  // Show nothing during loading to prevent flash
  if (loading) {
    return (
      <Header 
        isLoggedIn={false}
        userName=""
        notificationCount={0}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    )
  }

  return (
    <Header 
      isLoggedIn={isLoggedIn}
      userName={userName}
      notificationCount={0}
      onLogin={handleLogin}
      onLogout={handleLogout}
    />
  )
}

