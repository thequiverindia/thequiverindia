'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from './Header'
import Footer from './Footer'
import ArticleCard from './ArticleCard'
import WidgetPanel from './WidgetPanel'

const socialLinks = [
  { 
    name: 'Twitter', 
    color: 'bg-black hover:bg-gray-800',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  { 
    name: 'Facebook', 
    color: 'bg-blue-600 hover:bg-blue-700',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  { 
    name: 'WhatsApp', 
    color: 'bg-green-500 hover:bg-green-600',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.488"/>
      </svg>
    )
  },
  { 
    name: 'LinkedIn', 
    color: 'bg-blue-700 hover:bg-blue-800',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  { 
    name: 'Telegram', 
    color: 'bg-blue-500 hover:bg-blue-600',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    )
  }
]

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
  const [fontSize, setFontSize] = useState('medium')
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showMobileShare, setShowMobileShare] = useState(false)

  const fontSizes = {
    small: 'text-base',
    medium: 'text-lg',
    large: 'text-xl'
  }

  const handleShare = (platform) => {
    const url = window.location.href
    const text = article.title
    
    const shareUrls = {
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
                
                {/* Bottom row - Share options */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`p-2 rounded-lg transition-colors ${
                        isBookmarked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-lg">{isBookmarked ? '🔖' : '📑'}</span>
                    </button>
                    <span className="text-sm text-gray-500 hidden sm:inline">Share:</span>
                  </div>
                  
                  {/* Desktop Social Links */}
                  <div className="hidden sm:flex items-center space-x-2">
                    {socialLinks.map(social => (
                      <button
                        key={social.name}
                        onClick={() => handleShare(social.name)}
                        className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg ${social.color} text-white transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md`}
                        title={`Share on ${social.name}`}
                      >
                        {social.icon}
                        <span className="text-sm font-medium hidden md:inline">{social.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Mobile Share Button */}
                  <div className="sm:hidden">
                    <button
                      onClick={() => setShowMobileShare(!showMobileShare)}
                      className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      <span className="text-sm font-semibold">Share</span>
                      <div className="w-1 h-1 bg-white rounded-full opacity-60"></div>
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">5</span>
                    </button>
                  </div>
                </div>

                {/* Mobile Share Menu */}
                {showMobileShare && (
                  <div className="sm:hidden mt-4 p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-gray-800">Share this article</span>
                      </div>
                      <button
                        onClick={() => setShowMobileShare(false)}
                        className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      {socialLinks.map(social => (
                        <button
                          key={social.name}
                          onClick={() => {
                            handleShare(social.name)
                            setShowMobileShare(false)
                          }}
                          className={`group relative flex items-center justify-center p-4 rounded-xl ${social.color} text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95`}
                          title={`Share on ${social.name}`}
                        >
                          <div className="w-8 h-8 flex items-center justify-center">
                            {React.cloneElement(social.icon, { className: 'w-6 h-6' })}
                          </div>
                          
                          {/* Subtle glow effect */}
                          <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Copy Link Option */}
                    <div className="mt-4 pt-4 border-t border-gray-300">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href)
                          setShowMobileShare(false)
                          // You could add a toast notification here
                        }}
                        className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">Copy Link</span>
                      </button>
                    </div>
                  </div>
                )}
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
                    <span>{new Date(article.published_at).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
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

            {/* Article Tools */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="text-sm text-gray-600 font-medium">Font Size:</span>
                  <div className="flex items-center space-x-1">
                    {Object.keys(fontSizes).map(size => (
                      <button
                        key={size}
                        onClick={() => setFontSize(size)}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                          fontSize === size 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>🕒</span>
                  <span className="hidden sm:inline">Last updated:</span>
                  <span>{new Date(article.published_at).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
              <div className={`prose prose-lg max-w-none ${fontSizes[fontSize]}`}>
                <div className="text-gray-700 leading-relaxed space-y-6">
                  {article.full_content ? (
                    <div dangerouslySetInnerHTML={{ __html: article.full_content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>') }} />
                  ) : (
                    <>
                      <p>
                        {article.excerpt}
                      </p>
                      <p>
                        In a landmark development that promises to reshape the digital landscape of India, 
                        Prime Minister Narendra Modi today unveiled the comprehensive Digital India 2.0 initiative. 
                        This ambitious program represents a significant evolution from the original Digital India mission, 
                        incorporating cutting-edge technologies and addressing the emerging needs of a rapidly digitalizing nation.
                      </p>
                      <p>
                        The new initiative focuses on three key pillars: universal digital access, 
                        AI-powered governance, and sustainable digital infrastructure. Speaking at the launch event 
                        in New Delhi, PM Modi emphasized the transformative potential of this program in creating 
                        a more inclusive and efficient digital ecosystem.
                      </p>
                      <p>
                        "Digital India 2.0 is not just about technology; it's about empowering every citizen 
                        with the tools they need to participate in the digital economy," the Prime Minister stated. 
                        "We are building a foundation for the next generation of Indian innovation."
                      </p>
                      <p>
                        The initiative includes a ₹2 lakh crore investment over five years, targeting rural connectivity, 
                        digital literacy programs, and the establishment of AI research centers across major Indian cities. 
                        Industry leaders have welcomed the announcement, with many viewing it as a catalyst for 
                        unprecedented growth in the technology sector.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Article Multimedia */}
              {article.multimedia && (
                <div className="mt-8 space-y-6">
                  {/* Videos */}
                  {article.multimedia.videos?.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Related Videos</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {article.multimedia.videos.map(video => (
                          <div key={video.id} className="bg-gray-100 rounded-lg p-4">
                            <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                              <span className="text-4xl">▶️</span>
                            </div>
                            <h4 className="font-medium text-gray-900">{video.title}</h4>
                            <p className="text-sm text-gray-500">Duration: {video.duration}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Image Gallery */}
                  {article.multimedia.gallery?.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Photo Gallery</h3>
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
              )}

              {/* Article Tags */}
              {article.tags && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <span className="mr-2">🏷️</span>
                    Tags:
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
            </div>

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
              <WidgetPanel
                widgets={[
                  {
                    id: 'trending-sidebar',
                    type: 'trending',
                    title: 'Trending Now',
                    icon: '📈'
                  }
                ]}
              />

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
