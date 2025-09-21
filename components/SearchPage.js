'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import ArticleCard from './ArticleCard'
import { searchArticles, fetchTrendingTopics } from '../lib/data'

const SearchSuggestions = ({ onSelect }) => {
  const suggestions = [
    '🇮🇳 Modi Digital India',
    '🏏 Cricket World Cup',
    '💰 Stock Market Today',
    '🎬 Bollywood News',
    '🌍 International Affairs',
    '🔬 Science Technology',
    '🏥 Health Updates',
    '🌾 Agriculture Policy'
  ]

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-10">
      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Popular Searches</h4>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSelect(suggestion.replace(/^[\ud800-\udbff][\udc00-\udfff]\s/, ''))}
              className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const SearchFilters = ({ onFilterChange, activeFilters }) => {
  const categories = ['All', 'National', 'Cricket', 'Bollywood', 'Economy', 'Regional', 'Science', 'Defence', 'Culture', 'Health', 'World']
  const timeFilters = ['Any time', 'Past hour', 'Past 24 hours', 'Past week', 'Past month', 'Past year']
  const sortOptions = ['Relevance', 'Newest first', 'Oldest first', 'Most popular']

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={activeFilters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Time Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
          <select
            value={activeFilters.time}
            onChange={(e) => onFilterChange('time', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {timeFilters.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
          <select
            value={activeFilters.sort}
            onChange={(e) => onFilterChange('sort', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map(sort => (
              <option key={sort} value={sort}>{sort}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage({ initialQuery, searchResults: initialResults, currentPage, error }) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState(initialResults)
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filters, setFilters] = useState({
    category: 'All',
    time: 'Any time',
    sort: 'Relevance'
  })
  const [trendingTopics, setTrendingTopics] = useState([])

  useEffect(() => {
    fetchTrendingTopics().then(setTrendingTopics).catch(console.error)
  }, [])

  const handleSearch = async (searchQuery = query, page = 1) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setShowSuggestions(false)

    // Update URL
    const params = new URLSearchParams()
    params.set('q', searchQuery)
    if (page > 1) params.set('page', page.toString())
    router.push(`/search?${params.toString()}`)

    try {
      const results = await searchArticles(searchQuery, page, 12)
      setSearchResults(results)
    } catch (err) {
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
    // In a real app, this would trigger a new search with filters
    if (query) {
      handleSearch(query, 1)
    }
  }

  const handleSuggestionSelect = (suggestion) => {
    setQuery(suggestion)
    handleSearch(suggestion)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Search News</h1>
          <p className="text-lg text-gray-600">Find the latest news and stories from across India</p>
        </div>

        {/* Search Box */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for news, topics, people..."
                className="w-full px-6 py-4 pl-12 pr-16 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                onClick={() => handleSearch()}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <span className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Search
                </span>
              </button>
            </div>

            {/* Search Suggestions */}
            {showSuggestions && !query && (
              <SearchSuggestions onSelect={handleSuggestionSelect} />
            )}
          </div>
        </div>

        {/* Search Filters */}
        {query && (
          <SearchFilters onFilterChange={handleFilterChange} activeFilters={filters} />
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Searching...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Search Error</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        )}

        {/* Search Results */}
        {!loading && searchResults && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Results */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Search Results for "{query}"
                </h2>
                <p className="text-gray-600">
                  {searchResults.pagination.total} results found
                </p>
              </div>

              {/* Articles Grid */}
              {searchResults.articles.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {searchResults.articles.map((article, index) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        size="medium"
                        showImage={true}
                        showExcerpt={true}
                        priority={index < 6}
                        variant="default"
                        searchQuery={query}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {searchResults.pagination.total_pages > 1 && (
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleSearch(query, currentPage - 1)}
                        disabled={!searchResults.pagination.has_prev}
                        className={`px-4 py-2 rounded-lg text-sm ${
                          searchResults.pagination.has_prev
                            ? 'text-gray-700 hover:bg-gray-100'
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        ← Previous
                      </button>
                      
                      <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                        {currentPage}
                      </span>
                      
                      <button
                        onClick={() => handleSearch(query, currentPage + 1)}
                        disabled={!searchResults.pagination.has_next}
                        className={`px-4 py-2 rounded-lg text-sm ${
                          searchResults.pagination.has_next
                            ? 'text-gray-700 hover:bg-gray-100'
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms or filters
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>Suggestions:</p>
                    <ul className="space-y-1">
                      <li>• Check your spelling</li>
                      <li>• Try more general keywords</li>
                      <li>• Use different search terms</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="space-y-6">
                {/* Trending Searches */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Trending Searches</h3>
                  <div className="space-y-2">
                    {trendingTopics.slice(0, 6).map((topic, index) => (
                      <button
                        key={topic.id}
                        onClick={() => handleSuggestionSelect(topic.topic.replace('#', ''))}
                        className="block w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">{topic.topic}</span>
                          <span className="text-xs text-gray-500">#{index + 1}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    {['National News', 'Cricket Updates', 'Bollywood Gossip', 'Stock Market', 'Weather Forecast'].map(link => (
                      <button
                        key={link}
                        onClick={() => handleSuggestionSelect(link)}
                        className="block w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        {link}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* No Query State */}
        {!query && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Start Your Search</h3>
            <p className="text-gray-600 mb-8">
              Enter keywords to find the latest news and stories
            </p>
            
            {/* Popular Searches */}
            <div className="max-w-2xl mx-auto">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Popular Searches</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {trendingTopics.slice(0, 8).map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => handleSuggestionSelect(topic.topic.replace('#', ''))}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                  >
                    {topic.topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
