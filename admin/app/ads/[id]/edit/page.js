'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AdminLayout from '../../../../components/AdminLayout'
import AdEditor from '../../../../components/AdEditor'
import { adsAPI } from '../../../../lib/api'
import toast from 'react-hot-toast'

export default function EditAdPage() {
  const params = useParams()
  const router = useRouter()
  const [ad, setAd] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      loadAd()
    }
  }, [params.id])

  const loadAd = async () => {
    try {
      const response = await adsAPI.getById(params.id)
      if (response.success) {
        setAd(response.data)
      } else {
        toast.error('Advertisement not found')
        router.push('/ads')
      }
    } catch (error) {
      toast.error('Failed to load advertisement')
      router.push('/ads')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (adData) => {
    try {
      const response = await adsAPI.update(params.id, adData)
      if (response.success) {
        toast.success('Advertisement updated successfully')
        router.push('/ads')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update advertisement')
    }
  }

  const handleCancel = () => {
    router.push('/ads')
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

  if (!ad) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📢</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Advertisement not found</h3>
          <p className="text-gray-500">The advertisement you're looking for doesn't exist.</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Advertisement</h1>
            <p className="text-gray-600 mt-1">Update your advertisement settings and content</p>
          </div>
        </div>

        <AdEditor
          ad={ad}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </AdminLayout>
  )
}

