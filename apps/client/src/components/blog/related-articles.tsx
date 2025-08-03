'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Eye, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Mock data pro související články
const relatedArticles = [
  {
    id: 2,
    title: 'Průvodce paranormálním vybavením: Co skutečně potřebujete',
    excerpt: 'Kompletní přehled vybavení, které používáme při našich expedicích.',
    category: 'Vybavení',
    date: '2025-07-25',
    readTime: '12 min',
    views: 2156,
    image: '/images/blog/equipment-guide.jpg'
  },
  {
    id: 3,
    title: 'Historie černé magie v českých zemích',
    excerpt: 'Ponořte se do temné historie našich předků a jejich praktik.',
    category: 'Historie',
    date: '2025-07-22',
    readTime: '15 min',
    views: 4521,
    image: '/images/blog/black-magic-history.jpg'
  },
  {
    id: 6,
    title: 'Opuštěné sanatorium Hohenfels: Místo plné temných tajemství',
    excerpt: 'Průzkum jednoho z nejděsivějších míst v České republice.',
    category: 'Expedice',
    date: '2025-07-15',
    readTime: '13 min',
    views: 5673,
    image: '/images/blog/sanatorium-hohenfels.jpg'
  }
]

const categoryColors = {
  'Expedice': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  'Vybavení': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  'Historie': 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  'Důkazy': 'bg-green-500/20 text-green-400 border-green-500/50',
  'Psychologie': 'bg-pink-500/20 text-pink-400 border-pink-500/50'
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

interface RelatedArticlesProps {
  currentArticleId: string
}

export function RelatedArticles({ currentArticleId }: RelatedArticlesProps) {
  // TODO: Filtrovat články na základě currentArticleId a kategorie
  console.log('Current article ID:', currentArticleId)

  return (
    <section className="py-20 bg-gray-950/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              SOUVISEJÍCÍ ČLÁNKY
            </h2>
            <p className="text-gray-300">
              Pokračujte v čtení dalších zajímavých příběhů z našich expedic
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent mt-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {relatedArticles.map((article) => (
              <Card key={article.id} className="bg-gray-900/50 border-gray-700/50 overflow-hidden group hover:bg-gray-900/70 transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Eye className="h-12 w-12 text-gray-400" />
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`absolute top-3 right-3 text-xs ${categoryColors[article.category as keyof typeof categoryColors]}`}
                  >
                    {article.category}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(article.date)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-red-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-xs text-gray-500">
                      <Eye className="h-3 w-3 mr-1" />
                      {article.views.toLocaleString()} čtení
                    </span>
                    
                    <Button size="sm" variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10" asChild>
                      <Link href={`/madnews/${article.id}`}>
                        Číst
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10" asChild>
              <Link href="/madnews">
                Zobrazit všechny články
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
