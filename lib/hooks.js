import { useState, useEffect } from 'react'

// Custom hook to prevent hydration mismatches
export function useClientSide() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
// Custom hook for localStorage with hydration safety
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key)
        if (item) {
          setStoredValue(JSON.parse(item))
        }
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error)
        setStoredValue(initialValue)
      }
    }
  }, [key, initialValue])

  const setValue = (value) => {
    try {
      setStoredValue(value)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [mounted ? storedValue : initialValue, setValue, mounted]
}

