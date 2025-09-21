'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import ArticleCard from './ArticleCard'
import WidgetPanel from './WidgetPanel'

const sortOptions = [
  { value: 'latest', label: 'Latest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'trending', label: 'Trending' }
]

const viewModes = [
  { value: 'grid', label: 'Grid View', icon: '⊞' },
  { value: 'list', label: 'List View', icon: '☰' }
]

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = []
    const showPages = 5
    let start = Math.max(1, currentPage - Math.floor(showPages / 2))
    let end = Math.min(totalPages, start + showPages - 1)
    
    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    return pages
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg text-sm ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        ← Previous
      </button>
      
      {getPageNumbers().map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-lg text-sm ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg text-sm ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        Next →
      </button>
    </div>
  )
}

export default function CategoryPage({ category, articlesData, currentPage }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('latest')
  const [articles, setArticles] = useState(articlesData.articles)
  const [loading, setLoading] = useState(false)

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`/category/${category.slug}?${params.toString()}`)
  }

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy)
    setLoading(true)
    
    // Simulate sorting (in real app, this would trigger new API call)
    setTimeout(() => {
      let sortedArticles = [...articles]
      
      switch (newSortBy) {
        case 'latest':
          sortedArticles.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
          break
        case 'oldest':
          sortedArticles.sort((a, b) => new Date(a.published_at) - new Date(b.published_at))
          break
        case 'popular':
          sortedArticles.sort((a, b) => (b.views || 0) - (a.views || 0))
          break
        case 'trending':
          sortedArticles.sort((a, b) => (b.shares || 0) - (a.shares || 0))
          break
      }
      
      setArticles(sortedArticles)
      setLoading(false)
    }, 500)
  }

  const getCategoryIcon = (categoryName) => {
    const icons = {
      'National': '🇮🇳',
      'Cricket': '🏏',
      'Bollywood': '🎬',
      'Economy': '💰',
      'Regional': '🗺️',
      'Science': '🔬',
      'Defence': '🛡️',
      'Culture': '🎭',
      'Health': '🏥',
      'World': '🌍'
    }
    return icons[categoryName] || '📰'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="text-center">
            <div className="text-6xl mb-4">{getCategoryIcon(category.name)}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{category.description}</p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <span>{category.article_count} articles</span>
              <span>•</span>
              <span>Updated daily</span>
              <span>•</span>
              <span>Verified sources</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                {/* Sort Options */}
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2">
                  {viewModes.map(mode => (
                    <button
                      key={mode.value}
                      onClick={() => setViewMode(mode.value)}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        viewMode === mode.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      title={mode.label}
                    >
                      <span className="mr-1">{mode.icon}</span>
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading articles...</span>
              </div>
            )}

            {/* Articles Grid/List */}
            {!loading && (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {articles.map((article, index) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        size="medium"
                        showImage={true}
                        showExcerpt={true}
                        priority={index < 6}
                        variant="default"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6 mb-8">
                    {articles.map((article, index) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        size="large"
                        showImage={true}
                        showExcerpt={true}
                        priority={index < 3}
                        variant="horizontal"
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {articlesData.pagination.total_pages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={articlesData.pagination.total_pages}
                    onPageChange={handlePageChange}
                  />
                )}

                {/* Load More Button for Infinite Scroll */}
                {articlesData.pagination.has_next && (
                  <div className="text-center mt-8">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Load More Articles
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Empty State */}
            {!loading && articles.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">
                  There are no articles in this category yet. Check back soon for updates!
                </p>
                <button 
                  onClick={() => router.push('/')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse All News
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Category Stats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Category Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Articles</span>
                    <span className="font-bold text-gray-900">{category.article_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Week</span>
                    <span className="font-bold text-green-600">+12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trending Score</span>
                    <span className="font-bold text-blue-600">92%</span>
                  </div>
                </div>
              </div>

              {/* Popular in Category */}
              <WidgetPanel
                widgets={[
                  {
                    id: 'popular-category',
                    type: 'popular',
                    title: `Popular in ${category.name}`,
                    icon: '🔥'
                  }
                ]}
              />

              {/* Related Categories */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Categories</h3>
                <div className="space-y-2">
                  {['National', 'Regional', 'Economy', 'World'].filter(cat => cat !== category.name).map(relatedCat => (
                    <a
                      key={relatedCat}
                      href={`/category/${relatedCat.toLowerCase()}`}
                      className="block p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span>{getCategoryIcon(relatedCat)}</span>
                        <span className="text-sm font-medium text-gray-900">{relatedCat}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <WidgetPanel
                widgets={[
                  {
                    id: 'newsletter-category',
                    type: 'newsletter',
                    title: 'Stay Updated',
                    icon: '✉️'
                  }
                ]}
              />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
