'use client'

import Image from 'next/image'

/**
 * OptimizedImage component
 * 
 * Automatically detects if the image is a base64 data URI and uses a regular <img> tag,
 * otherwise uses Next.js Image component for optimization.
 */
export default function OptimizedImage({ 
  src, 
  alt, 
  fill, 
  className, 
  priority, 
  loading,
  sizes,
  onLoad,
  width,
  height,
  style,
  ...props 
}) {
  // Check if the image is a base64 data URI
  const isBase64 = src?.startsWith('data:image/')

  if (isBase64) {
    // Use regular img tag for base64 images
    if (fill) {
      return (
        <img
          src={src}
          alt={alt || ''}
          className={`object-cover ${className || ''}`}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            inset: 0,
            ...style
          }}
          onLoad={onLoad}
          loading={loading || (priority ? 'eager' : 'lazy')}
          {...props}
        />
      )
    }

    return (
      <img
        src={src}
        alt={alt || ''}
        className={className}
        width={width}
        height={height}
        style={style}
        onLoad={onLoad}
        loading={loading || (priority ? 'eager' : 'lazy')}
        {...props}
      />
    )
  }

  // Use Next.js Image component for HTTP URLs
  return (
    <Image
      src={src}
      alt={alt || ''}
      fill={fill}
      className={className}
      priority={priority}
      loading={loading}
      sizes={sizes}
      onLoad={onLoad}
      width={width}
      height={height}
      style={style}
      {...props}
    />
  )
}


