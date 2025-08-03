import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/public/header'
import { Footer } from '@/components/public/footer'
import { LocationDetail } from '@/components/locations/location-detail'

// Mock data pro demonstraci - v produkci by se načítalo z databáze
const locationsData = [
  {
    id: '1',
    name: 'Hrad Houska',
    description: 'Mystický hrad s legendami o bráně do pekel. Místo neobvyklých jevů a paranormálních aktivit.',
    shortDescription: 'Mystický hrad s legendami o bráně do pekel',
    city: 'Doksy',
    region: 'Liberecký kraj',
    type: 'hrad',
    position: 1,
    visitDate: '2023-06-15',
    coverImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop&crop=center',
    rating: 5,
    paranormalActivity: ['Zvuky', 'Přízraky', 'Studené skvrny', 'EMF anomálie'],
    teamMembers: ['Patrik Horyna', 'Matěj Zlatev', 'Jiří Jehlář'],
    views: 15420,
    isActive: true,
    investigationStatus: 'completed',
    coordinates: { lat: 50.4998, lng: 14.6081 }
  }
  // Další lokace...
]

interface LocationPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { id } = await params
  const location = locationsData.find(loc => loc.id === id)
  
  if (!location) {
    return {
      title: 'Lokace nenalezena | MadZone',
      description: 'Požadovaná lokace nebyla nalezena.'
    }
  }

  return {
    title: `${location.name} - ${location.city} | MadZone`,
    description: location.description,
    keywords: [`MadZone`, location.name, location.city, location.region, 'paranormální', 'vyšetřování'],
    openGraph: {
      title: `${location.name} - MadZone`,
      description: location.description,
      type: 'article',
      locale: 'cs_CZ',
    },
  }
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { id } = await params
  const location = locationsData.find(loc => loc.id === id)

  if (!location) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <LocationDetail location={location} />
      </main>
      <Footer />
    </div>
  )
}
