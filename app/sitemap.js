/**
 * Dynamic Sitemap Generation for The Quiver India
 * This generates an XML sitemap for all articles, categories, and pages
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://thequiverindia.com'
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'

/**
 * Fetch all published articles
 */
async function fetchArticles() {
  try {
    const response = await fetch(`${API_URL}/articles?status=published&limit=1000`, {
      cache: 'no-store',
    })
    
    if (!response.ok) {
      console.error('Failed to fetch articles for sitemap')
      return []
    }
    
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error)
    return []
  }
}

/**
 * Fetch all categories
 */
async function fetchCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      cache: 'no-store',
    })
    
    if (!response.ok) {
      console.error('Failed to fetch categories for sitemap')
      return []
    }
    
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error)
    return []
  }
}

/**
 * Generate sitemap
 */
export default async function sitemap() {
  const articles = await fetchArticles()
  const categories = await fetchCategories()

  // Static pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/featured`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/weather`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]

  // Category pages
  const categoryPages = categories.map((category) => ({
    url: `${BASE_URL}/category/${category.slug}`,
    lastModified: category.updatedAt || new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  // Article pages
  const articlePages = articles.map((article) => ({
    url: `${BASE_URL}/article/${article.slug}`,
    lastModified: article.updated_at || article.updatedAt || article.published_at || new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...articlePages]
}

