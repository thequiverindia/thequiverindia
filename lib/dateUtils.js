// Safe date formatting utilities to prevent hydration mismatches

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const shortMonths = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

export function formatDate(dateString, options = {}) {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = options.short ? shortMonths[date.getMonth()] : months[date.getMonth()]
  const year = date.getFullYear()
  
  return `${month} ${day}, ${year}`
}

export function formatTime(dateString, options = {}) {
  const date = new Date(dateString)
  let hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  
  hours = hours % 12
  hours = hours ? hours : 12 // 0 should be 12
  
  return `${hours}:${minutes} ${ampm}`
}

export function formatRelativeTime(dateString) {
  if (typeof window === 'undefined') {
    // Server-side: return simple format
    return 'Recently'
  }
  
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  
  return formatDate(dateString)
}

export function getCurrentYear() {
  if (typeof window === 'undefined') {
    return 2025 // Fallback year for SSR
  }
  return new Date().getFullYear()
}
