'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '../../../components/AdminLayout'
import AdEditor from '../../../components/AdEditor'
import { adsAPI } from '../../../lib/api'
import toast from 'react-hot-toast'

export default function CreateAd() {
  const router = useRouter()

  const handleSubmit = async (adData) => {
    try {
      const response = await adsAPI.create(adData)
      
      if (response.success) {
        toast.success('Advertisement created successfully!')
        router.push('/ads')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to create advertisement')
      throw error
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Advertisement</h1>
          <p className="text-gray-600 mt-1">Create and configure a new advertisement campaign</p>
        </div>

        <AdEditor
          onSubmit={handleSubmit}
          onCancel={() => router.push('/ads')}
        />
      </div>
    </AdminLayout>
  )
}

