'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Calendar, 
  Star,
  Users,
  Eye,
  ArrowUpRight,
  Ghost,
  Camera
} from 'lucide-react'

interface Location {
  id: string
  name: string
  description: string
  shortDescription: string
  city: string
  region: string
  type: 'hrad' | 'zamek' | 'hrbitov' | 'les' | 'lom' | 'statek' | 'ostatni'
  position: number
  visitDate: string
  coverImage: string
  rating: number
  paranormalActivity: string[]
  teamMembers: string[]
  views: number
  isActive: boolean
  investigationStatus: 'completed' | 'ongoing' | 'planned' | 'memorial'
  coordinates?: {
    lat: number
    lng: number
  }
}

const locationsData: Location[] = [
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
  },
  {
    id: '2',
    name: 'Zámek Zbiroh',
    description: 'Historický zámek s bohatou historií alchymie a nevysvětlitelných jevů v podzemních chodbách.',
    shortDescription: 'Historický zámek s alchymií',
    city: 'Zbiroh',
    region: 'Středočeský kraj',
    type: 'zamek',
    position: 2,
    visitDate: '2023-07-22',
    coverImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&crop=center',
    rating: 4,
    paranormalActivity: ['Kroky', 'Hlasy', 'Světelné jevy'],
    teamMembers: ['Patrik Horyna', 'Matěj Zlatev'],
    views: 12330,
    isActive: true,
    investigationStatus: 'completed'
  },
  {
    id: '3',
    name: 'Statek Pohádka',
    description: 'Opuštěný statek v Šumavě s příběhy o bílé paní a nevysvětlitelnými zvuky.',
    shortDescription: 'Opuštěný statek s příběhy o bílé paní',
    city: 'Šumava',
    region: 'Jihočeský kraj',
    type: 'statek',
    position: 3,
    visitDate: '2023-08-10',
    coverImage: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop&crop=center',
    rating: 4,
    paranormalActivity: ['Bílá paní', 'Zvuky', 'Dotýkání'],
    teamMembers: ['Celý tým MadZone'],
    views: 9870,
    isActive: true,
    investigationStatus: 'completed'
  },
  {
    id: '4',
    name: 'Branišovský les',
    description: 'Temný les u Českých Budějovic s legendami o ztracených duších a podivných světlech.',
    shortDescription: 'Temný les s legendami o ztracených duších',
    city: 'České Budějovice',
    region: 'Jihočeský kraj',
    type: 'les',
    position: 4,
    visitDate: '2023-09-05',
    coverImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center',
    rating: 3,
    paranormalActivity: ['Světla', 'Hlasy', 'Ztracené duše'],
    teamMembers: ['Patrik Horyna', 'Andrea Šauerová'],
    views: 7450,
    isActive: true,
    investigationStatus: 'completed'
  },
  {
    id: '5',
    name: 'Stránská skála',
    description: 'Významná geologická lokalita u Brna s příběhy o nadpřirozených jevech.',
    shortDescription: 'Geologická lokalita s nadpřirozenými jevy',
    city: 'Brno',
    region: 'Jihomoravský kraj',
    type: 'ostatni',
    position: 5,
    visitDate: '2023-09-20',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
    rating: 3,
    paranormalActivity: ['Energetické pole', 'Vize', 'Zvláštní pocity'],
    teamMembers: ['Matěj Zlatev', 'Jan Hanauer'],
    views: 6120,
    isActive: true,
    investigationStatus: 'completed'
  },
  {
    id: '6',
    name: 'Bohnický hřbitov',
    description: 'Jeden z nejstarších pražských hřbitovů s dlouhou historií paranormálních aktivit.',
    shortDescription: 'Nejstarší pražský hřbitov s paranormální aktivitou',
    city: 'Praha',
    region: 'Praha',
    type: 'hrbitov',
    position: 6,
    visitDate: '2023-10-31',
    coverImage: 'https://images.unsplash.com/photo-1520637736862-4d197d17c89a?w=800&h=600&fit=crop&crop=center',
    rating: 5,
    paranormalActivity: ['Přízraky', 'Orby', 'Studený vzduch', 'Hlasy'],
    teamMembers: ['Celý tým MadZone'],
    views: 18900,
    isActive: true,
    investigationStatus: 'completed'
  },
  {
    id: '7',
    name: 'Les pánova březina',
    description: 'Tajemný les u Mukařova s historií rituálů a nadpřirozených setkání.',
    shortDescription: 'Tajemný les s historií rituálů',
    city: 'Mukařov',
    region: 'Středočeský kraj',
    type: 'les',
    position: 7,
    visitDate: '2023-11-15',
    coverImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center&sig=2',
    rating: 4,
    paranormalActivity: ['Rituální kruhy', 'Zvuky', 'Energetické anomálie'],
    teamMembers: ['Patrik Horyna', 'Jiří Jehlář'],
    views: 5430,
    isActive: true,
    investigationStatus: 'completed'
  },
  {
    id: '8',
    name: 'Lom velká amerika',
    description: 'Opuštěný lom s krystalovým jezerem a příběhy o utopenících.',
    shortDescription: 'Opuštěný lom s příběhy o utopenících',
    city: 'Mořina',
    region: 'Středočeský kraj',
    type: 'lom',
    position: 8,
    visitDate: '2023-12-03',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center&sig=3',
    rating: 3,
    paranormalActivity: ['Vodní duchové', 'Hlasy z vody', 'Studené skvrny'],
    teamMembers: ['Matěj Zlatev', 'Andrea Šauerová'],
    views: 4890,
    isActive: true,
    investigationStatus: 'completed'
  },
  {
    id: '9',
    name: 'Penzion Hubertus',
    description: 'Místo našich vzpomínek a prvních paranormálních vyšetřování.',
    shortDescription: 'Místo vzpomínek a prvních vyšetřování',
    city: 'Liberec',
    region: 'Liberecký kraj',
    type: 'ostatni',
    position: 9,
    visitDate: '2022-03-15',
    coverImage: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop&crop=center&sig=2',
    rating: 4,
    paranormalActivity: ['Kroky na chodbě', 'Hlasy', 'Dveře'],
    teamMembers: ['Celý původní tým'],
    views: 8760,
    isActive: false,
    investigationStatus: 'memorial'
  }
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'hrad': return 'bg-amber-600'
    case 'zamek': return 'bg-purple-600'
    case 'hrbitov': return 'bg-gray-600'
    case 'les': return 'bg-green-600'
    case 'lom': return 'bg-blue-600'
    case 'statek': return 'bg-orange-600'
    default: return 'bg-red-600'
  }
}

