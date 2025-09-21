import { fetchArticleBySlug, fetchRelatedArticles } from '../../../lib/data'
import ArticleDetailPage from '../../../components/ArticleDetailPage'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  try {
    const { article } = await fetchArticleBySlug(params.slug)
    
    return {
      title: `${article.title} - TheQuiverIndia`,
      description: article.excerpt,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        type: 'article',
        publishedTime: article.published_at,
        authors: [article.author],
        images: [
          {
            url: article.image?.src,
            alt: article.image?.alt,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt,
        images: [article.image?.src],
      },
    }
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

    return (
      <ArticleDetailPage 
        article={articleData.article}
        authorInfo={articleData.author_info}
        relatedArticles={relatedArticles}
      />
    )
  } catch (error) {
    notFound()
  }
}
