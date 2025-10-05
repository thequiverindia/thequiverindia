// Dynamic imports with SSR disabled to prevent hydration issues
import dynamic from 'next/dynamic'

// Disable SSR for components that use browser APIs or dynamic data
export const DynamicWidgetPanel = dynamic(() => import('./WidgetPanel'), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
})

export const DynamicHeroCarousel = dynamic(() => import('./HeroCarousel'), {
  ssr: false,
  loading: () => (
    <div className="relative h-96 md:h-[500px] bg-gray-200 rounded-lg animate-pulse">
      <div className="absolute bottom-8 left-8 right-8">
        <div className="h-8 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  )
})

export const DynamicBreakingTicker = dynamic(() => import('./BreakingTicker'), {
  ssr: false,
  loading: () => (
    <div className="bg-red-600 text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <span className="bg-white text-red-600 px-2 py-1 rounded text-xs font-bold mr-4">
            BREAKING
          </span>
          <div className="h-4 bg-red-500 rounded w-64 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
})

export const DynamicSavedArticlesPage = dynamic(() => import('./SavedArticlesPage'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading saved articles...</span>
        </div>
      </div>
    </div>
  )
})

export const DynamicArticleDetailPage = dynamic(() => import('./ArticleDetailPage'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
