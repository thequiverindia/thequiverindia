'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { formatDate } from '../lib/dateUtils'
import OptimizedImage from './OptimizedImage'

export default function HeroCarousel({ articles = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || articles.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % articles.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [articles.length, isAutoPlaying])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % articles.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  if (!articles.length) {
    return (
      <div className="relative h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No featured articles available</p>
      </div>
    )
  }

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg shadow-lg bg-white">
      {/* Main carousel container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {articles.map((article, index) => (
          <div key={article.id} className="relative w-full h-full flex-shrink-0">
            {/* Clickable overlay for entire slide */}
            <Link 
              href={`/article/${article.slug}`}
              className="absolute inset-0 z-20 cursor-pointer group"
              onClick={() => {
                setIsAutoPlaying(false) // Pause auto-play when user clicks
              }}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <OptimizedImage
                  src={article.image?.src || article.image || '/api/placeholder/800/500'}
                  alt={article.image?.alt || article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 group-hover:via-black/30 transition-all duration-300" />
              </div>

              {/* Content overlay */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                <div className="max-w-3xl transform group-hover:translate-y-[-8px] transition-transform duration-300">
                  {/* Category badge */}
                  {article.category && (
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-3 group-hover:bg-blue-500 transition-colors duration-200">
                      {article.category}
                    </span>
                  )}

                  {/* Title */}
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight group-hover:text-blue-100 transition-colors duration-200">
                    {article.title}
                  </h1>

                  {/* Excerpt */}
                  {article.excerpt && (
                    <p className="text-gray-200 text-sm md:text-base mb-4 line-clamp-2 group-hover:text-gray-100 transition-colors duration-200">
                      {article.excerpt}
                    </p>
                  )}

                  {/* Meta info */}
                  <div className="flex items-center space-x-4 text-gray-300 text-sm mb-4 group-hover:text-gray-200 transition-colors duration-200">
                    {article.author && (
                      <span>By {article.author}</span>
                    )}
                    {article.published_at && (
                      <span>{formatDate(article.published_at)}</span>
                    )}
                    {article.reading_time && (
                      <span>{article.reading_time} min read</span>
                    )}
                  </div>

                  {/* Read more indicator */}
                  <div className="inline-flex items-center mt-2 px-6 py-2 bg-white/90 backdrop-blur-sm text-black hover:bg-white transition-all duration-200 rounded-full font-medium group-hover:scale-105 group-hover:shadow-lg">
                    <span>Read Full Article</span>
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {articles.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 hover:bg-white/40 transition-all duration-200 rounded-full backdrop-blur-sm hover:scale-110 shadow-lg"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 hover:bg-white/40 transition-all duration-200 rounded-full backdrop-blur-sm hover:scale-110 shadow-lg"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Slide indicators */}
      {articles.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                goToSlide(index)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-200 hover:scale-125 ${
                index === currentSlide
                  ? 'bg-white scale-110 shadow-md'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-play indicator */}
      {articles.length > 1 && (
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsAutoPlaying(!isAutoPlaying)
            }}
            className="p-2 bg-white/20 hover:bg-white/40 transition-all duration-200 rounded-full backdrop-blur-sm hover:scale-110 shadow-lg"
            aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isAutoPlaying ? (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
