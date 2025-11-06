'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '../../components/AdminLayout'
import { analyticsAPI } from '../../lib/api'
import { formatNumber, formatAdminDate } from '../../lib/utils'
import { useApiCall } from '../../lib/hooks'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export default function Dashboard() {
  const { 
    data: analyticsResponse, 
    loading, 
    error 
  } = useApiCall(analyticsAPI.getDashboard, [], {
    cacheKey: 'dashboard-analytics',
    cacheTime: 60000, // Cache for 1 minute
    immediate: true
  })

  // Process analytics data
  const analytics = analyticsResponse?.success ? analyticsResponse.data : {
    overview: {
      totalArticles: 0,
      publishedArticles: 0,
      totalViews: 0,
      totalUsers: 0,
      totalAds: 0
    },
    recentArticles: [],
    topAuthors: [],
    categoryStats: []
  }

  // Show loading while fetching data
  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  const stats = analytics?.overview || {}

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your news platform.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Articles"
            value={stats.totalArticles || 0}
            icon="📰"
            color="blue"
            subtitle={`${stats.publishedArticles || 0} published, ${stats.draftArticles || 0} drafts`}
          />
          <StatCard
            title="Total Views"
            value={formatNumber(stats.totalViews || 0)}
            icon="👁️"
            color="green"
            subtitle={`${formatNumber(stats.totalShares || 0)} shares`}
          />
          <StatCard
            title="Total Users"
            value={stats.totalUsers || 0}
            icon="👥"
            color="purple"
            subtitle={`${stats.activeUsers || 0} active, ${stats.inactiveUsers || 0} inactive`}
          />
          <StatCard
            title="Active Ads"
            value={stats.activeAds || 0}
            icon="📢"
            color="orange"
            subtitle={`${stats.totalCategories || 0} categories`}
          />
        </div>

        {/* User Statistics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">New Users (30 days)</h3>
              <span className="text-2xl">👤</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.recentUsers || 0}</div>
            <p className="text-sm text-gray-500 mt-1">Recently joined</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Active Users (7 days)</h3>
              <span className="text-2xl">🟢</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.activeInLast7Days || 0}</div>
            <p className="text-sm text-gray-500 mt-1">Logged in recently</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">User Distribution</h3>
              <span className="text-2xl">📊</span>
            </div>
            <div className="space-y-1 mt-2">
              {analytics?.usersByRole && Object.keys(analytics.usersByRole).length > 0 ? (
                Object.entries(analytics.usersByRole).map(([role, count]) => (
                  <div key={role} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 capitalize">{role}:</span>
                    <span className="font-semibold text-gray-900">{count}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No data</p>
              )}
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Articles by Category */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Articles by Category</h3>
            {analytics?.articlesByCategory && analytics.articlesByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.articlesByCategory}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={(entry) => `${entry.name}: ${entry.count}`}
                  >
                    {analytics.articlesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity (30 Days)</h3>
            {analytics?.recentActivity && analytics.recentActivity.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.recentActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </div>
        </div>

        {/* Recent Articles and Top Authors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Articles */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Articles</h3>
            <div className="space-y-3">
              {analytics?.recentArticles && analytics.recentArticles.length > 0 ? (
                analytics.recentArticles.map((article) => (
                  <div key={article._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex-1 min-w-0">
                      <Link href={`/articles/edit/${article._id}`} className="font-medium text-gray-900 hover:text-blue-600 truncate block">
                        {article.title}
                      </Link>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded ${
                          article.status === 'published' ? 'bg-green-100 text-green-800' :
                          article.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {article.status}
                        </span>
                        <span className="text-xs text-gray-500">{formatNumber(article.views)} views</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No articles yet</p>
              )}
            </div>
          </div>

          {/* Top Authors */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Top Authors</h3>
            <div className="space-y-3">
              {analytics?.topAuthors && analytics.topAuthors.length > 0 ? (
                analytics.topAuthors.map((author, index) => (
                  <div key={author._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{author.name}</div>
                        <div className="text-xs text-gray-500">{author.email}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{author.articleCount} articles</div>
                      <div className="text-xs text-gray-500">{formatNumber(author.totalViews)} views</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickActionButton
              href="/articles/create"
              icon="✍️"
              label="New Article"
              color="blue"
            />
            <QuickActionButton
              href="/categories"
              icon="📂"
              label="Manage Categories"
              color="green"
            />
            <QuickActionButton
              href="/ads/create"
              icon="📢"
              label="New Advertisement"
              color="orange"
            />
            <QuickActionButton
              href="/users"
              icon="👥"
              label="Manage Users"
              color="purple"
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

function StatCard({ title, value, icon, color, subtitle }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  )
}

function QuickActionButton({ href, icon, label, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 hover:bg-blue-100 text-blue-700',
    green: 'bg-green-50 hover:bg-green-100 text-green-700',
    orange: 'bg-orange-50 hover:bg-orange-100 text-orange-700',
    purple: 'bg-purple-50 hover:bg-purple-100 text-purple-700'
  }

  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 border-dashed transition-all ${colorClasses[color]}`}
    >
      <span className="text-3xl mb-2">{icon}</span>
      <span className="text-sm font-medium text-center">{label}</span>
    </Link>
  )
}
