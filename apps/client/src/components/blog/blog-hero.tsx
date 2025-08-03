'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, BookOpen, Calendar, TrendingUp } from 'lucide-react'
import { useState } from 'react'

export function BlogHero() {
  const [searchQuery, setSearchQuery] = useState('')
  
  // Calculate blog stats
  const blogStats = [
    {
      icon: BookOpen,
      number: '50+',
      label: 'Článků'
    },
    {
      icon: Calendar,
      number: '5+',
      label: 'Let psaní'
    },
    {
      icon: TrendingUp,
      number: '50K+',
      label: 'Čtenářů'
    }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementovat vyhledávání přes API
    console.log('Searching for:', searchQuery)
  }

  return (
    <section className="relative py-32 bg-gradient-to-b from-black via-gray-900/50 to-black overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-8">
            <BookOpen className="h-4 w-4 mr-2" />
            Madnews Blog
          </div>

          {/* Hlavní nadpis */}
          <h1 className="text-4xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            PŘÍBĚHY Z
            <span className="block text-red-500">TEMNÉ STRANY</span>
          </h1>

          {/* Popis */}
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Ponořte se do světa paranormálního výzkumu. Čtěte naše příběhy z expedic, 
            analýzy záhadných jevů a pozadí našich nejnebezpečnějších výzkumů.
          </p>

          {/* Vyhledávání */}
          <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-16">
            <div className="relative">
              <Input
                type="text"
                placeholder="Hledat články..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 pr-12 h-14 text-lg"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-2 bg-red-500 hover:bg-red-600"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Statistiky */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4 group-hover:bg-red-500/30 transition-colors">
                  <stat.icon className="h-8 w-8 text-red-500" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dekorativní prvky */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <div className="absolute bottom-32 right-1/3 w-1 h-1 bg-red-400 rounded-full animate-pulse" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}
