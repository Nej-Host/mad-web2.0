import { Header } from '@/components/public/header'
import { Footer } from '@/components/public/footer'
import { BlogArticle } from '@/components/blog/blog-article'
import { RelatedArticles } from '@/components/blog/related-articles'
import { BlogComments } from '@/components/blog/blog-comments'

interface ArticlePageProps {
  params: Promise<{ id: string }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <BlogArticle articleId={id} />
      <RelatedArticles currentArticleId={id} />
      <BlogComments articleId={id} />
      <Footer />
    </div>
  );
}
