import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Custom hook for API calls with automatic cleanup and caching
 */
export function useApiCall(apiFunction, dependencies = [], options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true) // Start with loading true
  const [error, setError] = useState(null)
  const abortControllerRef = useRef(null)
  const isMountedRef = useRef(true)
  const hasLoadedRef = useRef(false)
  
  const { 
    immediate = true, 
    cacheKey = null,
    cacheTime = 30000, // 30 seconds
    skipCache = false 
  } = options

  useEffect(() => {
    isMountedRef.current = true
    
    return () => {
      isMountedRef.current = false
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const execute = useCallback(async (...args) => {
    if (!isMountedRef.current) return
    
    // Cancel previous request if still running
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController()
    
    setLoading(true)
    setError(null)

    try {
      const result = await apiFunction(...args)
      
      if (!isMountedRef.current) {
        return
      }

      setData(result)
      setLoading(false)
      return result
    } catch (err) {
      console.error('API Error:', err)
      if (isMountedRef.current) {
        setError(err)
        setLoading(false)
      }
    }
  }, [apiFunction])

  // Load data on mount if immediate is true
  useEffect(() => {
    if (immediate && !hasLoadedRef.current) {
      hasLoadedRef.current = true
      execute()
    } else if (!immediate) {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate])

  return {
    data,
    loading,
    error,
    execute,
    refetch: execute
  }
}

/**
 * Hook for managing component state with proper cleanup
 */
export function useComponentState(initialState = {}) {
  const [state, setState] = useState(initialState)
  const isMountedRef = useRef(true)

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const updateState = useCallback((updates) => {
    if (isMountedRef.current) {
      setState(prev => ({ ...prev, ...updates }))
    }
  }, [])

  return [state, updateState]
}

/**
 * Hook for debounced API calls
 */
export function useDebouncedApiCall(apiFunction, delay = 300) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const timeoutRef = useRef(null)
  const abortControllerRef = useRef(null)

  const execute = useCallback(async (...args) => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    return new Promise((resolve, reject) => {
      timeoutRef.current = setTimeout(async () => {
        abortControllerRef.current = new AbortController()
        
        setLoading(true)
        setError(null)

        try {
          const result = await apiFunction(...args)
          
          if (!abortControllerRef.current?.signal.aborted) {
            setData(result)
            resolve(result)
          }
        } catch (err) {
          if (err.name !== 'AbortError') {
            setError(err)
            reject(err)
          }
        } finally {
          if (!abortControllerRef.current?.signal.aborted) {
            setLoading(false)
          }
        }
      }, delay)
    })
  }, [apiFunction, delay])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return {
    data,
    loading,
    error,
    execute
  }
}

/**
 * Hook for managing pagination with API calls
 */
export function usePaginatedApiCall(apiFunction, initialPage = 1, pageSize = 20, options = {}) {
  const { immediate = true } = options
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    page: initialPage,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false
  })
  const [loading, setLoading] = useState(true) // Start with loading true
  const [error, setError] = useState(null)
  const abortControllerRef = useRef(null)
  const isMountedRef = useRef(true)
  const hasLoadedRef = useRef(false)
  const currentPageRef = useRef(initialPage)

  useEffect(() => {
    isMountedRef.current = true
    
    return () => {
      isMountedRef.current = false
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const loadPage = useCallback(async (page, filters = {}) => {
    if (!isMountedRef.current) return
    
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    
    setLoading(true)
    setError(null)

    try {
      const params = {
        page,
        limit: pageSize,
        ...filters
      }

      const result = await apiFunction(params)
      
      if (!isMountedRef.current) {
        return
      }

      setData(result.data || result)
      
      // Handle pagination from different response structures
      const paginationData = result.pagination || result.data?.pagination
      if (paginationData) {
        const newPagination = {
          page: paginationData.page || page,
          totalPages: paginationData.totalPages || 1,
          totalItems: paginationData.total || paginationData.totalItems || 0,
          hasNext: (paginationData.page || page) < (paginationData.totalPages || 1),
          hasPrev: (paginationData.page || page) > 1
        }
        setPagination(newPagination)
        currentPageRef.current = newPagination.page
      }
      
      setLoading(false)
    } catch (err) {
      console.error('API Error:', err)
      if (isMountedRef.current) {
        setError(err)
        setLoading(false)
      }
    }
  }, [apiFunction, pageSize])

  const goToPage = useCallback((page) => {
    if (page !== currentPageRef.current) {
      loadPage(page)
    }
  }, [loadPage])

  const refresh = useCallback(() => {
    loadPage(currentPageRef.current)
  }, [loadPage])

  // Load initial data
  useEffect(() => {
    if (immediate && !hasLoadedRef.current) {
      hasLoadedRef.current = true
      loadPage(initialPage)
    } else if (!immediate) {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate])

  return {
    data,
    pagination,
    loading,
    error,
    loadPage,
    goToPage,
    refresh,
    setData
  }
}

