'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { usersAPI } from '../../lib/api'
import { formatAdminDate, getRoleColor } from '../../lib/utils'
import { usePaginatedApiCall } from '../../lib/hooks'
import toast from 'react-hot-toast'

export default function UsersPage() {
  const [roleFilter, setRoleFilter] = useState('')
  const [editingUser, setEditingUser] = useState(null)
  const [viewingHistory, setViewingHistory] = useState(null)

  const {
    data: usersResponse,
    pagination,
    loading,
    error,
    goToPage,
    refresh
  } = usePaginatedApiCall(usersAPI.getAll, 1, 20)

  // Extract users array from response
  const users = usersResponse?.users || []

  // Apply filters when they change
  useEffect(() => {
    if (roleFilter) {
      refresh()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleFilter])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return
    }

    try {
      const response = await usersAPI.delete(id)
      if (response.success) {
        toast.success('User deleted successfully')
        refresh()
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete user')
    }
  }

  const handleToggleStatus = async (user) => {
    try {
      const updatedData = { ...user, isActive: !user.isActive }
      const response = await usersAPI.update(user._id, updatedData)
      
      if (response.success) {
        toast.success(`User ${user.isActive ? 'deactivated' : 'activated'}`)
        refresh()
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update user')
    }
  }

  const handleRoleChange = async (user, newRole) => {
    try {
      const updatedData = { ...user, role: newRole }
      const response = await usersAPI.update(user._id, updatedData)
      
      if (response.success) {
        toast.success(`User role updated to ${newRole}`)
        refresh()
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update user role')
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
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-600 mt-1">Manage platform users and their roles</p>
          </div>
          <button
            onClick={() => setEditingUser('new')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Create User</span>
          </button>
        </div>

        {/* Filters and Stats */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Role
                </label>
                <select
                  value={roleFilter}
                  onChange={(e) => {
                    setRoleFilter(e.target.value)
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Roles</option>
                  <option value="user">User</option>
                  <option value="author">Author</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                  {users.filter(u => u.role === 'user').length} Platform Users
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                  {users.filter(u => ['admin', 'editor', 'author'].includes(u.role)).length} Staff
                </span>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p>👥 Showing all {users.length} users (Platform signups + Admin created)</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role / Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium hidden">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user, e.target.value)}
                          className={`text-xs font-semibold px-2 py-1 rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${getRoleColor(user.role)}`}
                        >
                          <option value="user">User</option>
                          <option value="author">Author</option>
                          <option value="editor">Editor</option>
                          <option value="admin">Admin</option>
                        </select>
                        {user.role === 'user' && (
                          <div className="text-xs text-gray-500 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            Platform User
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatAdminDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin ? formatAdminDate(user.lastLogin) : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setViewingHistory(user)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View login history"
                        >
                          History
                        </button>
                        <button
                          onClick={() => setEditingUser(user)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user)}
                          className={`${
                            user.isActive 
                              ? 'text-orange-600 hover:text-orange-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {user.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={user.role === 'admin'}
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

          {users.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500">No users match your current filters.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => goToPage(pagination.page - 1)}
              disabled={!pagination.hasPrev}
              className={`px-4 py-2 rounded-lg ${
                !pagination.hasPrev
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm text-gray-700">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => goToPage(pagination.page + 1)}
              disabled={!pagination.hasNext}
              className={`px-4 py-2 rounded-lg ${
                !pagination.hasNext
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <UserEditModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSuccess={() => {
            setEditingUser(null)
            refresh()
          }}
        />
      )}

      {/* Login History Modal */}
      {viewingHistory && (
        <UserLoginHistoryModal
          user={viewingHistory}
          onClose={() => setViewingHistory(null)}
        />
      )}
    </AdminLayout>
  )
}

function UserEditModal({ user, onClose, onSuccess }) {
  const isCreating = user === 'new'
  
  const [formData, setFormData] = useState({
    name: isCreating ? '' : user.name,
    email: isCreating ? '' : user.email,
    password: isCreating ? '' : '',
    confirmPassword: isCreating ? '' : '',
    bio: isCreating ? '' : (user.bio || ''),
    role: isCreating ? 'user' : user.role,
    isActive: isCreating ? true : user.isActive,
    socialLinks: {
      twitter: isCreating ? '' : (user.socialLinks?.twitter || ''),
      linkedin: isCreating ? '' : (user.socialLinks?.linkedin || ''),
      facebook: isCreating ? '' : (user.socialLinks?.facebook || ''),
      instagram: isCreating ? '' : (user.socialLinks?.instagram || '')
    }
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name.startsWith('socialLinks.')) {
      const socialField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      let response
      if (isCreating) {
        // Validate password fields for new users
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match')
          setSubmitting(false)
          return
        }
        if (formData.password.length < 6) {
          toast.error('Password must be at least 6 characters long')
          setSubmitting(false)
          return
        }
        
        // Remove confirmPassword from data
        const { confirmPassword, ...userData } = formData
        response = await usersAPI.create(userData)
        
        if (response.success) {
          toast.success('User created successfully')
        }
      } else {
        // For editing, don't send password if empty
        const { password, confirmPassword, ...userData } = formData
        if (password && password.length > 0) {
          if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            setSubmitting(false)
            return
          }
          if (password.length < 6) {
            toast.error('Password must be at least 6 characters long')
            setSubmitting(false)
            return
          }
          userData.password = password
        }
        
        response = await usersAPI.update(user._id, userData)
        
        if (response.success) {
          toast.success('User updated successfully')
        }
      }
      
      if (response.success) {
        onSuccess()
      }
    } catch (error) {
      toast.error(error.message || `Failed to ${isCreating ? 'create' : 'update'} user`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {isCreating ? 'Create New User' : 'Edit User'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required={isCreating}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Password fields - only for creating new users or when updating password */}
            {isCreating && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </>
            )}

            {/* Optional password change for existing users */}
            {!isCreating && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password (optional)
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Leave blank to keep current password"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave blank to keep current password</p>
                </div>

                {formData.password && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="user">User</option>
                <option value="author">Author</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
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
                Active user
              </label>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
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
                {submitting 
                  ? (isCreating ? 'Creating...' : 'Updating...') 
                  : (isCreating ? 'Create User' : 'Update User')
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function UserLoginHistoryModal({ user, onClose }) {
  const [historyData, setHistoryData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLoginHistory()
  }, [])

  const fetchLoginHistory = async () => {
    try {
      setLoading(true)
      const response = await usersAPI.getLoginHistory(user._id)
      if (response.success) {
        setHistoryData(response.data)
      }
    } catch (error) {
      toast.error('Failed to load login history')
    } finally {
      setLoading(false)
    }
  }

  const handleRevokeSession = async (sessionIndex) => {
    if (!window.confirm('Are you sure you want to revoke this session?')) {
      return
    }

    try {
      const response = await usersAPI.revokeSession(user._id, sessionIndex)
      if (response.success) {
        toast.success('Session revoked successfully')
        fetchLoginHistory()
      }
    } catch (error) {
      toast.error(error.message || 'Failed to revoke session')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Login History</h2>
              <p className="text-sm text-gray-500 mt-1">
                {user.name} ({user.email})
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Last Login Info */}
              {historyData?.user?.lastLogin && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-900 mb-1">Last Login</h3>
                  <p className="text-sm text-blue-700">
                    {formatAdminDate(historyData.user.lastLogin)}
                  </p>
                </div>
              )}

              {/* Active Sessions */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Active Sessions</h3>
                {historyData?.sessions && historyData.sessions.length > 0 ? (
                  <div className="space-y-3">
                    {historyData.sessions.map((session, index) => (
                      <div
                        key={index}
                        className={`border rounded-lg p-4 ${
                          session.isActive
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  session.isActive
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {session.isActive ? 'Active' : 'Revoked'}
                              </span>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center text-gray-600">
                                <span className="font-medium w-24">Created:</span>
                                <span>{formatAdminDate(session.createdAt)}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <span className="font-medium w-24">Expires:</span>
                                <span>{formatAdminDate(session.expiresAt)}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <span className="font-medium w-24">IP Address:</span>
                                <span className="font-mono text-xs">{session.ipAddress || 'N/A'}</span>
                              </div>
                              {session.userAgent && (
                                <div className="flex items-start text-gray-600">
                                  <span className="font-medium w-24">Device:</span>
                                  <span className="text-xs break-all">{session.userAgent}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {session.isActive && (
                            <button
                              onClick={() => handleRevokeSession(index)}
                              className="ml-4 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No active sessions</p>
                )}
              </div>

              {/* Login History */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Login History</h3>
                {historyData?.loginHistory && historyData.loginHistory.length > 0 ? (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="max-h-96 overflow-y-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Time
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              IP Address
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Device
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {historyData.loginHistory.map((login, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {formatAdminDate(login.loginTime)}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm">
                                <span
                                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    login.success
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {login.success ? 'Success' : 'Failed'}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 font-mono">
                                {login.ipAddress || 'N/A'}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                                {login.userAgent || 'N/A'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No login history available</p>
                )}
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-4 border-t">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
