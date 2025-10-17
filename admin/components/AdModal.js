'use client'

import { useState, useEffect } from 'react'
import { AD_TYPES, AD_SIZES } from '../lib/constants'
import toast from 'react-hot-toast'
import { mediaAPI, adsAPI } from '../lib/api'

export default function AdModal({ ad = null, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'banner',
    size: '728x90',
    placement: 'homepage',
    link: '',
    advertiser: {
      name: '',
      email: '',
      phone: ''
    },
    schedule: {
      startDate: '',
      endDate: '',
      timezone: 'UTC'
    },
    targeting: {
      devices: [],
      categories: [],
      regions: []
    },
    priority: 'normal',
    isActive: true,
    ...ad
  })
  const [submitting, setSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(ad?.image?.url || '')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name.startsWith('advertiser.')) {
      const field = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        advertiser: {
          ...prev.advertiser,
          [field]: value
        }
      }))
    } else if (name.startsWith('schedule.')) {
      const field = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          [field]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file format. Only JPEG, PNG, WebP, and GIF images are allowed.')
      e.target.value = ''
      return
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      toast.error(`File size too large. Maximum allowed size is ${(maxSize / 1024 / 1024).toFixed(1)}MB.`)
      e.target.value = ''
      return
    }

    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target.result)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      let finalData = { ...formData }

      // Upload image if provided
      if (imageFile) {
        try {
          const uploadResponse = await mediaAPI.uploadImage(imageFile)
          if (uploadResponse.success) {
            finalData.image = uploadResponse.data
          }
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError)
          toast.error('Failed to upload image')
          return
        }
      }

      let response
      if (ad) {
        response = await adsAPI.update(ad._id, finalData)
      } else {
        response = await adsAPI.create(finalData)
      }

      if (response.success) {
        toast.success(`Advertisement ${ad ? 'updated' : 'created'} successfully`)
        onSuccess()
      }
    } catch (error) {
      toast.error(error.message || `Failed to ${ad ? 'update' : 'create'} advertisement`)
    } finally {
      setSubmitting(false)
    }
  }

  const adTypes = [
    { value: 'banner', label: 'Banner', sizes: ['728x90', '300x250', '320x50'] },
    { value: 'sidebar', label: 'Sidebar', sizes: ['300x250', '300x600', '250x250'] },
    { value: 'in-article', label: 'In-Article', sizes: ['300x250', '336x280', '728x90'] },
    { value: 'popup', label: 'Popup', sizes: ['728x90', '320x50', '468x60'] },
    { value: 'native', label: 'Native', sizes: ['Native', '300x250', '336x280'] }
  ]

  const placements = [
    'homepage',
    'article',
    'category',
    'search',
    'all'
  ]

  const selectedType = adTypes.find(type => type.value === formData.type)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {ad ? 'Edit Advertisement' : 'Create New Advertisement'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Advertisement title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {adTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size *
                  </label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {selectedType?.sizes.map(size => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Placement *
                  </label>
                  <select
                    name="placement"
                    value={formData.placement}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {placements.map(placement => (
                      <option key={placement} value={placement}>
                        {placement.charAt(0).toUpperCase() + placement.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination URL *
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Advertisement Image
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-12 object-cover rounded-lg border"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Advertiser Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Advertiser Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="advertiser.name"
                    value={formData.advertiser.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    name="advertiser.email"
                    value={formData.advertiser.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="contact@company.com"
                  />
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Settings</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                    Active advertisement
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                {submitting ? 'Saving...' : ad ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
