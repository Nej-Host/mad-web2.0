'use client'

import { HeroSection } from '@/components/public/hero-section'
import { MapSection } from '@/components/public/map-section'
import { InstagramFeed } from '@/components/public/instagram-feed'
import { PartnersSection } from '@/components/public/partners-section'
import { NewsSection } from '@/components/public/news-section'
import { Header } from '@/components/public/header'
import { Footer } from '@/components/public/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main>
        <HeroSection />
        <MapSection />
        <NewsSection />
        <InstagramFeed />
        <PartnersSection />
      </main>
      
      <Footer />
    </div>
  )
}
