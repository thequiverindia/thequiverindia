import Header from '../components/Header'
import ArticleCard from '../components/ArticleCard'
import StaticWidgetPanel from '../components/StaticWidgetPanel'
import SidebarAdSlot from '../components/SidebarAdSlot'
import Footer from '../components/Footer'
import { DynamicHeroCarousel, DynamicBreakingTicker, DynamicWidgetPanel } from '../components/DynamicComponents'
import { fetchFeaturedArticles, fetchBreakingNews } from '../lib/data'

export default async function HomePage() {
  const featuredArticles = await fetchFeaturedArticles()
  const breakingNews = await fetchBreakingNews()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />

      <main className="flex-1">
        {/* Breaking News Ticker */}
        <DynamicBreakingTicker newsItems={breakingNews} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Hero Carousel */}
              <section className="mb-12">
                <DynamicHeroCarousel articles={featuredArticles.slice(0, 5)} />
              </section>

              {/* Featured Articles Grid */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Featured Stories</h2>
                  <a
                    href="/featured"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    <span className="mr-1">⭐</span>
                    View All Featured →
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredArticles.slice(0, 6).map((article, index) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      size="medium"
                      showImage={true}
                      showExcerpt={true}
                      priority={index < 3}
                      variant={index === 0 ? 'featured' : 'default'}
                    />
                  ))}
                </div>
              </section>

              {/* Latest News */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest News</h2>
                <div className="space-y-4">
                  {featuredArticles.slice(6, 12).map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      size="medium"
                      showImage={true}
                      showExcerpt={true}
                      variant="compact"
                    />
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Weather Widget */}
                <DynamicWidgetPanel
                  widgets={[
                    {
                      id: 'weather',
                      type: 'weather',
                      title: 'Weather',
                      icon: '🌤️',
                      city: 'delhi'
                    }
                  ]}
                />

                {/* Live Updates */}
                <DynamicWidgetPanel
                  widgets={[
                    {
                      id: 'live-updates',
                      type: 'live-updates',
                      title: 'Live Updates',
                      icon: '🔴'
                    }
                  ]}
                />

                {/* Trending Topics */}
                <DynamicWidgetPanel
                  widgets={[
                    {
                      id: 'trending',
                      type: 'trending',
                      title: 'Trending Now',
                      icon: '📈'
                    }
                  ]}
                />

                {/* Stock Market */}
                <DynamicWidgetPanel
                  widgets={[
                    {
                      id: 'stock-market',
                      type: 'stock-market',
                      title: 'Stock Market',
                      icon: '📊'
                    }
                  ]}
                />

                {/* Popular Articles */}
                <DynamicWidgetPanel
                  widgets={[
                    {
                      id: 'popular',
                      type: 'popular',
                      title: 'Most Read',
                      icon: '🔥'
                    }
                  ]}
                />

                {/* Newsletter Signup */}
                <StaticWidgetPanel
                  widgets={[
                    {
                      id: 'newsletter',
                      type: 'newsletter',
                      title: 'Newsletter',
                      icon: '✉️'
                    }
                  ]}
                />

                {/* Advertisement */}
                <SidebarAdSlot
                  adSlot="sidebar-300x250"
                  className="bg-gray-100 p-4 rounded-lg"
                />
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
