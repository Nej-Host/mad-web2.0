'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Calendar, 
  Star,
  Users,
  Eye,
  ArrowLeft,
  Ghost,
  Camera,
  ExternalLink
} from 'lucide-react'

interface Location {
  id: string
  name: string
  description: string
  shortDescription: string
  city: string
  region: string
  type: string
  position: number
  visitDate: string
  coverImage: string
  rating: number
  paranormalActivity: string[]
  teamMembers: string[]
  views: number
  isActive: boolean
  investigationStatus: string
  coordinates?: {
    lat: number
    lng: number
  }
}

interface LocationDetailProps {
  location: Location
}

export function LocationDetail({ location }: LocationDetailProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image
          src={location.coverImage}
          alt={location.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Back button */}
        <div className="absolute top-8 left-8 z-10">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="bg-black/50 border-gray-600 text-white hover:bg-black/70"
          >
            <Link href="/lokace">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zpět na lokace
            </Link>
          </Button>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Badge className="bg-red-600 text-white font-bold text-lg px-3 py-1">
                {location.position}. místo
              </Badge>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < location.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {location.name}
            </h1>
            
            <p className="text-xl text-gray-200 mb-6 max-w-3xl">
              {location.description}
            </p>

            <div className="flex flex-wrap gap-6 text-gray-300">
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {location.city}, {location.region}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {formatDate(location.visitDate)}
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {location.teamMembers.length} členů týmu
              </span>
              <span className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                {location.views.toLocaleString()} zobrazení
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Paranormal Activities */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Ghost className="h-6 w-6 text-red-500" />
                  Paranormální aktivita
                </h2>
                <div className="flex flex-wrap gap-2">
                  {location.paranormalActivity.map((activity, index) => (
                    <Badge 
                      key={index} 
                      className="bg-red-900/50 text-red-200"
                    >
                      {activity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Investigation Details */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Camera className="h-6 w-6 text-red-500" />
                  Detaily vyšetřování
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed">
                    Detailní popis vyšetřování, zjištění a zážitky týmu během návštěvy této lokace. 
                    Zde by byl obsah specifický pro každou lokaci s popisem konkrétních událostí, 
                    naměřených hodnot a paranormálních jevů.
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                    nostrud exercitation ullamco laboris.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Gallery */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Galerie z vyšetřování
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="aspect-square relative rounded-lg overflow-hidden">
                      <Image
                        src={`https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=300&fit=crop&crop=center&sig=${index}`}
                        alt={`Fotografie ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Základní informace</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Typ lokace:</span>
                    <span className="text-white capitalize">{location.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Datum návštěvy:</span>
                    <span className="text-white">{formatDate(location.visitDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <Badge className={location.isActive ? 'bg-green-600' : 'bg-gray-600'}>
                      {location.isActive ? 'Aktivní' : 'Vzpomínka'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hodnocení:</span>
                    <div className="flex gap-1">
                      {Array.from({ length: location.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Účastníci vyšetřování</h3>
                <div className="space-y-2">
                  {location.teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      {member}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            {location.coordinates && (
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Poloha</h3>
                  <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <MapPin className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Mapa bude implementována</p>
                      <p className="text-xs">
                        {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Otevřít v mapách
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Related Locations */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Související lokace</h3>
                <div className="space-y-3">
                  <div className="text-sm text-gray-400">
                    Podobné lokace budou zobrazeny zde
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
