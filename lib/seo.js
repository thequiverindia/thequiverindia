/**
 * SEO Utility Functions
 * Provides helpers for meta tags, structured data, and SEO optimization
 */

/**
 * Generate JSON-LD structured data for articles
 * @param {Object} article - Article data
 * @param {Object} author - Author information
 * @returns {Object} JSON-LD structured data
 */
export function generateArticleStructuredData(article, author = null) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thequiverindia.com'
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt || '',
    image: article.image?.src || article.image || `${baseUrl}/og-default.jpg`,
    datePublished: article.published_at || article.createdAt,
    dateModified: article.updated_at || article.updatedAt || article.published_at || article.createdAt,
    author: {
      '@type': 'Person',
      name: author?.name || article.author || 'The Quiver India',
      url: author?.url || `${baseUrl}/author/${author?.slug || 'staff'}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Quiver India',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/article/${article.slug}`,
    },
  }

  // Add optional fields if available
  if (article.tags && article.tags.length > 0) {
    structuredData.keywords = article.tags.join(', ')
  }

  if (article.category) {
    structuredData.articleSection = article.category
  }

  if (article.reading_time) {
    structuredData.timeRequired = `PT${article.reading_time}M`
  }

  return structuredData
}

/**
 * Generate breadcrumb structured data
 * @param {Array} breadcrumbs - Array of breadcrumb items {name, url}
 * @returns {Object} JSON-LD structured data
 */
export function generateBreadcrumbStructuredData(breadcrumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

/**
 * Generate website structured data
 * @returns {Object} JSON-LD structured data
 */
export function generateWebsiteStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thequiverindia.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'The Quiver India',
    url: baseUrl,
    description: 'Your trusted source for breaking news, in-depth analysis, and compelling stories from India and around the world.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generate organization structured data
 * @returns {Object} JSON-LD structured data
 */
export function generateOrganizationStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thequiverindia.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'The Quiver India',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      'https://twitter.com/thequiverindia',
      'https://facebook.com/thequiverindia',
      'https://instagram.com/thequiverindia',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Editorial',
      email: 'editorial@thequiverindia.com',
    },
  }
}

/**
 * Generate enhanced metadata for articles
 * @param {Object} article - Article data
 * @param {Object} author - Author information
 * @returns {Object} Next.js metadata object
 */
export function generateArticleMetadata(article, author = null) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thequiverindia.com'
  const articleUrl = `${baseUrl}/article/${article.slug}`
  const imageUrl = article.image?.src || article.image || `${baseUrl}/og-default.jpg`
  
  return {
    title: `${article.title} | The Quiver India`,
    description: article.excerpt || article.title,
    keywords: article.tags ? article.tags.join(', ') : '',
    authors: author ? [{ name: author.name }] : [{ name: article.author || 'The Quiver India' }],
    creator: author?.name || article.author || 'The Quiver India',
    publisher: 'The Quiver India',
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt || article.title,
      url: articleUrl,
      siteName: 'The Quiver India',
      locale: 'en_IN',
      type: 'article',
      publishedTime: article.published_at || article.createdAt,
      modifiedTime: article.updated_at || article.updatedAt || article.published_at || article.createdAt,
      authors: [author?.name || article.author || 'The Quiver India'],
      section: article.category || 'News',
      tags: article.tags || [],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.image?.alt || article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || article.title,
      creator: '@thequiverindia',
      images: [imageUrl],
    },
    robots: {
      index: article.status === 'published',
      follow: true,
      nocache: false,
      googleBot: {
        index: article.status === 'published',
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Generate metadata for category pages
 * @param {Object} category - Category data
 * @returns {Object} Next.js metadata object
 */
export function generateCategoryMetadata(category) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thequiverindia.com'
  const categoryUrl = `${baseUrl}/category/${category.slug}`
  
  return {
    title: `${category.name} News & Articles | The Quiver India`,
    description: category.description || `Latest ${category.name} news and articles from The Quiver India`,
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      title: `${category.name} | The Quiver India`,
      description: category.description || `Latest ${category.name} news and articles`,
      url: categoryUrl,
      siteName: 'The Quiver India',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${category.name} | The Quiver India`,
      description: category.description || `Latest ${category.name} news and articles`,
    },
  }
}

/**
 * Calculate estimated reading time from content
 * @param {string} content - Article content (HTML or plain text)
 * @returns {number} Reading time in minutes
 */
export function calculateReadingTime(content) {
  if (!content) return 0
  
  // Strip HTML tags
  const plainText = content.replace(/<[^>]*>/g, '')
  
  // Average reading speed: 200-250 words per minute
  const wordsPerMinute = 225
  const words = plainText.trim().split(/\s+/).length
  const readingTime = Math.ceil(words / wordsPerMinute)
  
  return readingTime || 1
}

/**
 * Sanitize and optimize meta description
 * @param {string} text - Text to sanitize
 * @param {number} maxLength - Maximum length (default 160)
 * @returns {string} Sanitized description
 */
export function sanitizeMetaDescription(text, maxLength = 160) {
  if (!text) return ''
  
  // Strip HTML tags
  let cleanText = text.replace(/<[^>]*>/g, '')
  
  // Remove extra whitespace
  cleanText = cleanText.replace(/\s+/g, ' ').trim()
  
  // Truncate if necessary
  if (cleanText.length > maxLength) {
    cleanText = cleanText.substring(0, maxLength - 3) + '...'
  }
  
  return cleanText
}

/**
 * Generate slug from title
 * @param {string} title - Article title
 * @returns {string} URL-friendly slug
 */
export function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

