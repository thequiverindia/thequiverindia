'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { authAPI } from '../../lib/api'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    site: {
      name: 'The Quiver',
      tagline: 'India\'s Digital News',
      description: 'Your trusted source for the latest news and updates',
      logo: '',
      favicon: '',
      timezone: 'Asia/Kolkata',
      language: 'en',
      currency: 'INR'
    },
    email: {
      smtpHost: '',
      smtpPort: 587,
      smtpUser: '',
      smtpPass: '',
      fromEmail: 'noreply@thequiver.com',
      fromName: 'The Quiver'
    },
    social: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      youtube: '',
      whatsapp: ''
    },
    seo: {
      metaTitle: 'The Quiver - India\'s Digital News',
      metaDescription: 'Get the latest news, updates, and insights from India and around the world.',
      metaKeywords: 'news, india, politics, sports, technology, business',
      ogImage: '',
      twitterHandle: '@thequiver'
    },
    security: {
      sessionTimeout: 24,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
      requireTwoFactor: false,
      allowRegistration: true
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      newUserNotification: true,
      newArticleNotification: true,
      systemMaintenanceNotification: true
    }
  })
  const [loading, setLoading] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: ''
  })

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    try {
      // First try to get user from localStorage (faster and more reliable)
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          setUserProfile(userData)
          console.log('Settings: Loaded user profile from localStorage')
        } catch (parseError) {
          console.error('Error parsing stored user data:', parseError)
        }
      }

      // Skip API call to prevent logout issues - just use cached data
      console.log('Settings: Using cached user data to prevent auth issues')
    } catch (error) {
      console.error('Error loading user profile:', error)
      // Don't logout user, just continue with default profile
    }
  }

  const handleSettingChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleSaveSettings = async (section) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success(`${section} settings saved successfully`)
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setLoading(false)
    }
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'email', label: 'Email', icon: '📧' },
    { id: 'social', label: 'Social Media', icon: '📱' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' }
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your platform configuration and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {activeTab === 'general' && (
                <GeneralSettings 
                  settings={settings} 
                  onChange={handleSettingChange}
                  onSave={() => handleSaveSettings('General')}
                  loading={loading}
                />
              )}
              
              {activeTab === 'profile' && (
                <ProfileSettings 
                  profile={userProfile}
                  setProfile={setUserProfile}
                  onSave={handleProfileUpdate}
                  loading={loading}
                />
              )}
              
              {activeTab === 'email' && (
                <EmailSettings 
                  settings={settings} 
                  onChange={handleSettingChange}
                  onSave={() => handleSaveSettings('Email')}
                  loading={loading}
                />
              )}
              
              {activeTab === 'social' && (
                <SocialSettings 
                  settings={settings} 
                  onChange={handleSettingChange}
                  onSave={() => handleSaveSettings('Social Media')}
                  loading={loading}
                />
              )}
              
              {activeTab === 'seo' && (
                <SEOSettings 
                  settings={settings} 
                  onChange={handleSettingChange}
                  onSave={() => handleSaveSettings('SEO')}
                  loading={loading}
                />
              )}
              
              {activeTab === 'security' && (
                <SecuritySettings 
                  settings={settings} 
                  onChange={handleSettingChange}
                  onSave={() => handleSaveSettings('Security')}
                  loading={loading}
                />
              )}
              
              {activeTab === 'notifications' && (
                <NotificationSettings 
                  settings={settings} 
                  onChange={handleSettingChange}
                  onSave={() => handleSaveSettings('Notifications')}
                  loading={loading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

function GeneralSettings({ settings, onChange, onSave, loading }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">General Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Name
          </label>
          <input
            type="text"
            value={settings.site.name}
            onChange={(e) => onChange('site', 'name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Tagline
          </label>
          <input
            type="text"
            value={settings.site.tagline}
            onChange={(e) => onChange('site', 'tagline', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Description
          </label>
          <textarea
            value={settings.site.description}
            onChange={(e) => onChange('site', 'description', e.target.value)}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select
            value={settings.site.timezone}
            onChange={(e) => onChange('site', 'timezone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Asia/Kolkata">Asia/Kolkata</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Europe/London">Europe/London</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={settings.site.language}
            onChange={(e) => onChange('site', 'language', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
            <option value="ta">Tamil</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save General Settings'}
        </button>
      </div>
    </div>
  )
}

function ProfileSettings({ profile, setProfile, onSave, loading }) {
  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>
      
      <form onSubmit={onSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  )
}

function EmailSettings({ settings, onChange, onSave, loading }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Email Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Host
          </label>
          <input
            type="text"
            value={settings.email.smtpHost}
            onChange={(e) => onChange('email', 'smtpHost', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="smtp.gmail.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Port
          </label>
          <input
            type="number"
            value={settings.email.smtpPort}
            onChange={(e) => onChange('email', 'smtpPort', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Username
          </label>
          <input
            type="text"
            value={settings.email.smtpUser}
            onChange={(e) => onChange('email', 'smtpUser', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Password
          </label>
          <input
            type="password"
            value={settings.email.smtpPass}
            onChange={(e) => onChange('email', 'smtpPass', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Email
          </label>
          <input
            type="email"
            value={settings.email.fromEmail}
            onChange={(e) => onChange('email', 'fromEmail', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Name
          </label>
          <input
            type="text"
            value={settings.email.fromName}
            onChange={(e) => onChange('email', 'fromName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Email Settings'}
        </button>
      </div>
    </div>
  )
}

function SocialSettings({ settings, onChange, onSave, loading }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Social Media Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Facebook URL
          </label>
          <input
            type="url"
            value={settings.social.facebook}
            onChange={(e) => onChange('social', 'facebook', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://facebook.com/thequiver"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Twitter URL
          </label>
          <input
            type="url"
            value={settings.social.twitter}
            onChange={(e) => onChange('social', 'twitter', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://twitter.com/thequiver"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instagram URL
          </label>
          <input
            type="url"
            value={settings.social.instagram}
            onChange={(e) => onChange('social', 'instagram', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://instagram.com/thequiver"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn URL
          </label>
          <input
            type="url"
            value={settings.social.linkedin}
            onChange={(e) => onChange('social', 'linkedin', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://linkedin.com/company/thequiver"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            YouTube URL
          </label>
          <input
            type="url"
            value={settings.social.youtube}
            onChange={(e) => onChange('social', 'youtube', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://youtube.com/c/thequiver"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            WhatsApp Number
          </label>
          <input
            type="tel"
            value={settings.social.whatsapp}
            onChange={(e) => onChange('social', 'whatsapp', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+91 9876543210"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Social Settings'}
        </button>
      </div>
    </div>
  )
}

function SEOSettings({ settings, onChange, onSave, loading }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">SEO Settings</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meta Title
          </label>
          <input
            type="text"
            value={settings.seo.metaTitle}
            onChange={(e) => onChange('seo', 'metaTitle', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meta Description
          </label>
          <textarea
            value={settings.seo.metaDescription}
            onChange={(e) => onChange('seo', 'metaDescription', e.target.value)}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meta Keywords
          </label>
          <input
            type="text"
            value={settings.seo.metaKeywords}
            onChange={(e) => onChange('seo', 'metaKeywords', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="news, india, politics, sports, technology"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Twitter Handle
          </label>
          <input
            type="text"
            value={settings.seo.twitterHandle}
            onChange={(e) => onChange('seo', 'twitterHandle', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="@thequiver"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save SEO Settings'}
        </button>
      </div>
    </div>
  )
}

function SecuritySettings({ settings, onChange, onSave, loading }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Timeout (hours)
          </label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => onChange('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Login Attempts
          </label>
          <input
            type="number"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => onChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Password Length
          </label>
          <input
            type="number"
            value={settings.security.passwordMinLength}
            onChange={(e) => onChange('security', 'passwordMinLength', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="requireTwoFactor"
            checked={settings.security.requireTwoFactor}
            onChange={(e) => onChange('security', 'requireTwoFactor', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="requireTwoFactor" className="ml-2 block text-sm text-gray-900">
            Require Two-Factor Authentication
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="allowRegistration"
            checked={settings.security.allowRegistration}
            onChange={(e) => onChange('security', 'allowRegistration', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="allowRegistration" className="ml-2 block text-sm text-gray-900">
            Allow User Registration
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Security Settings'}
        </button>
      </div>
    </div>
  )
}

function NotificationSettings({ settings, onChange, onSave, loading }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Notification Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
            <p className="text-sm text-gray-500">Receive notifications via email</p>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications.emailNotifications}
            onChange={(e) => onChange('notifications', 'emailNotifications', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
            <p className="text-sm text-gray-500">Receive push notifications in browser</p>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications.pushNotifications}
            onChange={(e) => onChange('notifications', 'pushNotifications', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">New User Registration</h3>
            <p className="text-sm text-gray-500">Notify when new users register</p>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications.newUserNotification}
            onChange={(e) => onChange('notifications', 'newUserNotification', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">New Article Published</h3>
            <p className="text-sm text-gray-500">Notify when new articles are published</p>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications.newArticleNotification}
            onChange={(e) => onChange('notifications', 'newArticleNotification', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">System Maintenance</h3>
            <p className="text-sm text-gray-500">Notify about system maintenance</p>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications.systemMaintenanceNotification}
            onChange={(e) => onChange('notifications', 'systemMaintenanceNotification', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Notification Settings'}
        </button>
      </div>
    </div>
  )
}
