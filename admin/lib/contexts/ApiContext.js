'use client'

import { createContext, useContext, useEffect, useRef } from 'react'
import { cancelAllRequests, clearCache } from '../api'

const ApiContext = createContext()

export function ApiProvider({ children }) {
  const isNavigatingRef = useRef(false)

  useEffect(() => {
    // Clear cache and cancel requests when navigating away
    const handleBeforeUnload = () => {
      cancelAllRequests()
      clearCache()
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, cancel pending requests
        cancelAllRequests()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const value = {
    isNavigating: isNavigatingRef.current,
    setIsNavigating: (value) => {
      isNavigatingRef.current = value
    }
  }

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  )
}

export function useApiContext() {
  const context = useContext(ApiContext)
  if (!context) {
    throw new Error('useApiContext must be used within an ApiProvider')
  }
  return context
}

