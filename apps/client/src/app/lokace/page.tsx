import { Metadata } from 'next'
import { Header } from '@/components/public/header'
import { Footer } from '@/components/public/footer'
import { LocationsContent } from '@/components/locations/locations-content'

export const metadata: Metadata = {
  title: 'Lokace | MadZone',
  description: 'Přehled všech paranormálních lokací, které tým MadZone navštívil a vyšetřoval. Hrady, zámky, hřbitovy a další místa s nevysvětlitelnými jevy.',
  keywords: ['MadZone', 'lokace', 'paranormální', 'hrady', 'zámky', 'hřbitovy', 'vyšetřování', 'duchové', 'místa'],
  openGraph: {
    title: 'Lokace | MadZone',
    description: 'Přehled všech paranormálních lokací vyšetřovaných týmem MadZone.',
    type: 'website',
    locale: 'cs_CZ',
  },
}

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <LocationsContent />
      </main>
      <Footer />
    </div>
  )
}
