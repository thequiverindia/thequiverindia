'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function StaticWidgetPanel({
  widgets = [],
  layout = 'grid',
  title = '',
  className = ''
}) {
  const [collapsedWidgets, setCollapsedWidgets] = useState(new Set())

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

  const renderStaticWidgetContent = (widget) => {
    switch (widget.type) {
      case 'weather':
        return (
          <Link href="/weather" className="block hover:bg-gray-50 rounded-lg transition-colors">
            <div className="text-center p-4">
              <div className="flex items-center justify-center mb-2">
                <span className="text-3xl mr-2">🌤️</span>
                <div className="text-3xl font-bold text-blue-600">28°C</div>
              </div>
              <div className="text-gray-700 font-medium">Partly Cloudy</div>
              <div className="text-sm text-gray-500 mt-1">New Delhi, Delhi</div>
              <div className="flex justify-between text-xs text-gray-400 mt-3">
                <span>Humidity: 65%</span>
                <span>Wind: 12 km/h</span>
              </div>
              <div className="text-xs text-blue-600 mt-2 font-medium">View Full Forecast →</div>
            </div>
          </Link>
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
            Loading {widget.title}...
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
                  {renderStaticWidgetContent(widget)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
