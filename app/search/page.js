import { searchArticles } from '../../lib/data'
import SearchPage from '../../components/SearchPage'

export const metadata = {
  title: 'Search - TheQuiverIndia',
  description: 'Search for news articles, topics, and stories across TheQuiverIndia.',
}

export default async function Search({ searchParams }) {
  const query = searchParams.q || ''
  const page = parseInt(searchParams.page) || 1
  
  let searchResults = null
  let error = null

  if (query) {
    try {
      searchResults = await searchArticles(query, page, 12)
    } catch (err) {
      error = 'Failed to search articles'
    }
  }

  return (
    <SearchPage
      initialQuery={query}
      searchResults={searchResults}
      currentPage={page}
      error={error}
    />
  )
}
