import { BlogHero } from '@/components/blog/blog-hero'
import { BlogGrid } from '@/components/blog/blog-grid'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black">
      <BlogHero />
      <BlogGrid />
    </div>
  )
}
