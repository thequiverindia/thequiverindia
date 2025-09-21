import { fetchArticlesByCategory, fetchCategories } from '../../../lib/data'
import CategoryPage from '../../../components/CategoryPage'
import { notFound } from 'next/navigation'

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

  return {
    title: `${category.name} News - TheQuiverIndia`,
    description: `Latest ${category.name.toLowerCase()} news and updates from India. ${category.description}`,
    openGraph: {
      title: `${category.name} News - TheQuiverIndia`,
      description: category.description,
      type: 'website',
    },
  }
}

export default async function CategoryPageContainer({ params, searchParams }) {
  const page = parseInt(searchParams.page) || 1
  const categories = await fetchCategories()
  const category = categories.find(cat => cat.slug === params.slug)
  
  if (!category) {
    notFound()
  }

  const articlesData = await fetchArticlesByCategory(category.name, page, 12)

  return (
    <CategoryPage
      category={category}
      articlesData={articlesData}
      currentPage={page}
    />
  )
}
