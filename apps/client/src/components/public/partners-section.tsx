'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Star, Users, Award } from 'lucide-react'
import Link from 'next/link'

const partners = [
  {
    id: 1,
    name: 'Vodafone Playzone',
    type: 'Hlavní partner',
    description: 'Poskytovatel konektivity a technologické podpory pro naše expedice.',
    logo: '/images/vodafone-logo.png',
    website: 'https://www.vodafone.cz',
    tier: 'premium'
  },
  {
    id: 2,
    name: 'Michal Holán',
    type: 'Mediální partner',
    description: 'Spolupráce na dokumentaci a medializaci našich výzkumů.',
    logo: '/images/holan-logo.png',
    website: 'https://michalholan.cz',
    tier: 'gold'
  },
  {
    id: 3,
    name: 'Paranormal Equipment',
    type: 'Technický partner',
    description: 'Dodavatel specializovaného vybavení pro paranormální výzkum.',
    logo: '/images/equipment-logo.png',
    website: '#',
    tier: 'silver'
  },
  {
    id: 4,
    name: 'Ghost Hunters Czech',
    type: 'Odborný partner',
    description: 'Spolupráce s dalšími výzkumnými týmy v České republice.',
    logo: '/images/hunters-logo.png',
    website: '#',
    tier: 'bronze'
  }
]

const achievements = [
  {
    icon: Star,
    title: '50+',
    subtitle: 'Navštívených míst'
  },
  {
    icon: Users,
    title: '100K+',
    subtitle: 'Sledujících'
  },
  {
    icon: Award,
    title: '5+',
    subtitle: 'Let zkušeností'
  }
]

const tierStyles = {
  premium: 'border-yellow-500/50 bg-yellow-500/10',
  gold: 'border-orange-500/50 bg-orange-500/10',
  silver: 'border-gray-400/50 bg-gray-400/10',
  bronze: 'border-amber-600/50 bg-amber-600/10'
}

const tierLabels = {
  premium: 'Premium Partner',
  gold: 'Gold Partner',
  silver: 'Silver Partner',
  bronze: 'Bronze Partner'
}

export function PartnersSection() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            NAŠI PARTNEŘI
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Společně odkrýváme tajemství neznáma
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent mb-12" />
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
                <achievement.icon className="h-8 w-8 text-red-500" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{achievement.title}</div>
              <div className="text-gray-400">{achievement.subtitle}</div>
            </div>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {partners.map((partner) => (
            <Card 
              key={partner.id} 
              className={`bg-gray-900/50 border-gray-700/50 overflow-hidden group hover:bg-gray-900/70 transition-all duration-300 ${tierStyles[partner.tier as keyof typeof tierStyles]}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="font-semibold text-white text-lg mr-3">{partner.name}</h3>
                      <Badge 
                        variant="outline" 
                        className="text-xs border-current"
                      >
                        {tierLabels[partner.tier as keyof typeof tierLabels]}
                      </Badge>
                    </div>
                    <p className="text-red-400 text-sm font-medium mb-3">{partner.type}</p>
                  </div>
                  
                  {/* Logo placeholder */}
                  <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center ml-4">
                    <span className="text-gray-500 text-xs">LOGO</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  {partner.description}
                </p>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10 w-full"
                  asChild
                >
                  <Link href={partner.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Navštívit web
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="bg-gradient-to-r from-red-500/10 to-gray-900/50 border border-red-500/20 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Chcete se stát naším partnerem?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Hledáme partnery, kteří sdílejí naši vášeň pro objevování neznáma. 
            Nabízíme unikátní možnosti spolupráce a medializace.
          </p>
          <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white" asChild>
            <Link href="mailto:partnership@madzone.cz">
              Kontaktujte nás
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