const getTypeName = (type: string) => {
  switch (type) {
    case 'hrad': return 'Hrad'
    case 'zamek': return 'Zámek'
    case 'hrbitov': return 'Hřbitov'
    case 'les': return 'Les'
    case 'lom': return 'Lom'
    case 'statek': return 'Statek'
    default: return 'Ostatní'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-600'
    case 'ongoing': return 'bg-yellow-600'
    case 'planned': return 'bg-blue-600'
    case 'memorial': return 'bg-gray-600'
    default: return 'bg-gray-600'
  }
}

const getStatusName = (status: string) => {
  switch (status) {
    case 'completed': return 'Dokončeno'
    case 'ongoing': return 'Probíhá'
    case 'planned': return 'Naplánováno'
    case 'memorial': return 'Vzpomínka'
    default: return 'Neznámý'
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('cs-CZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function LocationsContent() {
  const [filter, setFilter] = useState<'all' | 'active' | 'memorial'>('all')
  
  const filteredLocations = locationsData.filter(location => {
    switch (filter) {
      case 'active': return location.isActive
      case 'memorial': return !location.isActive
      default: return true
    }
  }).sort((a, b) => a.position - b.position)

  const activeLocations = filteredLocations.filter(loc => loc.isActive)
  const memorialLocations = filteredLocations.filter(loc => !loc.isActive)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-900/20 to-black border-b border-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Paranormální lokace
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Přehled všech míst, která tým MadZone navštívil a vyšetřoval. 
              Od starověkých hradů přes opuštěné statky až po tajemné lesy - 
              každé místo má svůj příběh a své tajemství.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-red-600 hover:bg-red-700' : 'border-gray-600 text-gray-300 hover:bg-gray-800'}
          >
            Všechny lokace ({locationsData.length})
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            onClick={() => setFilter('active')}
            className={filter === 'active' ? 'bg-red-600 hover:bg-red-700' : 'border-gray-600 text-gray-300 hover:bg-gray-800'}
          >
            Aktivní ({activeLocations.length})
          </Button>
          <Button
            variant={filter === 'memorial' ? 'default' : 'outline'}
            onClick={() => setFilter('memorial')}
            className={filter === 'memorial' ? 'bg-red-600 hover:bg-red-700' : 'border-gray-600 text-gray-300 hover:bg-gray-800'}
          >
            Vzpomínky ({memorialLocations.length})
          </Button>
        </div>

        {/* Active Locations */}
        {(filter === 'all' || filter === 'active') && activeLocations.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Vyšetřované lokace
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {activeLocations.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          </section>
        )}

        {/* Memorial Locations */}
        {(filter === 'all' || filter === 'memorial') && memorialLocations.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
              <Ghost className="h-8 w-8" />
              Vzpomínáme
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {memorialLocations.map((location) => (
                <LocationCard key={location.id} location={location} isMemorial />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

interface LocationCardProps {
  location: Location
  isMemorial?: boolean
}

function LocationCard({ location, isMemorial = false }: LocationCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card 
      className={`group relative overflow-hidden bg-gray-900 border-gray-700 hover:border-red-600/50 transition-all duration-500 ${
        isMemorial ? 'opacity-75' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Background Image */}
        <Image
          src={location.coverImage}
          alt={location.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Position Badge */}
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-red-600 text-white font-bold text-lg px-3 py-1">
            {location.position}. místo
          </Badge>
        </div>

        {/* Type Badge */}
        <div className="absolute top-4 right-4 z-20">
          <Badge className={`${getTypeColor(location.type)} text-white`}>
            {getTypeName(location.type)}
          </Badge>
        </div>

        {/* Status Badge */}
        <div className="absolute bottom-4 right-4 z-20">
          <Badge className={`${getStatusColor(location.investigationStatus)} text-white`}>
            {getStatusName(location.investigationStatus)}
          </Badge>
        </div>

        {/* Rating Stars */}
        <div className={`absolute bottom-24 left-4 z-20 flex gap-1 transition-all duration-500 ${
          isHovered ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < location.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Overlay with blur effect on hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-all duration-500 ${
            isHovered ? 'backdrop-blur-sm bg-black/70' : 'bg-black/20'
          }`}
        />

        {/* Info overlay that slides up on hover */}
        <div className={`absolute inset-x-0 bottom-0 p-6 transform transition-all duration-500 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white mb-2">
              {location.name}
            </h3>
            
            <p className="text-gray-200 text-sm leading-relaxed">
              {location.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {location.city}, {location.region}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(location.visitDate)}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {location.teamMembers.length} členů
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {location.views.toLocaleString()}
              </span>
            </div>

            {/* Paranormal Activities */}
            <div className="flex flex-wrap gap-1 mt-3">
              {location.paranormalActivity.slice(0, 3).map((activity, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-red-900/50 text-red-200 text-xs"
                >
                  {activity}
                </Badge>
              ))}
              {location.paranormalActivity.length > 3 && (
                <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                  +{location.paranormalActivity.length - 3}
                </Badge>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <Button 
                size="sm" 
                className="bg-red-600 hover:bg-red-700 text-white flex-1"
                asChild
              >
                <Link href={`/lokace/${location.id}`}>
                  <Camera className="h-4 w-4 mr-2" />
                  Podrobnosti
                </Link>
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Basic info visible when not hovered */}
        <div className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-500 ${
          isHovered ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}>
          <h3 className="text-lg font-bold text-white mb-1 leading-tight">
            {location.name}
          </h3>
          <p className="text-gray-300 text-sm mb-2 leading-tight">
            {location.shortDescription}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <MapPin className="h-3 w-3" />
            {location.city}
          </div>
        </div>
      </div>
    </Card>
  )
}
