'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from './Header'
import Footer from './Footer'
import { useClientSide } from '../lib/hooks'
import { formatDate } from '../lib/dateUtils'
import { STORAGE_KEYS } from '../lib/constants'

export default function SavedArticlesPage() {
  const [savedArticles, setSavedArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('newest')
  const isClientSide = useClientSide()

  useEffect(() => {
    // Load saved articles from localStorage (client-side only)
    const loadSavedArticles = () => {
      try {
        if (isClientSide && typeof window !== 'undefined') {
          const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.savedArticles) || '[]')
          setSavedArticles(saved)
        }
      } catch (error) {
        console.error('Error loading saved articles:', error)
        setSavedArticles([])
      } finally {
        setLoading(false)
      }
    }

    if (isClientSide) {
      loadSavedArticles()
    }
  }, [isClientSide])

  const handleRemoveArticle = (articleId) => {
    if (typeof window === 'undefined') return
    
    const updatedArticles = savedArticles.filter(article => article.id !== articleId)
    setSavedArticles(updatedArticles)
    localStorage.setItem(STORAGE_KEYS.savedArticles, JSON.stringify(updatedArticles))
  }

  const handleClearAll = () => {
    if (typeof window === 'undefined') return
    
    if (window.confirm('Are you sure you want to remove all saved articles?')) {
      setSavedArticles([])
      localStorage.removeItem(STORAGE_KEYS.savedArticles)
    }
  }

  const sortedArticles = [...savedArticles].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.savedAt) - new Date(a.savedAt)
      case 'oldest':
        return new Date(a.savedAt) - new Date(b.savedAt)
      case 'title':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  // Prevent hydration mismatch by not rendering until mounted
  if (!isClientSide || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading saved articles...</span>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Saved Articles</h1>
          <p className="text-lg text-gray-600">
            Your bookmarked news articles ({savedArticles.length} {savedArticles.length === 1 ? 'article' : 'articles'})
          </p>
        </div>

        {savedArticles.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📑</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No saved articles yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start saving articles you want to read later by clicking the "Save" button on any article.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Browse Articles
            </Link>
          </div>
        ) : (
          <>
            {/* Controls */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="newest">Newest Saved</option>
                    <option value="oldest">Oldest Saved</option>
                    <option value="title">Title (A-Z)</option>
                  </select>
                </div>

                <button
                  onClick={handleClearAll}
                  className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear All
                </button>
              </div>
            </div>

            {/* Saved Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedArticles.map(article => (
                <div key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Article Image */}
                  {article.image && (
                    <div className="relative aspect-video">
                      <Image
                        src={article.image.src || article.image}
                        alt={article.image.alt || article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {article.category}
                      </span>
                      <button
                        onClick={() => handleRemoveArticle(article.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove from saved"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    {/* Article Title */}
                    <Link href={`/article/${article.slug}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                    </Link>

                    {/* Article Excerpt */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Article Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-2">
                        <span>By {article.author}</span>
                        <span>•</span>
                        <span>{article.reading_time} min read</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Saved {formatDate(article.savedAt)}</span>
                      </div>
                    </div>

                    {/* Read Article Button */}
                    <Link
                      href={`/article/${article.slug}`}
                      className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      Read Article
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>
                You have saved {savedArticles.length} {savedArticles.length === 1 ? 'article' : 'articles'}. 
                Keep exploring and save more interesting reads!
              </p>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
