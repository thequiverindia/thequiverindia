'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '../../components/AdminLayout'
import AdModal from '../../components/AdModal'
import { adsAPI } from '../../lib/api'
import { formatAdminDate, getStatusColor } from '../../lib/utils'
import { useApiCall } from '../../lib/hooks'
import toast from 'react-hot-toast'

export default function AdsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingAd, setEditingAd] = useState(null)

  const { 
    data: adsResponse, 
    loading, 
    error, 
    execute: loadAds 
  } = useApiCall(adsAPI.getAll, [], {
    cacheKey: 'ads-list',
    cacheTime: 60000, // Cache for 1 minute
    immediate: true
  })

  // Process ads data
  const ads = adsResponse?.success ? (adsResponse.data?.ads || adsResponse.data || []) : []

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this advertisement?')) {
      return
    }

    try {
      const response = await adsAPI.delete(id)
      if (response.success) {
        toast.success('Advertisement deleted successfully')
        loadAds()
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete advertisement')
    }
  }

  const handleToggleStatus = async (ad) => {
    try {
      const updatedData = { ...ad, isActive: !ad.isActive }
      const response = await adsAPI.update(ad._id, updatedData)
      
      if (response.success) {
        toast.success(`Advertisement ${ad.isActive ? 'deactivated' : 'activated'}`)
        loadAds()
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update advertisement')
    }
  }

  const getAdTypeColor = (type) => {
    const colors = {
      banner: 'bg-blue-100 text-blue-800',
      sidebar: 'bg-green-100 text-green-800',
      'in-article': 'bg-purple-100 text-purple-800',
      popup: 'bg-orange-100 text-orange-800',
      native: 'bg-gray-100 text-gray-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Advertisements</h1>
            <p className="text-gray-600 mt-1">Manage advertisement campaigns</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            + New Advertisement
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <span className="text-2xl">📢</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Ads</p>
                <p className="text-2xl font-bold text-gray-900">{(ads || []).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(ads || []).filter(ad => ad.isActive).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <span className="text-2xl">👁️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(ads || []).reduce((sum, ad) => sum + (ad.impressions || 0), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100">
                <span className="text-2xl">🖱️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(ads || []).reduce((sum, ad) => sum + (ad.clicks || 0), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ads Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Advertisement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type & Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Placement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(ads || []).map((ad) => (
                  <tr key={ad._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                          {ad.image?.url ? (
                            <img
                              src={ad.image.url}
                              alt={ad.title}
                              className="w-16 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <span className="text-gray-400 text-xs">No Image</span>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {ad.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {ad.advertiser?.name || 'Unknown Advertiser'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAdTypeColor(ad.type)}`}>
                          {ad.type}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {ad.size || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {ad.placement || 'All'}
                      </div>
                      <div className="text-sm text-gray-500">
                        Priority: {ad.priority || 'Normal'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {ad.impressions || 0} views
                      </div>
                      <div className="text-sm text-gray-500">
                        {ad.clicks || 0} clicks ({((ad.clicks || 0) / Math.max(ad.impressions || 1, 1) * 100).toFixed(2)}% CTR)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ad.isActive ? 'published' : 'draft')}`}>
                        {ad.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatAdminDate(ad.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingAd(ad)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleStatus(ad)}
                          className={`${
                            ad.isActive 
                              ? 'text-orange-600 hover:text-orange-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {ad.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDelete(ad._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {(ads || []).length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📢</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No advertisements found</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first advertisement campaign.</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Create Advertisement
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Ad Modal */}
      {(showCreateForm || editingAd) && (
        <AdModal
          ad={editingAd}
          onClose={() => {
            setShowCreateForm(false)
            setEditingAd(null)
          }}
          onSuccess={() => {
            setShowCreateForm(false)
            setEditingAd(null)
            loadAds()
          }}
        />
      )}
    </AdminLayout>
  )
}
