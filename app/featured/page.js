import { fetchFeaturedArticles, fetchCategories } from '../../lib/data'
import FeaturedPage from '../../components/FeaturedPage'

export const metadata = {
  title: 'Featured Stories - TheQuiverIndia',
  description: 'Discover the most important and trending news stories handpicked by our editorial team. Stay informed with our featured articles covering politics, sports, entertainment, and more.',
  openGraph: {
    title: 'Featured Stories - TheQuiverIndia',
    description: 'Handpicked news stories and trending articles from India and around the world.',
    type: 'website',
  },
}

export default async function Featured({ searchParams }) {
  const page = parseInt(searchParams.page) || 1
  const category = searchParams.category || 'all'
  const sort = searchParams.sort || 'latest'
  
  const featuredArticles = await fetchFeaturedArticles()
  const categories = await fetchCategories()

  // Filter and sort articles based on query parameters
  let filteredArticles = featuredArticles.filter(article => article.is_featured)
  
  if (category !== 'all') {
    filteredArticles = filteredArticles.filter(article => 
      article.category.toLowerCase() === category.toLowerCase()
    )
  }

  // Sort articles
  switch (sort) {
    case 'popular':
      filteredArticles.sort((a, b) => (b.views || 0) - (a.views || 0))
      break
    case 'trending':
      filteredArticles.sort((a, b) => (b.shares || 0) - (a.shares || 0))
      break
    case 'oldest':
      filteredArticles.sort((a, b) => new Date(a.published_at) - new Date(b.published_at))
      break
    default: // latest
      filteredArticles.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
  }

  // Pagination
  const perPage = 12
  const totalPages = Math.ceil(filteredArticles.length / perPage)
  const startIndex = (page - 1) * perPage
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + perPage)

  const paginationData = {
    page,
    per_page: perPage,
    total: filteredArticles.length,
    total_pages: totalPages,
    has_next: page < totalPages,
    has_prev: page > 1
  }

  return (
    <FeaturedPage
      articles={paginatedArticles}
      categories={categories}
      pagination={paginationData}
      currentCategory={category}
      currentSort={sort}
      currentPage={page}
    />
  )
}
