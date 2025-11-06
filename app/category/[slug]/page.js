import { fetchArticlesByCategory, fetchCategories } from '../../../lib/data'
import CategoryPage from '../../../components/CategoryPage'
import { notFound } from 'next/navigation'
import { generateCategoryMetadata, generateBreadcrumbStructuredData } from '../../../lib/seo'

export async function generateStaticParams() {
  const categories = await fetchCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }) {
  const categories = await fetchCategories()
  const category = categories.find(cat => cat.slug === params.slug)
  
  if (!category) {
    return {
      title: 'Category Not Found - TheQuiverIndia',
      description: 'The requested category could not be found.',
    }
  }

  return generateCategoryMetadata(category)
}

export default async function CategoryPageContainer({ params, searchParams }) {
  const page = parseInt(searchParams.page) || 1
  const categories = await fetchCategories()
  const category = categories.find(cat => cat.slug === params.slug)
  
  if (!category) {
    notFound()
  }

  const articlesData = await fetchArticlesByCategory(category.name, page, 12)

  // Generate breadcrumb structured data
  const breadcrumbs = [
    { name: 'Home', url: process.env.NEXT_PUBLIC_BASE_URL || 'https://thequiverindia.com' },
    { name: category.name, url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://thequiverindia.com'}/category/${category.slug}` },
  ]
  const breadcrumbStructuredData = generateBreadcrumbStructuredData(breadcrumbs)

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      
      <CategoryPage
        category={category}
        articlesData={articlesData}
        currentPage={page}
      />
    </>
  )
}
