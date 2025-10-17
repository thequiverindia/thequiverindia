'use client'

import { useState } from 'react'
import { mediaAPI } from '../lib/api'
import { AD_TYPES, AD_SIZES } from '../lib/constants'
import toast from 'react-hot-toast'

export default function AdEditor({ ad = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: ad?.title || '',
    type: ad?.type || 'banner',
    size: ad?.size || '728x90',
    placement: ad?.placement || 'homepage',
    link: ad?.link || '',
    image: ad?.image || { url: '', alt: '' },
    advertiser: {
      name: ad?.advertiser?.name || '',
      email: ad?.advertiser?.email || '',
      phone: ad?.advertiser?.phone || ''
    },
    schedule: {
      startDate: ad?.schedule?.startDate || '',
      endDate: ad?.schedule?.endDate || '',
      timezone: ad?.schedule?.timezone || 'UTC'
    },
    targeting: {
      devices: ad?.targeting?.devices || [],
      categories: ad?.targeting?.categories || [],
      regions: ad?.targeting?.regions || []
    },
    priority: ad?.priority || 'normal',
    isActive: ad?.isActive !== undefined ? ad.isActive : true
  })

  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type first
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

    setUploading(true)
    try {
      const response = await mediaAPI.uploadImage(file)
      
      if (response.success) {
        setFormData(prev => ({
          ...prev,
          image: {
            url: response.data.url,
            publicId: response.data.publicId,
            alt: formData.title || 'Advertisement image'
          }
        }))
        toast.success(`Image uploaded successfully! (${response.data.width}x${response.data.height})`)
      } else {
        toast.error(response.message || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      
      // Show specific error messages
      if (error.message.includes('Invalid file format')) {
        toast.error('Invalid file format. Only JPEG, PNG, WebP, and GIF images are allowed.')
      } else if (error.message.includes('File size too large')) {
        toast.error('File size too large. Maximum allowed size is 5MB.')
      } else if (error.message.includes('Upload failed')) {
        toast.error(`Upload failed: ${error.message.replace('Upload failed: ', '')}`)
      } else {
        toast.error(`Failed to upload image: ${error.message}`)
      }
      
      e.target.value = ''
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Submit error:', error)
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {['basic', 'targeting', 'schedule'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Basic Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
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

              {/* Advertisement Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Advertisement Image *
                </label>
                {formData.image.url ? (
                  <div className="relative">
                    <img
                      src={formData.image.url}
                      alt="Advertisement"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: { url: '', alt: '' } }))}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer"
                    >
                      <div className="text-4xl mb-2">🖼️</div>
                      <p className="text-sm text-gray-600">
                        {uploading ? 'Uploading...' : 'Click to upload image'}
                      </p>
                    </label>
                  </div>
                )}
              </div>

              {/* Advertiser Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Advertiser Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="advertiser.phone"
                      value={formData.advertiser.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          )}

          {/* Targeting Tab */}
          {activeTab === 'targeting' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Targeting Options</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Devices
                  </label>
                  <div className="space-y-2">
                    {['desktop', 'mobile', 'tablet'].map(device => (
                      <label key={device} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.targeting.devices.includes(device)}
                          onChange={(e) => {
                            const devices = formData.targeting.devices
                            if (e.target.checked) {
                              setFormData(prev => ({
                                ...prev,
                                targeting: {
                                  ...prev.targeting,
                                  devices: [...devices, device]
                                }
                              }))
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                targeting: {
                                  ...prev.targeting,
                                  devices: devices.filter(d => d !== device)
                                }
                              }))
                            }
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-900 capitalize">{device}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Regions
                  </label>
                  <div className="space-y-2">
                    {['National', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'].map(region => (
                      <label key={region} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.targeting.regions.includes(region)}
                          onChange={(e) => {
                            const regions = formData.targeting.regions
                            if (e.target.checked) {
                              setFormData(prev => ({
                                ...prev,
                                targeting: {
                                  ...prev.targeting,
                                  regions: [...regions, region]
                                }
                              }))
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                targeting: {
                                  ...prev.targeting,
                                  regions: regions.filter(r => r !== region)
                                }
                              }))
                            }
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-900">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Schedule Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="datetime-local"
                    name="schedule.startDate"
                    value={formData.schedule.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    name="schedule.endDate"
                    value={formData.schedule.endDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    name="schedule.timezone"
                    value={formData.schedule.timezone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="UTC">UTC</option>
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>

        <div className="flex items-center space-x-3">
          <button
            type="submit"
            disabled={submitting || uploading || !formData.image.url}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Creating...' : 'Create Advertisement'}
          </button>
        </div>
      </div>
    </form>
  )
}
