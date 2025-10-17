// Re-export utils from main app
export * from '../../lib/utils'

// Admin-specific utility functions

/**
 * Format date for admin display
 */
export function formatAdminDate(date) {
  if (!date) return 'N/A'
  const d = new Date(date)
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Get status badge color
 */
export function getStatusColor(status) {
  const colors = {
    draft: 'bg-gray-100 text-gray-800',
    published: 'bg-green-100 text-green-800',
    scheduled: 'bg-blue-100 text-blue-800',
    archived: 'bg-yellow-100 text-yellow-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

/**
 * Get priority badge color
 */
export function getPriorityColor(priority) {
  const colors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800'
  }
  return colors[priority] || 'bg-gray-100 text-gray-800'
}

/**
 * Get role badge color
 */
export function getRoleColor(role) {
  const colors = {
    user: 'bg-gray-100 text-gray-800',
    author: 'bg-blue-100 text-blue-800',
    editor: 'bg-purple-100 text-purple-800',
    admin: 'bg-red-100 text-red-800'
  }
  return colors[role] || 'bg-gray-100 text-gray-800'
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value, total) {
  if (total === 0) return 0
  return ((value / total) * 100).toFixed(1)
}

/**
 * Format currency (Indian Rupees)
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}

