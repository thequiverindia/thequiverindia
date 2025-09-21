'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function ArticleCard({
  article,
  size = 'medium',
  showImage = true,
  showExcerpt = true,
  priority = false,
  variant = 'default'
}) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    small: {
      container: 'p-3',
      image: 'w-20 h-20',
      title: 'text-sm',
      excerpt: 'text-xs'
    },
    medium: {
      container: 'p-4',
      image: 'w-24 h-24 md:w-32 md:h-32',
      title: 'text-base md:text-lg',
      excerpt: 'text-sm md:text-base'
    },
    large: {
      container: 'p-6',
      image: 'w-32 h-32 md:w-40 md:h-40',
      title: 'text-lg md:text-xl',
      excerpt: 'text-base md:text-lg'
    }
  }

  const variantClasses = {
    default: 'bg-white shadow-sm hover:shadow-md',
    featured: 'bg-blue-50 border-l-4 border-blue-500 shadow-md',
    compact: 'bg-gray-50 border border-gray-200'
  }

  const classes = sizeClasses[size]
  const variantClass = variantClasses[variant]

  return (
    <article
      className={`rounded-lg transition-all duration-200 cursor-pointer ${variantClass} ${classes.container}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
    >
      <Link href={`/article/${article.slug}`} className="block group">
        <div className="flex gap-4">
          {showImage && article.image && (
            <div className={`flex-shrink-0 relative overflow-hidden rounded-lg bg-gray-100 ${classes.image}`}>
              <Image
                src={article.image.src}
                alt={article.image.alt}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 160px"
                priority={priority}
                loading={priority ? 'eager' : 'lazy'}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" aria-hidden="true" />
              )}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 leading-tight ${classes.title}`}>
              {article.title}
            </h3>

            {showExcerpt && article.excerpt && (
              <p className={`text-gray-600 mt-2 line-clamp-2 leading-relaxed ${classes.excerpt}`}>
                {article.excerpt}
              </p>
            )}

            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <span className="font-medium">
                {article.author}
              </span>
              <time dateTime={article.published_at} title={new Date(article.published_at).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}>
                {new Date(article.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
            </div>

            {article.category && (
              <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                {article.category}
              </span>
            )}

            {variant === 'featured' && (
              <div className="flex items-center mt-2">
                <svg className="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs text-blue-600 font-medium">Featured</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}
