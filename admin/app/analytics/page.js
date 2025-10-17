'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { analyticsAPI } from '../../lib/api'
import { formatNumber, formatAdminDate } from '../../lib/utils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import toast from 'react-hot-toast'

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null)
  const [articleAnalytics, setArticleAnalytics] = useState([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('views')

  useEffect(() => {
    loadAnalytics()
    loadArticleAnalytics()
  }, [dateRange])

  const loadAnalytics = async () => {
    try {
      const response = await analyticsAPI.getDashboard()
      if (response.success) {
        setAnalytics(response.data)
      }
    } catch (error) {
      // Use mock data for demo
      setAnalytics({
        totalArticles: 156,
        totalViews: 45230,
        totalUsers: 1234,
        totalShares: 8932,
        articlesByCategory: [
          { name: 'Technology', count: 45, percentage: 28.8 },
          { name: 'Sports', count: 38, percentage: 24.4 },
          { name: 'Politics', count: 32, percentage: 20.5 },
          { name: 'Business', count: 25, percentage: 16.0 },
          { name: 'Entertainment', count: 16, percentage: 10.3 }
        ],
        dailyStats: [
          { date: '2024-01-01', views: 1200, articles: 5, users: 45 },
          { date: '2024-01-02', views: 1800, articles: 8, users: 67 },
          { date: '2024-01-03', views: 2200, articles: 12, users: 89 },
          { date: '2024-01-04', views: 1900, articles: 7, users: 78 },
          { date: '2024-01-05', views: 2500, articles: 15, users: 112 },
          { date: '2024-01-06', views: 2800, articles: 18, users: 134 },
          { date: '2024-01-07', views: 3200, articles: 22, users: 156 }
        ],
        topArticles: [
          { title: 'Latest Tech Breakthrough', views: 12500, shares: 340, likes: 890 },
          { title: 'Sports Championship Results', views: 9800, shares: 280, likes: 650 },
          { title: 'Political Update', views: 8700, shares: 420, likes: 720 },
          { title: 'Business Market Analysis', views: 7600, shares: 190, likes: 580 },
          { title: 'Entertainment News', views: 6800, shares: 150, likes: 490 }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  const loadArticleAnalytics = async () => {
    try {
      const response = await analyticsAPI.getArticleAnalytics({ dateRange })
      if (response.success) {
        // The API now returns { articles: [...], summary: {...} }
        setArticleAnalytics(response.data.articles || [])
      }
    } catch (error) {
      // Use mock data for demo
      setArticleAnalytics([
        { title: 'Latest Tech Breakthrough', views: 12500, shares: 340, likes: 890, date: '2024-01-07' },
        { title: 'Sports Championship Results', views: 9800, shares: 280, likes: 650, date: '2024-01-06' },
        { title: 'Political Update', views: 8700, shares: 420, likes: 720, date: '2024-01-05' },
        { title: 'Business Market Analysis', views: 7600, shares: 190, likes: 580, date: '2024-01-04' },
        { title: 'Entertainment News', views: 6800, shares: 150, likes: 490, date: '2024-01-03' }
      ])
    }
  }

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

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
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">Track your content performance and user engagement</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <span className="text-2xl">📰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Articles</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics?.totalArticles || 0)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <span className="text-2xl">👁️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics?.totalViews || 0)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics?.totalUsers || 0)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100">
                <span className="text-2xl">📤</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Shares</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics?.totalShares || 0)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Views Trend */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Views Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics?.dailyStats || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="views" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Articles by Category */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Articles by Category</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics?.articlesByCategory || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {(analytics?.articlesByCategory || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Engagement Metrics */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Engagement Metrics</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics?.dailyStats || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#10b981" name="New Users" />
                  <Bar dataKey="articles" fill="#3b82f6" name="Articles Published" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Performing Articles */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Top Performing Articles</h3>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="views">Views</option>
                <option value="shares">Shares</option>
                <option value="likes">Likes</option>
              </select>
            </div>
            <div className="space-y-4">
              {(analytics?.topArticles || []).map((article, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {article.title}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">
                        {formatNumber(article.views)} views
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatNumber(article.shares)} shares
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatNumber(article.likes)} likes
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">
                      {formatNumber(article[selectedMetric])}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Article Analytics Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Article Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Article
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shares
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Likes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Published
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(articleAnalytics || []).map((article, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {article.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {article.author || 'Unknown'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {article.category || 'Uncategorized'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatNumber(article.views)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatNumber(article.shares)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatNumber(article.likes)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatAdminDate(article.publishedAt || article.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
