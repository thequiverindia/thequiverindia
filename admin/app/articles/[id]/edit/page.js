'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AdminLayout from '../../../../components/AdminLayout'
import ArticleEditor from '../../../../components/ArticleEditor'
import { articlesAPI, categoriesAPI } from '../../../../lib/api'
import toast from 'react-hot-toast'

export default function EditArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      loadArticle()
      loadCategories()
    }
  }, [params.id])

  const loadArticle = async () => {
    try {
      const response = await articlesAPI.getById(params.id)
      if (response.success) {
        setArticle(response.data)
      } else {
        toast.error('Article not found')
        router.push('/articles')
      }
    } catch (error) {
      toast.error('Failed to load article')
      router.push('/articles')
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const response = await categoriesAPI.getAll()
      if (response.success) {
        setCategories(response.data)
      }
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const handleSubmit = async (articleData) => {
    try {
      const response = await articlesAPI.update(params.id, articleData)
      if (response.success) {
        toast.success('Article updated successfully')
        router.push('/articles')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update article')
    }
  }

  const handleCancel = () => {
    router.push('/articles')
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

  if (!article) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📰</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Article not found</h3>
          <p className="text-gray-500">The article you're looking for doesn't exist.</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Edit Article</h1>
            <p className="text-gray-600 mt-1">Update your article content and settings</p>
          </div>
        </div>

        {/* Article Editor */}
        <ArticleEditor
          article={article}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </AdminLayout>
  )
}
