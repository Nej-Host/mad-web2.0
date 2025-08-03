'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, MapPin, Camera, Ghost } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-6 text-red-500 border-red-500/50">
            👻 Paranormální vyšetřování
          </Badge>
          
          <h1 className="text-4xl lg:text-7xl font-bold mb-6 text-white">
            MADZONE
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Průzkum strašidelných míst České republiky. 
            Sledujte naše paranormální vyšetřování a objevte tajemství, 
            která se skrývají v opuštěných místech.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" asChild>
              <Link href="/lokace">
                <MapPin className="mr-2 h-5 w-5" />
                Mapa strašidelných míst
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10" asChild>
              <Link href="/shop">
                <Ghost className="mr-2 h-5 w-5" />
                Merchandise
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">50+</div>
              <div className="text-gray-400">Navštívených míst</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">100K+</div>
              <div className="text-gray-400">Sledujících</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">5+</div>
              <div className="text-gray-400">Let zkušeností</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
    </section>
  )
}
