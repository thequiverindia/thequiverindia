'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function BreakingTicker({
  newsItems = [],
  scrollSpeed = 50,
  pauseOnHover = true,
  showTimestamp = true
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (newsItems.length <= 1 || isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length)
    }, scrollSpeed * 100)

    return () => clearInterval(interval)
  }, [newsItems.length, scrollSpeed, isPaused])

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true)
  }

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false)
  }

  if (!newsItems.length) {
    return null
  }

  const currentItem = newsItems[currentIndex]

  return (
    <div
      className="bg-red-50 border-l-4 border-red-500 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Breaking news ticker"
    >
      <div className="px-4 py-3">
        <div className="flex items-center">
          {/* Breaking Label */}
          <div className="flex items-center mr-3 flex-shrink-0">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700 font-bold text-sm uppercase tracking-wide">
              Breaking
            </span>
          </div>

          {/* News Content */}
          <div className="flex-1 min-w-0">
            {currentItem && (
              <Link
                href={currentItem.url || `/article/${currentItem.slug}`}
                className="block hover:text-red-800 transition-colors"
              >
                <p className="text-gray-900 font-medium text-sm line-clamp-1">
                  {currentItem.headline}
                </p>
              </Link>
            )}
          </div>

          {/* Timestamp */}
          {showTimestamp && currentItem && (
            <div className="flex-shrink-0 ml-3">
              <time
                className="text-xs text-gray-500"
                dateTime={currentItem.published_at}
              >
                {new Date(currentItem.published_at).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </time>
            </div>
          )}

          {/* Navigation Dots */}
          {newsItems.length > 1 && (
            <div className="flex items-center ml-4 space-x-1">
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-red-500' : 'bg-red-300'
                  }`}
                  aria-label={`Show breaking news item ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Accessibility: Screen reader only content for rotation */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Breaking news: {currentItem?.headline}
      </div>
    </div>
  )
}
