import { Header } from '@/components/public/header'
import { Footer } from '@/components/public/footer'
import { GalleryContent } from '@/components/gallery/gallery-content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galerie - MadZone.cz | Fotografie ze srazů a natáčení',
  description: 'Prohlédněte si naši galerii fotek ze srazů, natáčení a různých paranormálních vyšetřování týmu MadZone.',
  keywords: 'MadZone, galerie, fotografie, srazy, natáčení, paranormální vyšetřování, fotky',
  openGraph: {
    title: 'Galerie - MadZone.cz',
    description: 'Galerie fotek ze srazů a natáčení týmu MadZone',
    type: 'website',
    locale: 'cs_CZ',
  },
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <GalleryContent />
      <Footer />
    </div>
  )
}
