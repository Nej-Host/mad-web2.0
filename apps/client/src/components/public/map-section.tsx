'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, Camera, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const hauntedLocations = [
  {
    id: 1,
    name: 'Hrad Kašperk',
    region: 'Šumava',
    status: 'Navštíveno',
    date: '2024-10-15',
    image: '/images/kasperk.jpg',
    description: 'Středověký hrad s bohatou historií a nevyřešenými záhadami.',
    difficulty: 'Střední'
  },
  {
    id: 2,
    name: 'Opuštěný sanatorium',
    region: 'Krkonoše',
    status: 'Plánováno',
    date: '2025-03-20',
    image: '/images/sanatorium.jpg',
    description: 'Opuštěné lečebné zařízení s temnou minulostí.',
    difficulty: 'Vysoká'
  },
  {
    id: 3,
    name: 'Starý kostel',
    region: 'Jižní Čechy',
    status: 'Navštíveno',
    date: '2024-08-10',
    image: '/images/kostel.jpg',
    description: 'Gotický kostel s legendami o nemrtvých.',
    difficulty: 'Nízká'
  },
  {
    id: 4,
    name: 'Tovární ruiny',
    region: 'Ostrava',
    status: 'V přípravě',
    date: '2025-01-15',
    image: '/images/tovarna.jpg',
    description: 'Pozůstatky průmyslového komplexu s paranormální aktivitou.',
    difficulty: 'Střední'
  }
]

const statusColors = {
  'Navštíveno': 'bg-green-500/20 text-green-400 border-green-500/50',
  'Plánováno': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  'V přípravě': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
}

const difficultyColors = {
  'Nízká': 'text-green-400',
  'Střední': 'text-yellow-400',
  'Vysoká': 'text-red-400'
}

export function MapSection() {
  return (
    <section className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            MAPA STRAŠIDELNÝCH MÍST
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Která jsme již navštívili a kam se chystáme
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent mb-12" />
        </div>

        {/* Interactive Map Placeholder */}
        <div className="bg-gray-800/50 rounded-xl p-8 mb-12 border border-gray-700/50">
          <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <p className="text-gray-300 text-lg">Interaktivní mapa míst</p>
              <p className="text-gray-500 text-sm">Brzy k dispozici</p>
            </div>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hauntedLocations.map((location) => (
            <Card key={location.id} className="bg-gray-800/50 border-gray-700/50 overflow-hidden group hover:bg-gray-800/70 transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Camera className="h-12 w-12 text-gray-400" />
                </div>
                <Badge 
                  className={`absolute top-3 right-3 ${statusColors[location.status as keyof typeof statusColors]}`}
                  variant="outline"
                >
                  {location.status}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-white text-sm">{location.name}</h3>
                  <span className={`text-xs font-medium ${difficultyColors[location.difficulty as keyof typeof difficultyColors]}`}>
                    {location.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                  {location.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {location.region}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(location.date).toLocaleDateString('cs-CZ')}
                  </span>
                </div>

                {location.status === 'Navštíveno' && (
                  <Button size="sm" variant="outline" className="w-full text-xs border-red-500/50 text-red-400 hover:bg-red-500/10">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Zobrazit výzkum
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10" asChild>
            <Link href="/lokace">
              Zobrazit všechna místa
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}
