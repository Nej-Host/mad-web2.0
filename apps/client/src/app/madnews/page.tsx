import { Header } from '@/components/public/header'
import { Footer } from '@/components/public/footer'
import { BlogHero } from '@/components/blog/blog-hero'
import { BlogGrid } from '@/components/blog/blog-grid'
import { BlogCategories } from '@/components/blog/blog-categories'
import { BlogNewsletter } from '@/components/blog/blog-newsletter'

export default function MadnewsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <BlogHero />
      <BlogCategories />
      <BlogGrid />
      <BlogNewsletter />
      <Footer />
    </div>
  );
}
