'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from './Header'
import Footer from './Footer'
import ArticleCard from './ArticleCard'
import WidgetPanel from './WidgetPanel'
import { useClientSide } from '../lib/hooks'
import { formatDate, formatTime } from '../lib/dateUtils'
import { SHARE_PLATFORMS, STORAGE_KEYS, SUCCESS_MESSAGES, SOCIAL_PLATFORMS } from '../lib/constants'
import { 
  FaFacebookF, 
  FaWhatsapp, 
  FaLinkedinIn, 
  FaTelegramPlane,
  FaRedditAlien,
  FaPinterestP,
  FaShareAlt
} from 'react-icons/fa'
import { RiTwitterXFill } from 'react-icons/ri'

const socialLinks = SHARE_PLATFORMS.map(platform => ({
  ...platform,
  icon: platform.name === 'X (Twitter)' ? <RiTwitterXFill className="w-5 h-5 text-white" /> :
        platform.name === 'Facebook' ? <FaFacebookF className="w-5 h-5 text-white" /> :
        platform.name === 'WhatsApp' ? <FaWhatsapp className="w-5 h-5 text-white" /> :
        platform.name === 'LinkedIn' ? <FaLinkedinIn className="w-5 h-5 text-white" /> :
        platform.name === 'Telegram' ? <FaTelegramPlane className="w-5 h-5 text-white" /> :
        <FaShareAlt className="w-5 h-5 text-white" />
}))

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Rahul Kumar',
      avatar: 'https://picsum.photos/seed/rahul/40/40',
      content: 'Excellent analysis! This policy change will definitely impact the tech sector.',
      time: '2 hours ago',
      likes: 12,
      replies: [
        {
          id: 11,
          author: 'Priya Singh',
          avatar: 'https://picsum.photos/seed/priya/40/40',
          content: 'I agree, especially for startups in Bangalore.',
          time: '1 hour ago',
          likes: 3
        }
      ]
    },
    {
      id: 2,
      author: 'Dr. Anil Sharma',
      avatar: 'https://picsum.photos/seed/anil/40/40',
      content: 'The implementation timeline seems realistic. Looking forward to seeing the results.',
      time: '3 hours ago',
      likes: 8,
      replies: []
    }
  ])

  const [newComment, setNewComment] = useState('')

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: 'Anonymous User',
        avatar: 'https://picsum.photos/seed/user/40/40',
        content: newComment,
        time: 'Just now',
        likes: 0,
        replies: []
      }
      setComments([comment, ...comments])
      setNewComment('')
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Comments ({comments.length})</h3>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts on this article..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Post Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map(comment => (
          <div key={comment.id} className="space-y-4">
            <div className="flex space-x-3">
              <Image
                src={comment.avatar}
                alt={comment.author}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">{comment.author}</span>
                  <span className="text-sm text-gray-500">{comment.time}</span>
                </div>
                <p className="text-gray-700 mb-2">{comment.content}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                    <span>👍</span>
                    <span>{comment.likes}</span>
                  </button>
                  <button className="text-gray-500 hover:text-blue-600">Reply</button>
                </div>
              </div>
            </div>

            {/* Replies */}
            {comment.replies.map(reply => (
              <div key={reply.id} className="ml-12 flex space-x-3">
                <Image
                  src={reply.avatar}
                  alt={reply.author}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">{reply.author}</span>
                    <span className="text-sm text-gray-500">{reply.time}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{reply.content}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                      <span>👍</span>
                      <span>{reply.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ArticleDetailPage({ article, authorInfo, relatedArticles = [] }) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showMobileShare, setShowMobileShare] = useState(false)
  const [showSaveNotification, setShowSaveNotification] = useState(false)
  const [articleViews, setArticleViews] = useState(article.views || 0)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(Math.floor((article.views || 0) * 0.05))
  const shareDropdownRef = useRef(null)
  const isClientSide = useClientSide()

  // Check if article is already saved when component mounts (client-side only)
  useEffect(() => {
    // Only run on client side to prevent hydration mismatch
    if (isClientSide && typeof window !== 'undefined') {
      const savedArticles = JSON.parse(localStorage.getItem(STORAGE_KEYS.savedArticles) || '[]')
      const isAlreadySaved = savedArticles.some(savedArticle => savedArticle.id === article.id)
      setIsBookmarked(isAlreadySaved)
    }
  }, [article.id, isClientSide])

  // Increment view count when article is opened
  useEffect(() => {
    if (isClientSide && typeof window !== 'undefined') {
      const viewedArticles = JSON.parse(localStorage.getItem(STORAGE_KEYS.viewedArticles) || '[]')
      if (!viewedArticles.includes(article.id)) {
        setArticleViews(prev => prev + 1)
        viewedArticles.push(article.id)
        localStorage.setItem(STORAGE_KEYS.viewedArticles, JSON.stringify(viewedArticles))
      }
    }
  }, [article.id, isClientSide])

  // Handle like functionality
  const handleLike = () => {
    if (typeof window === 'undefined') return
    
    const likedArticles = JSON.parse(localStorage.getItem(STORAGE_KEYS.likedArticles) || '[]')
    
    if (isLiked) {
      // Unlike
      const updatedLiked = likedArticles.filter(id => id !== article.id)
      localStorage.setItem(STORAGE_KEYS.likedArticles, JSON.stringify(updatedLiked))
      setIsLiked(false)
      setLikeCount(prev => prev - 1)
    } else {
      // Like
      likedArticles.push(article.id)
      localStorage.setItem(STORAGE_KEYS.likedArticles, JSON.stringify(likedArticles))
      setIsLiked(true)
      setLikeCount(prev => prev + 1)
    }
  }

  // Check if article is already liked
  useEffect(() => {
    if (isClientSide && typeof window !== 'undefined') {
      const likedArticles = JSON.parse(localStorage.getItem(STORAGE_KEYS.likedArticles) || '[]')
      setIsLiked(likedArticles.includes(article.id))
    }
  }, [article.id, isClientSide])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target)) {
        setShowMobileShare(false)
      }
    }

    if (showMobileShare) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [showMobileShare])

  // Handle save/unsave article
  const handleSaveArticle = () => {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    const savedArticles = JSON.parse(localStorage.getItem(STORAGE_KEYS.savedArticles) || '[]')
    
    if (isBookmarked) {
      // Remove from saved articles
      const updatedArticles = savedArticles.filter(savedArticle => savedArticle.id !== article.id)
      localStorage.setItem(STORAGE_KEYS.savedArticles, JSON.stringify(updatedArticles))
      setIsBookmarked(false)
      showNotification(SUCCESS_MESSAGES.articleRemoved)
    } else {
      // Add to saved articles
      const articleToSave = {
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        author: article.author,
        category: article.category,
        published_at: article.published_at,
        image: article.image,
        reading_time: article.reading_time,
        savedAt: new Date().toISOString()
      }
      
      const updatedArticles = [articleToSave, ...savedArticles]
      localStorage.setItem(STORAGE_KEYS.savedArticles, JSON.stringify(updatedArticles))
      setIsBookmarked(true)
      showNotification(SUCCESS_MESSAGES.articleSaved)
    }
  }

  // Show notification
  const showNotification = (message) => {
    setShowSaveNotification(message)
    setTimeout(() => {
      setShowSaveNotification(false)
    }, 3000)
  }


  const handleShare = (platform) => {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    const url = window.location.href
    const text = article.title
    
    const shareUrls = {
      'X (Twitter)': `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      Twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      WhatsApp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      Telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed right-4 bottom-6 z-50 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:bg-blue-700"
      >
        <div className="flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
      </button>

      {/* Save Notification */}
      {showSaveNotification && (
        <div className="fixed top-20 right-4 z-50 transform transition-all duration-300 ease-in-out">
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">{showSaveNotification}</span>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Article Content */}
          <article className="lg:col-span-3">
            {/* Article Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
              {/* Category Badge and Share */}
              <div className="p-4 sm:p-6 border-b border-gray-100">
                {/* Top row - Categories */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Link 
                    href={`/category/${article.category.toLowerCase()}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                  >
                    {article.category}
                  </Link>
                  {article.is_breaking && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      🔴 BREAKING
                    </span>
                  )}
                </div>
                
                {/* Share and Actions Row */}
                <div className="flex items-center justify-between">
                  {/* Left side - Bookmark */}
                  <button
                    onClick={handleSaveArticle}
                    className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                      isBookmarked 
                        ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 shadow-sm' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-1">{isBookmarked ? '🔖' : '📑'}</span>
                    {isBookmarked ? 'Saved' : 'Save'}
                  </button>

                  {/* Right side - Share options */}
                  <div className="flex items-center space-x-2">
                    {/* Desktop - Individual share buttons */}
                    <div className="hidden md:flex items-center space-x-1">
                      {socialLinks.map(social => (
                        <button
                          key={social.name}
                          onClick={() => handleShare(social.name)}
                          className={`p-2 rounded-lg ${social.bgColor} ${social.hoverColor} text-white transition-colors hover:scale-105 transform`}
                          title={`Share on ${social.name}`}
                        >
                          {social.icon}
                        </button>
                      ))}
                    </div>

                    {/* Mobile/Tablet - Share dropdown */}
                    <div className="md:hidden relative" ref={shareDropdownRef}>
                      <button
                        onClick={() => setShowMobileShare(!showMobileShare)}
                        className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaShareAlt className="w-4 h-4 mr-1" />
                        Share
                      </button>

                      {/* Share dropdown menu */}
                      {showMobileShare && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                          {socialLinks.map(social => (
                            <button
                              key={social.name}
                              onClick={() => {
                                handleShare(social.name)
                                setShowMobileShare(false)
                              }}
                              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <div className={`w-8 h-8 rounded-full ${social.bgColor} flex items-center justify-center mr-3`}>
                                {React.cloneElement(social.icon, { className: 'w-4 h-4 text-white' })}
                              </div>
                              Share on {social.name}
                            </button>
                          ))}
                          <div className="border-t border-gray-100 mt-2 pt-2">
                            <button
                              onClick={() => {
                                if (typeof window !== 'undefined') {
                                  navigator.clipboard.writeText(window.location.href)
                                  setShowMobileShare(false)
                                }
                              }}
                              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </div>
                              Copy link
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Article Title and Meta */}
              <div className="p-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {article.title}
                </h1>
                
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="space-y-3 text-sm text-gray-500 mb-6">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span>By <strong className="text-gray-900">{article.author}</strong></span>
                    <span className="hidden sm:inline">•</span>
                    <span>{formatDate(article.published_at)}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{article.reading_time} min read</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <span>👁️</span>
                      <span>{article.views?.toLocaleString()} views</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <span>📤</span>
                      <span>{article.shares?.toLocaleString()} shares</span>
                    </div>
                  </div>
                </div>

                {/* Location Badge */}
                {article.location && (
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <span className="mr-1">📍</span>
                    <span>{article.location}, {article.region}</span>
                  </div>
                )}
              </div>

              {/* Featured Image */}
              {article.image && (
                <div className="relative aspect-video">
                  <Image
                    src={article.image.src}
                    alt={article.image.alt}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Article Metadata Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Published: {formatDate(article.published_at)}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {article.views?.toLocaleString()} views
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    {article.shares?.toLocaleString()} shares
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Last updated: {formatTime(article.published_at)}
                </div>
              </div>
            </div>

            {/* Quick Summary - Modern Feature for All Generations */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <span className="mr-2">⚡</span>
                Quick Summary - Key Points
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {article.category === 'National' && (
                  <>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                      <span className="text-sm">PM Modi announces ₹2.5L crore Digital India 2.0</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                      <span className="text-sm">AI-powered governance across 500+ services</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                      <span className="text-sm">2.5 crore jobs to be created by 2029</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                      <span className="text-sm">Rural connectivity for 2.5L villages</span>
                    </div>
                  </>
                )}
                {article.category === 'Cricket' && (
                  <>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                      <span className="text-sm">India wins by 6 wickets at MCG</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                      <span className="text-sm">Kohli scores brilliant 118* in 119 balls</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                      <span className="text-sm">India leads series 2-1</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                      <span className="text-sm">Next match: Sydney, Jan 3rd</span>
                    </div>
                  </>
                )}
                {article.category === 'Regional' && (
                  <>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                      <span className="text-sm">₹75,000 crore green energy project launched</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                      <span className="text-sm">100,000 jobs to be created</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                      <span className="text-sm">50% green power target by 2027</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                      <span className="text-sm">International partnerships with Denmark, Germany</span>
                    </div>
                  </>
                )}
                {(article.category === 'Science' || article.category === 'Economy' || article.category === 'Bollywood') && (
                  <>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                      <span className="text-sm">Major announcement with significant impact</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                      <span className="text-sm">Industry leaders and experts respond</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                      <span className="text-sm">Implementation timeline revealed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                      <span className="text-sm">Future implications discussed</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="p-6 md:p-8">
                <div className="prose prose-lg prose-blue max-w-none">
                  <div 
                    className="text-gray-800 leading-relaxed article-content"
                    dangerouslySetInnerHTML={{ 
                      __html: article.full_content || `
                        <p>${article.excerpt}</p>
                        <p>This is a developing story. More details will be updated as they become available.</p>
                        <p>For the latest updates on this story and more breaking news, stay tuned to TheQuiverIndia.</p>
                      ` 
                    }} 
                  />
                </div>
              </div>

              {/* Article Statistics */}
              <div className="border-t border-gray-200 px-6 md:px-8 py-4 bg-gray-50">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-6 text-gray-600">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {articleViews?.toLocaleString()} reads
                    </span>
                    <button 
                      onClick={handleLike}
                      className={`flex items-center transition-colors hover:scale-105 transform ${
                        isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <svg className="w-4 h-4 mr-1" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {likeCount} likes
                    </button>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {Math.floor((article.id * 7 + 15) % 50 + 10)} comments
                    </span>
                  </div>
                  <div className="text-gray-500">
                    Reading time: {article.reading_time} minutes
                  </div>
                </div>
              </div>
            </div>
            {/* Article Multimedia */}
            {article.multimedia && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-2">📸</span>
                  Multimedia Content
                </h3>
                <div className="space-y-6">
                  {/* Videos */}
                  {article.multimedia.videos?.length > 0 && (
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Related Videos</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {article.multimedia.videos.map(video => (
                          <div key={video.id} className="bg-gray-100 rounded-lg p-4">
                            <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                              <span className="text-4xl">▶️</span>
                            </div>
                            <h5 className="font-medium text-gray-900">{video.title}</h5>
                            <p className="text-sm text-gray-500">Duration: {video.duration}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Image Gallery */}
                  {article.multimedia.gallery?.length > 0 && (
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Photo Gallery</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {article.multimedia.gallery.map(image => (
                          <div key={image.id} className="relative aspect-video">
                            <Image
                              src={image.url}
                              alt={image.caption}
                              fill
                              className="object-cover rounded-lg"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-lg">
                              <p className="text-xs">{image.caption}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Article Tags */}
            {article.tags && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🏷️</span>
                  Article Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <Link
                      key={tag}
                      href={`/tag/${tag}`}
                      className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 border border-blue-200 hover:border-blue-300"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {authorInfo && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">✍️</span>
                  About the Author
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex-shrink-0 self-center sm:self-start">
                    <Image
                      src={authorInfo.avatar}
                      alt={authorInfo.name}
                      width={80}
                      height={80}
                      className="rounded-full border-2 border-gray-200"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">{authorInfo.name}</h4>
                    <p className="text-gray-600 mb-3 leading-relaxed">{authorInfo.bio}</p>
                    <div className="flex items-center justify-center sm:justify-start space-x-4">
                      <a
                        href={`https://twitter.com/${authorInfo.social_links?.twitter}`}
                        className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>🐦</span>
                        <span>Twitter</span>
                      </a>
                      <a
                        href={`https://linkedin.com${authorInfo.social_links?.linkedin}`}
                        className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>💼</span>
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Comments Section */}
            <CommentSection />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedArticles.map(relatedArticle => (
                      <Link key={relatedArticle.id} href={`/article/${relatedArticle.slug}`} className="block">
                        <div className="flex space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={relatedArticle.image?.src || '/api/placeholder/64/64'}
                              alt={relatedArticle.image?.alt || relatedArticle.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                              {relatedArticle.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {relatedArticle.reading_time} min read
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Widget */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📈</span>
                  Trending Now
                </h3>
                <div className="space-y-3">
                  {[
                    { topic: '#DigitalIndia2', count: '125K', trend: 'up', link: '/search?q=Digital India' },
                    { topic: '#CricketWorldCup', count: '250K', trend: 'up', link: '/category/cricket' },
                    { topic: '#Budget2024', count: '98K', trend: 'stable', link: '/search?q=Budget 2024' },
                    { topic: '#ClimateAction', count: '75K', trend: 'up', link: '/search?q=Climate Action' },
                    { topic: '#StartupIndia', count: '45K', trend: 'down', link: '/search?q=Startup India' }
                  ].map((item, index) => (
                    <Link key={index} href={item.link} className="block">
                      <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-gray-400 w-4">#{index + 1}</span>
                          <span className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            {item.topic}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-500">{item.count}</span>
                          <span className={`text-xs ${item.trend === 'up' ? 'text-green-500' : item.trend === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
                            {item.trend === 'up' ? '↗' : item.trend === 'down' ? '↘' : '→'}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Stock Market Widget */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  Stock Market
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-gray-900">SENSEX</div>
                      <div className="text-lg font-bold text-green-600">74,850</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">+825</div>
                      <div className="text-xs text-gray-500">+1.12%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-gray-900">NIFTY 50</div>
                      <div className="text-lg font-bold text-blue-600">22,450</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-blue-600">+245</div>
                      <div className="text-xs text-gray-500">+1.10%</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    Last updated: 2:30 PM
                  </div>
                </div>
              </div>

              {/* Weather Widget */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🌤️</span>
                  Weather
                </h3>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-3xl mr-2">🌤️</span>
                    <div className="text-3xl font-bold text-blue-600">28°C</div>
                  </div>
                  <div className="text-gray-700 font-medium">Partly Cloudy</div>
                  <div className="text-sm text-gray-500 mt-1">New Delhi, Delhi</div>
                  <div className="flex justify-between text-xs text-gray-400 mt-3">
                    <span>Humidity: 65%</span>
                    <span>Wind: 12 km/h</span>
                  </div>
                  <a href="/weather" className="text-xs text-blue-600 mt-2 font-medium block hover:text-blue-800">
                    View Full Forecast →
                  </a>
                </div>
              </div>

              {/* Most Read Articles */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🔥</span>
                  Most Read
                </h3>
                <div className="space-y-3">
                  {[
                    { 
                      title: "PM Modi Announces New Digital India 2.0 Initiative", 
                      views: "125K", 
                      time: "6 min",
                      slug: "pm-modi-announces-digital-india-2-initiative",
                      category: "National"
                    },
                    { 
                      title: "India Beats Australia by 6 Wickets in MCG Thriller", 
                      views: "250K", 
                      time: "4 min",
                      slug: "india-beats-australia-mcg-thriller",
                      category: "Cricket"
                    },
                    { 
                      title: "Sensex Surges 800 Points on Strong Q3 Corporate Earnings", 
                      views: "95K", 
                      time: "3 min",
                      slug: "sensex-surges-q3-corporate-earnings",
                      category: "Economy"
                    },
                    { 
                      title: "Tamil Nadu Launches Revolutionary Green Energy Project", 
                      views: "75K", 
                      time: "7 min",
                      slug: "tamil-nadu-green-energy-project",
                      category: "Regional"
                    }
                  ].map((popularArticle, index) => (
                    <Link key={index} href={`/article/${popularArticle.slug}`} className="block">
                      <div className="flex space-x-3 hover:bg-gray-50 rounded-lg p-3 transition-colors cursor-pointer group">
                        <span className="text-xs font-bold text-gray-400 flex-shrink-0 w-4">#{index + 1}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                            {popularArticle.title}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              popularArticle.category === 'National' ? 'bg-orange-100 text-orange-700' :
                              popularArticle.category === 'Cricket' ? 'bg-green-100 text-green-700' :
                              popularArticle.category === 'Economy' ? 'bg-blue-100 text-blue-700' :
                              'bg-purple-100 text-purple-700'
                            }`}>
                              {popularArticle.category}
                            </span>
                            <span className="text-xs text-gray-500">{popularArticle.views} views</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{popularArticle.time} read</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Live Updates */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🔴</span>
                  Live Updates
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    { 
                      time: "14:30", 
                      update: "PM Modi addresses nation on Digital India 2.0", 
                      category: "National",
                      link: "/article/pm-modi-announces-digital-india-2-initiative"
                    },
                    { 
                      time: "14:15", 
                      update: "India 287/4, chasing 342 in World Cup Final", 
                      category: "Cricket",
                      link: "/article/india-beats-australia-mcg-thriller"
                    },
                    { 
                      time: "14:00", 
                      update: "Sensex gains 500 points in opening session", 
                      category: "Economy",
                      link: "/article/sensex-surges-q3-corporate-earnings"
                    },
                    { 
                      time: "13:45", 
                      update: "Tamil Nadu announces ₹1000 crore flood relief package", 
                      category: "Regional",
                      link: "/article/tamil-nadu-green-energy-project"
                    }
                  ].map((update, index) => (
                    <Link key={index} href={update.link} className="block">
                      <div className="border-l-3 border-red-500 pl-3 py-2 hover:bg-gray-50 rounded-r-lg transition-colors cursor-pointer group">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-red-600">LIVE</span>
                          <span className="text-xs text-gray-500">{update.time}</span>
                        </div>
                        <p className="text-sm text-gray-800 leading-snug group-hover:text-blue-600 transition-colors">{update.update}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className={`inline-block text-xs px-2 py-1 rounded ${
                            update.category === 'Cricket' ? 'bg-green-100 text-green-700' :
                            update.category === 'National' ? 'bg-blue-100 text-blue-700' :
                            update.category === 'Economy' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {update.category}
                          </span>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <span className="mr-2">✉️</span>
                  Stay Updated
                </h3>
                <p className="text-blue-100 text-sm mb-4">
                  Get breaking news and top stories delivered to your inbox
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-blue-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors"
                  >
                    Subscribe Now
                  </button>
                </form>
                <p className="text-xs text-blue-200 mt-2 text-center">
                  Join 2.5M+ subscribers. No spam, unsubscribe anytime.
                </p>
              </div>

              {/* Advertisement */}
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <p className="text-gray-500 text-sm mb-2">Advertisement</p>
                <div className="bg-white rounded border-2 border-dashed border-gray-300 p-8">
                  <span className="text-gray-400">300 x 250</span>
                </div>
              </div>

              {/* Social Media Follow */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📱</span>
                  Follow Us
                </h3>
                <div className="space-y-3">
                  {SOCIAL_PLATFORMS.map((social, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${social.color} rounded-full flex items-center justify-center text-white`}>
                          <span className="text-sm">{social.icon}</span>
                        </div>
                        <span className="font-medium text-gray-900">{social.name}</span>
                      </div>
                      <div className="text-sm text-gray-500">{social.followers}</div>
                    </div>
                  ))}
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
