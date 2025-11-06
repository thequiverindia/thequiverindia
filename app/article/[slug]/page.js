import { fetchArticleBySlug, fetchRelatedArticles } from '../../../lib/data'
import { DynamicArticleDetailPage } from '../../../components/DynamicComponents'
import { notFound } from 'next/navigation'
import { generateArticleMetadata, generateArticleStructuredData, generateBreadcrumbStructuredData } from '../../../lib/seo'

export async function generateMetadata({ params }) {
  try {
    const { article, author_info } = await fetchArticleBySlug(params.slug)
    return generateArticleMetadata(article, author_info)
  } catch (error) {
    return {
      title: 'Article Not Found - TheQuiverIndia',
      description: 'The requested article could not be found.',
    }
  }
}

export default async function ArticlePage({ params }) {
  try {
    const articleData = await fetchArticleBySlug(params.slug)
    const relatedArticles = await fetchRelatedArticles(articleData.article.id)

    // Generate structured data
    const articleStructuredData = generateArticleStructuredData(
      articleData.article, 
      articleData.author_info
    )
    
    // Generate breadcrumb structured data
    const breadcrumbs = [
      { name: 'Home', url: process.env.NEXT_PUBLIC_BASE_URL || 'https://thequiverindia.com' },
      { name: articleData.article.category || 'Articles', url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://thequiverindia.com'}/category/${articleData.article.category?.toLowerCase() || 'news'}` },
      { name: articleData.article.title, url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://thequiverindia.com'}/article/${articleData.article.slug}` },
    ]
    const breadcrumbStructuredData = generateBreadcrumbStructuredData(breadcrumbs)

    return (
      <>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />
        
        <DynamicArticleDetailPage 
          article={articleData.article}
          authorInfo={articleData.author_info}
          relatedArticles={relatedArticles}
        />
      </>
    )
  } catch (error) {
    notFound()
  }
}
