'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import ArticleCard from './ArticleCard'
import { DynamicWidgetPanel } from './DynamicComponents'
import { SORT_OPTIONS, VIEW_MODES } from '../lib/constants'

const sortOptions = SORT_OPTIONS.featured
const viewModes = VIEW_MODES

const FeaturedStats = ({ articles, currentCategory }) => {
  const totalArticles = articles.length
  const categoryCounts = articles.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1
    return acc
  }, {})

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold">{totalArticles}</div>
          <div className="text-sm opacity-90">Featured Stories</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{Object.keys(categoryCounts).length}</div>
          <div className="text-sm opacity-90">Categories</div>
        </div>
        <div>
          <div className="text-2xl font-bold">
            {articles.reduce((sum, article) => sum + (article.views || 0), 0).toLocaleString()}
          </div>
          <div className="text-sm opacity-90">Total Views</div>
        </div>
        <div>
          <div className="text-2xl font-bold">Daily</div>
          <div className="text-sm opacity-90">Updates</div>
        </div>
      </div>
    </div>
  )
}

const CategoryFilter = ({ categories, currentCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          currentCategory === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Categories
      </button>
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentCategory === category.slug
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

const Pagination = ({ pagination, onPageChange }) => {
  const { page, total_pages, has_prev, has_next } = pagination
  
  const getPageNumbers = () => {
    const pages = []
    const showPages = 5
    let start = Math.max(1, page - Math.floor(showPages / 2))
    let end = Math.min(total_pages, start + showPages - 1)
    
    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    return pages
  }

  if (total_pages <= 1) return null

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={!has_prev}
        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          has_prev
            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
        }`}
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>
      
      {getPageNumbers().map(pageNum => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            pageNum === page
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {pageNum}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!has_next}
        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          has_next
            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
        }`}
      >
        Next
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default function FeaturedPage({ 
  articles, 
  categories, 
  pagination, 
  currentCategory, 
  currentSort, 
  currentPage 
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState('grid')
  const [loading, setLoading] = useState(false)

  const updateURL = (newParams) => {
    const params = new URLSearchParams(searchParams)
    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== 'latest' && value !== 1) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    
    const queryString = params.toString()
    const newURL = queryString ? `/featured?${queryString}` : '/featured'
    router.push(newURL)
  }

  const handleCategoryChange = (category) => {
    setLoading(true)
    updateURL({ category, page: 1 })
  }

  const handleSortChange = (sort) => {
    setLoading(true)
    updateURL({ sort, page: 1 })
  }

  const handlePageChange = (page) => {
    updateURL({ page })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    setLoading(false)
  }, [articles])

  const getFeaturedBadge = (article) => {
    if (article.is_breaking) return { text: 'BREAKING', color: 'bg-red-500' }
    if (article.priority === 'high') return { text: 'URGENT', color: 'bg-orange-500' }
    if (article.views > 200000) return { text: 'VIRAL', color: 'bg-purple-500' }
    return { text: 'FEATURED', color: 'bg-blue-500' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <span className="mr-2">⭐</span>
            Editorial Selection
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the most important news stories carefully curated by our editorial team. 
            From breaking news to in-depth analysis, these are the stories that matter most.
          </p>
        </div>

        {/* Featured Stats */}
        <FeaturedStats articles={articles} currentCategory={currentCategory} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters and Controls */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📂</span>
                  Filter by Category
                </h3>
                <CategoryFilter
                  categories={categories}
                  currentCategory={currentCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </div>

              {/* Controls Row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                {/* Sort Options */}
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="mr-2">🔀</span>
                    Sort by:
                  </label>
                  <select
                    value={currentSort}
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
                  <span className="text-sm font-medium text-gray-700">View:</span>
                  {viewModes.map(mode => (
                    <button
                      key={mode.value}
                      onClick={() => setViewMode(mode.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        viewMode === mode.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      title={mode.label}
                    >
                      <span className="mr-1">{mode.icon}</span>
                      <span className="hidden sm:inline">{mode.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Info */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    Showing {((currentPage - 1) * 12) + 1}-{Math.min(currentPage * 12, pagination.total)} of {pagination.total} featured articles
                  </span>
                  <span>
                    {currentCategory === 'all' ? 'All Categories' : `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} Category`}
                  </span>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading featured articles...</span>
              </div>
            )}

            {/* Articles Display */}
            {!loading && (
              <>
                {/* Hero Featured Article */}
                {currentPage === 1 && articles.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">🌟</span>
                      Editor's Pick
                    </h2>
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                      <div className="relative">
                        {articles[0].image && (
                          <div className="relative aspect-video md:aspect-[2/1]">
                            <img
                              src={articles[0].image?.src || articles[0].image}
                              alt={articles[0].image?.alt || articles[0].title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute top-4 left-4">
                              {(() => {
                                const badge = getFeaturedBadge(articles[0])
                                return (
                                  <span className={`px-3 py-1 ${badge.color} text-white text-sm font-bold rounded-full`}>
                                    {badge.text}
                                  </span>
                                )
                              })()}
                            </div>
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center space-x-4 mb-3">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                              {articles[0].category}
                            </span>
                            <span className="text-sm text-gray-500">
                              {articles[0].reading_time} min read
                            </span>
                            <span className="text-sm text-gray-500">
                              {articles[0].views?.toLocaleString()} views
                            </span>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                            {articles[0].title}
                          </h3>
                          <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                            {articles[0].excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>By <strong className="text-gray-900">{articles[0].author}</strong></span>
                              <span>•</span>
                              <span>{articles[0].location}</span>
                            </div>
                            <a
                              href={`/article/${articles[0].slug}`}
                              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Read Full Story
                              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Articles Grid/List */}
                {viewMode === 'grid' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.slice(currentPage === 1 ? 1 : 0).map((article, index) => {
                      const badge = getFeaturedBadge(article)
                      return (
                        <div key={article.id} className="relative">
                          <div className="absolute top-2 left-2 z-10">
                            <span className={`px-2 py-1 ${badge.color} text-white text-xs font-bold rounded-full`}>
                              {badge.text}
                            </span>
                          </div>
                          <ArticleCard
                            article={article}
                            size="medium"
                            showImage={true}
                            showExcerpt={true}
                            priority={index < 6}
                            variant="featured"
                          />
                        </div>
                      )
                    })}
                  </div>
                )}

                {viewMode === 'list' && (
                  <div className="space-y-6">
                    {articles.slice(currentPage === 1 ? 1 : 0).map((article, index) => {
                      const badge = getFeaturedBadge(article)
                      return (
                        <div key={article.id} className="relative">
                          <div className="absolute top-4 left-4 z-10">
                            <span className={`px-2 py-1 ${badge.color} text-white text-xs font-bold rounded-full`}>
                              {badge.text}
                            </span>
                          </div>
                          <ArticleCard
                            article={article}
                            size="large"
                            showImage={true}
                            showExcerpt={true}
                            priority={index < 3}
                            variant="horizontal"
                          />
                        </div>
                      )
                    })}
                  </div>
                )}

                {viewMode === 'magazine' && (
                  <div className="space-y-8">
                    {articles.slice(currentPage === 1 ? 1 : 0).map((article, index) => {
                      const badge = getFeaturedBadge(article)
                      return (
                        <div key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                          <div className="md:flex">
                            {article.image && (
                              <div className="relative md:w-1/3">
                                <div className="aspect-video md:aspect-square">
                                  <img
                                    src={article.image?.src || article.image}
                                    alt={article.image?.alt || article.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="absolute top-4 left-4">
                                  <span className={`px-2 py-1 ${badge.color} text-white text-xs font-bold rounded-full`}>
                                    {badge.text}
                                  </span>
                                </div>
                              </div>
                            )}
                            <div className="p-6 md:w-2/3">
                              <div className="flex items-center space-x-4 mb-3">
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                  {article.category}
                                </span>
                                <span className="text-sm text-gray-500">{article.reading_time} min read</span>
                                <span className="text-sm text-gray-500">{article.views?.toLocaleString()} views</span>
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                                {article.title}
                              </h3>
                              <p className="text-gray-600 mb-4 leading-relaxed">
                                {article.excerpt}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>By <strong className="text-gray-900">{article.author}</strong></span>
                                  <span>•</span>
                                  <span>{article.location}</span>
                                </div>
                                <a
                                  href={`/article/${article.slug}`}
                                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                >
                                  Read More
                                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Pagination */}
                <Pagination pagination={pagination} onPageChange={handlePageChange} />

                {/* Empty State */}
                {articles.length === 0 && !loading && (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">📰</div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No featured articles found</h3>
                    <p className="text-gray-600 mb-6">
                      {currentCategory === 'all' 
                        ? 'No featured articles are available at the moment.' 
                        : `No featured articles found in the ${currentCategory} category.`}
                    </p>
                    <div className="space-x-4">
                      <button 
                        onClick={() => handleCategoryChange('all')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View All Categories
                      </button>
                      <a 
                        href="/"
                        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors inline-block"
                      >
                        Back to Homepage
                      </a>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Featured Categories */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🏆</span>
                  Top Categories
                </h3>
                <div className="space-y-3">
                  {categories.slice(0, 6).map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.slug)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="font-medium text-gray-900">{category.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{category.article_count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Widget */}
              <DynamicWidgetPanel
                widgets={[
                  {
                    id: 'trending-featured',
                    type: 'trending',
                    title: 'Trending Now',
                    icon: '📈'
                  }
                ]}
              />

              {/* Newsletter */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">✉️</span>
                  Featured Newsletter
                </h3>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Get our handpicked featured stories delivered weekly
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Subscribe to Featured
                    </button>
                  </form>
                </div>
              </div>

              {/* Advertisement */}
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <p className="text-gray-500 text-sm mb-2">Advertisement</p>
                <div className="bg-white rounded border-2 border-dashed border-gray-300 p-8">
                  <span className="text-gray-400">300 x 250</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
