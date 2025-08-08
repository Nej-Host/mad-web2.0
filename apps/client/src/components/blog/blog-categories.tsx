'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Ghost, Camera, Zap, MapPin, Users, BookOpen, Clock, Skull } from 'lucide-react'
import { useState } from 'react'

const categories = [
  {
    id: 'all',
    name: 'Všechny',
    icon: BookOpen,
    count: 150,
    color: 'text-white',
    bgColor: 'bg-red-500/20 border-red-500/50'
  },
  {
    id: 'expeditions',
    name: 'Expedice',
    icon: MapPin,
    count: 45,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20 border-blue-500/50'
  },
  {
    id: 'evidence',
    name: 'Důkazy',
    icon: Camera,
    count: 32,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20 border-green-500/50'
  },
  {
    id: 'paranormal',
    name: 'Paranormální',
    icon: Ghost,
    count: 28,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20 border-purple-500/50'
  },
  {
    id: 'equipment',
    name: 'Vybavení',
    icon: Zap,
    count: 21,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20 border-yellow-500/50'
  },
  {
    id: 'team',
    name: 'Tým',
    icon: Users,
    count: 15,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20 border-orange-500/50'
  },
  {
    id: 'stories',
    name: 'Příběhy',
    icon: Skull,
    count: 19,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/20 border-pink-500/50'
  },
  {
    id: 'history',
    name: 'Historie',
    icon: Clock,
    count: 12,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20 border-cyan-500/50'
  }
]

export function BlogCategories() {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <section className="py-16 bg-gray-950/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            KATEGORIE ČLÁNKŮ
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Prozkoumejte naše články podle témat, která vás zajímají nejvíce
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent mt-8" />
        </div>

        {/* Desktop kategorie - horizontální scroll */}
        <div className="hidden md:block">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                size="lg"
                onClick={() => setActiveCategory(category.id)}
                className={`
                  relative group transition-all duration-300
                  ${activeCategory === category.id 
                    ? `${category.bgColor} ${category.color} border-current shadow-lg shadow-current/20` 
                    : 'border-gray-600 text-gray-400 hover:text-white hover:border-gray-400'
                  }
                `}
              >
                <category.icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{category.name}</span>
                <Badge 
                  variant="secondary" 
                  className="ml-3 bg-gray-700/50 text-gray-300 text-xs"
                >
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile kategorie - grid */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                onClick={() => setActiveCategory(category.id)}
                className={`
                  relative group transition-all duration-300 h-auto p-4
                  ${activeCategory === category.id 
                    ? `${category.bgColor} ${category.color} border-current` 
                    : 'border-gray-600 text-gray-400 hover:text-white hover:border-gray-400'
                  }
                `}
              >
                <div className="flex flex-col items-center space-y-2">
                  <category.icon className="h-6 w-6" />
                  <span className="font-medium text-sm">{category.name}</span>
                  <Badge 
                    variant="secondary" 
                    className="bg-gray-700/50 text-gray-300 text-xs"
                  >
                    {category.count}
                  </Badge>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Aktivní kategorie info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gray-800/50 border border-gray-700/50 rounded-full">
            {(() => {
              const active = categories.find(cat => cat.id === activeCategory)
              const Icon = active?.icon || BookOpen
              return (
                <>
                  <Icon className={`h-5 w-5 mr-3 ${active?.color || 'text-white'}`} />
                  <span className="text-white font-medium">
                    Zobrazuji: {active?.name || 'Všechny'}
                  </span>
                  <Badge variant="secondary" className="ml-3 bg-gray-700 text-gray-300">
                    {active?.count || 0} článků
                  </Badge>
                </>
              )
            })()}
          </div>
        </div>
      </div>
    </section>
  )
}
