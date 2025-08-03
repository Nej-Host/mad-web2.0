'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, Eye } from 'lucide-react'
import Link from 'next/link'

const newsArticles = [
  {
    id: 1,
    title: 'Tajemná světla na hradě Kašperk: Co jsme objevili?',
    excerpt: 'Během naší nejnovější expedice se nám podařilo zachytit několik nevysvětlitelných světelných anomálií. Podívejte se na analýzu našich nálezů.',
    category: 'Výzkum',
    date: '2024-12-15',
    readTime: '5 min',
    views: 2847,
    featured: true,
    image: '/images/news1.jpg'
  },
  {
    id: 2,
    title: 'Nové vybavení: Thermal kamery 4K',
    excerpt: 'Rozšiřujeme naše technické vybavení o nejmodernější thermal kamery, které nám umožní zachytit i ty nejjemnější teplotní anomálie.',
    category: 'Technologie',
    date: '2024-12-10',
    readTime: '3 min',
    views: 1234,
    featured: false,
    image: '/images/news2.jpg'
  },
  {
    id: 3,
    title: 'Plán expedic na rok 2025',
    excerpt: 'Odhalujeme naše plány na příští rok. Čekají nás výzkumy v opuštěných sanátoriích, starých hradech a dalších mysteriózních místech.',
    category: 'Oznámení',
    date: '2024-12-08',
    readTime: '7 min',
    views: 3156,
    featured: true,
    image: '/images/news3.jpg'
  },
  {
    id: 4,
    title: 'Interview: 5 let Madzone.cz',
    excerpt: 'Exkluzivní rozhovor o našich začátcích, největších objevech a plánech do budoucna. Podívejte se, jak jsme se dostali tam, kde jsme dnes.',
    category: 'Interview',
    date: '2024-12-05',
    readTime: '12 min',
    views: 4521,
    featured: false,
    image: '/images/news4.jpg'
  }
]

const categoryColors = {
  'Výzkum': 'bg-red-500/20 text-red-400 border-red-500/50',
  'Technologie': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  'Oznámení': 'bg-green-500/20 text-green-400 border-green-500/50',
  'Interview': 'bg-purple-500/20 text-purple-400 border-purple-500/50'
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function NewsSection() {
  const featuredArticle = newsArticles.find(article => article.featured)
  const regularArticles = newsArticles.filter(article => !article.featured)

  return (
    <section className="py-20 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            AKTUALITY
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Nejnovější informace z našich výzkumů a expedic
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent mb-12" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Featured Article */}
          {featuredArticle && (
            <div className="lg:col-span-2">
              <Card className="bg-gray-800/50 border-gray-700/50 overflow-hidden group hover:bg-gray-800/70 transition-all duration-300 h-full">
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Eye className="h-16 w-16 text-gray-400" />
                  </div>
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                    Hlavní článek
                  </Badge>
                  <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-white text-sm bg-black/50 px-2 py-1 rounded">
                    <Eye className="h-3 w-3" />
                    <span>{featuredArticle.views.toLocaleString()}</span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge 
                      variant="outline" 
                      className={categoryColors[featuredArticle.category as keyof typeof categoryColors]}
                    >
                      {featuredArticle.category}
                    </Badge>
                    <div className="flex items-center text-gray-500 text-sm space-x-4">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(featuredArticle.date)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {featuredArticle.readTime}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
                    Přečíst článek
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Regular Articles */}
          <div className="space-y-6">
            {regularArticles.slice(0, 3).map((article) => (
              <Card key={article.id} className="bg-gray-800/50 border-gray-700/50 overflow-hidden group hover:bg-gray-800/70 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <Eye className="h-6 w-6 text-gray-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${categoryColors[article.category as keyof typeof categoryColors]}`}
                        >
                          {article.category}
                        </Badge>
                        <div className="flex items-center text-gray-500 text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          {article.views.toLocaleString()}
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-white text-sm mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                        {article.title}
                      </h4>
                      
                      <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(article.date)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10" asChild>
            <Link href="/aktuality">
              Zobrazit všechny aktuality
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
