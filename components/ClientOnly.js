'use client'

import { useState, useEffect } from 'react'

// Component that only renders on client side to prevent hydration issues
export default function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return fallback
  }

  return children
}
