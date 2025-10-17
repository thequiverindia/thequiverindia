'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '../../../components/AdminLayout'
import ArticleEditor from '../../../components/ArticleEditor'
import { articlesAPI, categoriesAPI } from '../../../lib/api'
import toast from 'react-hot-toast'

export default function CreateArticle() {
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const response = await categoriesAPI.getAll()
      if (response.success) {
        setCategories(response.data)
      }
    } catch (error) {
      toast.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (articleData) => {
    try {
      const response = await articlesAPI.create(articleData)
      
      if (response.success) {
        toast.success('Article created successfully!')
        router.push('/articles')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to create article')
      throw error
    }
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Article</h1>
          <p className="text-gray-600 mt-1">Write and publish your news article</p>
        </div>

        <ArticleEditor
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={() => router.push('/articles')}
        />
      </div>
    </AdminLayout>
  )
}

