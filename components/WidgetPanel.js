'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  fetchTrendingTopics, 
  fetchLiveUpdates, 
  fetchStockData, 
  fetchWeatherByCity,
  fetchPopularArticles
} from '../lib/data'

export default function WidgetPanel({
  widgets = [],
  layout = 'grid',
  title = '',
  className = ''
}) {
  const [collapsedWidgets, setCollapsedWidgets] = useState(new Set())
  const [widgetData, setWidgetData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadWidgetData = async () => {
      setLoading(true)
      const data = {}
      
      for (const widget of widgets) {
        try {
          switch (widget.type) {
            case 'trending':
              data.trending = await fetchTrendingTopics()
              break
            case 'live-updates':
              data.liveUpdates = await fetchLiveUpdates()
              break
            case 'stock-market':
              data.stockData = await fetchStockData()
              break
            case 'weather':
              data.weather = await fetchWeatherByCity(widget.city || 'delhi')
              break
            case 'popular':
              data.popular = await fetchPopularArticles(5)
              break
          }
        } catch (error) {
          console.error(`Error loading ${widget.type} data:`, error)
        }
      }
      
      setWidgetData(data)
      setLoading(false)
    }

    if (widgets.length > 0) {
      loadWidgetData()
    }
  }, [widgets])

  const toggleWidget = (widgetId) => {
    const newCollapsed = new Set(collapsedWidgets)
    if (newCollapsed.has(widgetId)) {
      newCollapsed.delete(widgetId)
    } else {
      newCollapsed.add(widgetId)
    }
    setCollapsedWidgets(newCollapsed)
  }

  const layoutClasses = {
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6',
    list: 'space-y-6',
    compact: 'space-y-4'
  }

  const renderWidgetContent = (widget) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )
    }

    switch (widget.type) {
      case 'weather':
        const weather = widgetData.weather
        if (!weather) return <div className="text-gray-500 text-sm">Weather data unavailable</div>
        
        return (
          <Link href="/weather" className="block hover:bg-gray-50 rounded-lg transition-colors">
            <div className="text-center p-4">
              <div className="flex items-center justify-center mb-2">
                <span className="text-3xl mr-2">🌤️</span>
                <div className="text-3xl font-bold text-blue-600">{weather.temperature}°C</div>
              </div>
              <div className="text-gray-700 font-medium">{weather.condition}</div>
              <div className="text-sm text-gray-500 mt-1">{weather.city}, {weather.state}</div>
              <div className="flex justify-between text-xs text-gray-400 mt-3">
                <span>Humidity: {weather.humidity}%</span>
                <span>Wind: {weather.windSpeed} km/h</span>
              </div>
              <div className="text-xs text-blue-600 mt-2 font-medium">View Full Forecast →</div>
            </div>
          </Link>
        )

      case 'trending':
        const trending = widgetData.trending || []
        return (
          <div className="space-y-2">
            {trending.slice(0, 6).map((item, index) => (
              <div key={item.id} className="flex items-center justify-between py-2 px-1 hover:bg-gray-50 rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-gray-400 w-4">#{index + 1}</span>
                  <span className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                    {item.topic}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-500">{(item.count / 1000).toFixed(0)}K</span>
                  <span className={`text-xs ${item.trend === 'up' ? 'text-green-500' : item.trend === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
                    {item.trend === 'up' ? '↗' : item.trend === 'down' ? '↘' : '→'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )

      case 'live-updates':
        const liveUpdates = widgetData.liveUpdates || []
        return (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {liveUpdates.map((update) => (
              <div key={update.id} className="border-l-3 border-red-500 pl-3 py-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-red-600">LIVE</span>
                  <span className="text-xs text-gray-500">{update.time}</span>
                </div>
                <p className="text-sm text-gray-800 leading-snug">{update.update}</p>
                <span className={`inline-block text-xs px-2 py-1 rounded mt-1 ${
                  update.category === 'Cricket' ? 'bg-green-100 text-green-700' :
                  update.category === 'National' ? 'bg-blue-100 text-blue-700' :
                  update.category === 'Economy' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {update.category}
                </span>
              </div>
            ))}
          </div>
        )

      case 'stock-market':
        const stocks = widgetData.stockData
        if (!stocks) return <div className="text-gray-500 text-sm">Market data unavailable</div>
        
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-green-50 rounded">
              <div>
                <div className="text-sm font-medium text-gray-900">SENSEX</div>
                <div className="text-lg font-bold text-green-600">{stocks.sensex.value.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-green-600">+{stocks.sensex.change}</div>
                <div className="text-xs text-gray-500">+{stocks.sensex.changePercent}%</div>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
              <div>
                <div className="text-sm font-medium text-gray-900">NIFTY 50</div>
                <div className="text-lg font-bold text-blue-600">{stocks.nifty.value.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-blue-600">+{stocks.nifty.change}</div>
                <div className="text-xs text-gray-500">+{stocks.nifty.changePercent}%</div>
              </div>
            </div>
            <div className="text-xs text-gray-500 text-center">
              Last updated: {new Date(stocks.lastUpdated).toLocaleTimeString()}
            </div>
          </div>
        )

      case 'popular':
        const popular = widgetData.popular || []
        return (
          <div className="space-y-3">
            {popular.map((article, index) => (
              <Link key={article.id} href={`/article/${article.slug}`} className="block hover:bg-gray-50 rounded p-2 transition-colors">
                <div className="flex space-x-3">
                  <span className="text-xs font-bold text-gray-400 flex-shrink-0 w-4">#{index + 1}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">
                      {article.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">{article.views.toLocaleString()} views</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{article.reading_time}min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )

      case 'newsletter':
        return (
          <div className="text-center">
            <div className="mb-4">
              <span className="text-2xl">📧</span>
              <h4 className="font-medium text-gray-900 mt-2">Stay Updated</h4>
              <p className="text-sm text-gray-600 mt-1">
                Get breaking news and top stories delivered to your inbox
              </p>
            </div>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
              >
                Subscribe Now
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2">
              Join 2.5M+ subscribers. No spam, unsubscribe anytime.
            </p>
          </div>
        )

      default:
        return (
          <div className="text-gray-500 text-sm text-center p-4">
            {widget.content || 'Widget content goes here'}
          </div>
        )
    }
  }

  return (
    <aside
      className={`space-y-6 ${className}`}
      role="complementary"
      aria-label={title || "Sidebar widgets"}
    >
      {title && (
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {title}
        </h2>
      )}

      <div className={layoutClasses[layout]}>
        {widgets.map((widget) => {
          const isCollapsed = collapsedWidgets.has(widget.id)

          return (
            <div
              key={widget.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Widget Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-medium text-gray-900 text-sm flex items-center">
                  {widget.icon && <span className="mr-2">{widget.icon}</span>}
                  {widget.title}
                </h3>
                <button
                  onClick={() => toggleWidget(widget.id)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"
                  aria-expanded={!isCollapsed}
                  aria-controls={`widget-content-${widget.id}`}
                  aria-label={isCollapsed ? `Expand ${widget.title}` : `Collapse ${widget.title}`}
                >
                  <svg
                    className={`w-4 h-4 transition-transform ${isCollapsed ? '' : 'rotate-180'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Widget Content */}
              <div
                id={`widget-content-${widget.id}`}
                className={`transition-all duration-300 ${isCollapsed ? 'max-h-0 opacity-0 overflow-hidden' : 'max-h-[500px] opacity-100'}`}
                aria-hidden={isCollapsed}
              >
                <div className="p-4">
                  {renderWidgetContent(widget)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
