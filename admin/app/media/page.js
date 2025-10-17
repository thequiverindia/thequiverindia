'use client'

import { useState, useEffect, useRef } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { mediaAPI } from '../../lib/api'
import { formatAdminDate } from '../../lib/utils'
import { useApiCall } from '../../lib/hooks'
import toast from 'react-hot-toast'

export default function MediaPage() {
  const [uploading, setUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const fileInputRef = useRef(null)

  const { 
    data: mediaResponse, 
    loading, 
    error, 
    execute: loadMedia 
  } = useApiCall(async () => {
    // For now, we'll simulate loading media
    // In a real implementation, you'd fetch from the backend
    const mockMedia = [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400',
        filename: 'tech-news.jpg',
        size: 245760,
        type: 'image/jpeg',
        uploadedAt: new Date().toISOString(),
        alt: 'Technology news image'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
        filename: 'business-chart.jpg',
        size: 189440,
        type: 'image/jpeg',
        uploadedAt: new Date(Date.now() - 86400000).toISOString(),
        alt: 'Business chart'
      }
    ]
    return { success: true, data: mockMedia }
  }, [], {
    cacheKey: 'media-list',
    cacheTime: 60000 // Cache for 1 minute
  })

  // Process media data
  const media = mediaResponse?.success ? mediaResponse.data : []

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles(files)
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select files to upload')
      return
    }

    setUploading(true)
    try {
      for (const file of selectedFiles) {
        const formData = new FormData()
        formData.append('image', file)
        
        // Simulate upload - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Add to media list
        const newMedia = {
          id: Date.now().toString(),
          url: URL.createObjectURL(file),
          filename: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString(),
          alt: file.name.split('.')[0]
        }
        setMedia(prev => [newMedia, ...prev])
      }
      
      toast.success(`${selectedFiles.length} file(s) uploaded successfully`)
      setSelectedFiles([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      toast.error('Failed to upload files')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this media file?')) {
      return
    }

    try {
      // Simulate deletion - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setMedia(prev => prev.filter(item => item.id !== id))
      toast.success('Media file deleted successfully')
    } catch (error) {
      toast.error('Failed to delete media file')
    }
  }

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url)
    toast.success('URL copied to clipboard')
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const filteredMedia = media.filter(item =>
    item.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.alt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
            <p className="text-gray-600 mt-1">Manage your media files and images</p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Upload New Files</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className={`px-3 py-2 rounded-lg border transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                className={`px-3 py-2 rounded-lg border transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                List
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Choose Files
            </button>
            {selectedFiles.length > 0 && (
              <>
                <span className="text-sm text-gray-600">
                  {selectedFiles.length} file(s) selected
                </span>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Upload Files'}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <input
            type="text"
            placeholder="Search media files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Media Grid/List */}
        {filteredMedia.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🖼️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No files found' : 'No media files'}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'Upload your first media file to get started.'}
            </p>
          </div>
        ) : (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
              : 'space-y-4'
          }`}>
            {filteredMedia.map((item) => (
              <MediaItem
                key={item.id}
                item={item}
                viewMode={viewMode}
                onDelete={handleDelete}
                onCopy={copyToClipboard}
                formatFileSize={formatFileSize}
              />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

function MediaItem({ item, viewMode, onDelete, onCopy, formatFileSize }) {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center space-x-4 hover:shadow-md transition-shadow">
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
          <img
            src={item.url}
            alt={item.alt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {item.filename}
          </p>
          <p className="text-sm text-gray-500">
            {formatFileSize(item.size)} • {formatAdminDate(item.uploadedAt)}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onCopy(item.url)}
            className="text-blue-600 hover:text-blue-900 text-sm"
          >
            Copy URL
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="text-red-600 hover:text-red-900 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow group">
      <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-3">
        <img
          src={item.url}
          alt={item.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-900 truncate" title={item.filename}>
          {item.filename}
        </p>
        <p className="text-xs text-gray-500">
          {formatFileSize(item.size)}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">
            {formatAdminDate(item.uploadedAt)}
          </p>
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onCopy(item.url)}
              className="p-1 text-blue-600 hover:text-blue-900"
              title="Copy URL"
            >
              📋
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-1 text-red-600 hover:text-red-900"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
