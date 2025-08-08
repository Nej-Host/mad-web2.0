import { Header } from '@/components/public/header'
import { HeroSection } from '@/components/public/hero-section'
import { MapSection } from '@/components/public/map-section'
import { InstagramSection } from '@/components/public/instagram-section'
import { PartnersSection } from '@/components/public/partners-section'
import { NewsSection } from '@/components/public/news-section'
import { Footer } from '@/components/public/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      <MapSection />
      <InstagramSection />
      <PartnersSection />
      <NewsSection />
      <Footer />
    </div>
  );
}
