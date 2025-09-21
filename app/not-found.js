import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Page Not Found - TheQuiverIndia',
  description: 'The page you are looking for could not be found.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="text-8xl mb-6">📰</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              🏠 Go to Homepage
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              🔍 Search Articles
            </Link>
          </div>

          <div className="mt-12">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Popular Categories</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: 'National', icon: '🇮🇳', href: '/category/national' },
                { name: 'Cricket', icon: '🏏', href: '/category/cricket' },
                { name: 'Bollywood', icon: '🎬', href: '/category/bollywood' },
                { name: 'Economy', icon: '💰', href: '/category/economy' },
                { name: 'Regional', icon: '🗺️', href: '/category/regional' },
                { name: 'Weather', icon: '🌤️', href: '/weather' }
              ].map(category => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="inline-flex items-center space-x-1 px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
