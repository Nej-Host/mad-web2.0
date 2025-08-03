import { Metadata } from 'next'
import { Header } from '@/components/public/header'
import { Footer } from '@/components/public/footer'
import { ContactContent } from '@/components/contact/contact-content'

export const metadata: Metadata = {
  title: 'Kontakt | MadZone',
  description: 'Spojte se s týmem MadZone. Obchodní nabídky, spolupráce, obecné dotazy. Sledujte nás na sociálních sítích.',
  keywords: ['MadZone', 'kontakt', 'email', 'spolupráce', 'sociální sítě', 'YouTube', 'Instagram'],
  openGraph: {
    title: 'Kontakt | MadZone',
    description: 'Spojte se s týmem MadZone. Obchodní nabídky a spolupráce.',
    type: 'website',
    locale: 'cs_CZ',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <ContactContent />
      </main>
      <Footer />
    </div>
  )
}
