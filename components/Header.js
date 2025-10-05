'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SITE_CONFIG, NAV_ITEMS, MOBILE_CATEGORIES } from '../lib/constants'

export default function Header({
  isLoggedIn = false,
  userName = '',
  notificationCount = 0,
  onLogin = () => {},
  onLogout = () => {}
}) {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header
      className="bg-white shadow-sm border-b border-gray-200"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">{SITE_CONFIG.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4" role="navigation">
            {NAV_ITEMS.slice(0, 6).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors"
              >
                <span className="text-xs">{item.icon}</span>
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Search & User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:block">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  aria-label="Search news"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </form>

            {/* Notifications */}
            {isLoggedIn && notificationCount > 0 && (
              <button
                className="relative p-2 text-gray-700 hover:text-blue-600"
                aria-label={`${notificationCount} notifications`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              </button>
            )}

            {/* User Menu */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Hi, {userName}</span>
                <button
                  onClick={onLogout}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Professional Mobile Navigation */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-60 z-40 md:hidden backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Professional Slide-in Mobile Menu */}
            <div 
              id="mobile-menu" 
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 md:hidden shadow-2xl"
            >
              {/* Compact Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold">{SITE_CONFIG.name}</h2>
                    <p className="text-blue-100 text-xs">{SITE_CONFIG.tagline}</p>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Close menu"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Scrollable Menu Content */}
              <div className="h-full overflow-y-auto pb-20">
                {/* Main Navigation */}
                <div className="p-3">
                  <nav className="space-y-1">
                    {NAV_ITEMS.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-center space-x-3 px-3 py-3 text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 group-hover:bg-blue-200 rounded-lg transition-colors">
                          <span className="text-sm">{item.icon}</span>
                        </div>
                        <div className="flex-1">
                          <span className="text-base">{item.label}</span>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Search Section */}
                <div className="px-3 py-4 bg-gray-50 border-y border-gray-200">
                  <h3 className="text-xs font-semibold text-gray-600 mb-3">Search</h3>
                  <form onSubmit={handleSearchSubmit}>
                    <div className="relative">
                      <input
                        type="search"
                        placeholder="Search news..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-20 py-3 border border-gray-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        aria-label="Search news"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <button
                        type="submit"
                        className="absolute inset-y-0 right-0 pr-1 flex items-center"
                      >
                        <div className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors">
                          Go
                        </div>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Categories Grid */}
                <div className="p-3">
                  <h3 className="text-xs font-semibold text-gray-600 mb-3">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {MOBILE_CATEGORIES.map(category => (
                      <Link
                        key={category.href}
                        href={category.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex flex-col items-center p-3 border rounded-xl hover:shadow-sm transition-all duration-200 ${category.color}`}
                      >
                        <span className="text-lg mb-1">{category.icon}</span>
                        <span className="text-xs font-medium">{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="p-3">
                  <h3 className="text-xs font-semibold text-gray-600 mb-3">Quick Access</h3>
                  <div className="space-y-2">
                    <Link
                      href="/saved"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-3 py-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors"
                    >
                      <span className="text-lg">🔖</span>
                      <span className="text-sm font-medium">Saved Articles</span>
                    </Link>
                    
                    <Link
                      href="/weather"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-3 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <span className="text-lg">🌤️</span>
                      <span className="text-sm font-medium">Weather Forecast</span>
                    </Link>
                  </div>
                </div>

                {/* Login Section */}
                <div className="p-3 mt-4">
                  {isLoggedIn ? (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {userName.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-gray-700">{userName}</span>
                      </div>
                      <button
                        onClick={() => {
                          onLogout()
                          setIsMobileMenuOpen(false)
                        }}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        onLogin()
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Login to {SITE_CONFIG.name}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

