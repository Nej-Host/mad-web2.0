'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Eye, Heart, MessageCircle, ArrowRight, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useMemo } from 'react'
import { useArticlesData } from '@/hooks/use-articles'

// Types for mock data compatibility
interface MockArticle {
  id: string
  title: string
  excerpt?: string
  slug: string
  coverImage?: string | null
  publishedAt: string
  views: number
  featured: boolean
  status: 'published'
  author: {
    firstName: string
    lastName: string
  }
  category?: {
    name: string
    slug: string
  }
  tags: Array<{
    name: string
    slug: string
  }>
  _count: {
    likes: number
    comments: number
  }
}

interface BlogGridProps {
  showFeatured?: boolean
  limit?: number
  categoryId?: string
}

export function BlogGrid({ showFeatured = false, limit, categoryId }: BlogGridProps) {
  // Memoize filters to prevent unnecessary re-renders
  const filters = useMemo(() => ({
    featured: showFeatured || undefined,
    limit,
    categoryId,
    status: 'published' as const
  }), [showFeatured, limit, categoryId])

  const { articles, isLoading, error, refetch } = useArticlesData(filters)

  const [visibleArticles, setVisibleArticles] = useState(6)

  // Mock data fallback when no articles are available
  const mockArticles: MockArticle[] = [
    {
      id: '1',
      title: 'Noční expedice na hrad Kašperk: Co jsme opravdu viděli',
      excerpt: 'Během naší nejnovější expedice na hrad Kašperk jsme zaznamenali několik nevysvětlitelných jevů. Podívejte se na podrobnou analýzu našich nálezů a rozhodněte sami, zda věříte na duchy.',
      slug: 'noc-expedice-hrad-kasperk',
      coverImage: null,
      publishedAt: '2025-01-15T10:00:00Z',
      views: 3847,
      featured: true,
      status: 'published' as const,
      author: {
        firstName: 'Jan',
        lastName: 'Novák'
      },
      category: {
        name: 'Expedice',
        slug: 'expedice'
      },
      tags: [
        { name: 'Hrad Kašperk', slug: 'hrad-kasperk' },
        { name: 'EVP', slug: 'evp' },
        { name: 'Thermal anomálie', slug: 'thermal-anomalie' }
      ],
      _count: {
        likes: 156,
        comments: 23
      }
    },
    {
      id: '2',
      title: 'Průvodce paranormálním vybavením: Co skutečně potřebujete',
      excerpt: 'Kompletní přehled vybavení, které používáme při našich expedicích. Od základních EMF detektorů až po pokročilé thermal kamery.',
      slug: 'pruvodce-paranormalnim-vybavenim',
      coverImage: null,
      publishedAt: '2025-01-12T10:00:00Z',
      views: 2156,
      featured: false,
      status: 'published' as const,
      author: {
        firstName: 'Marie',
        lastName: 'Svobodová'
      },
      category: {
        name: 'Vybavení',
        slug: 'vybaveni'
      },
      tags: [
        { name: 'EMF', slug: 'emf' },
        { name: 'Thermal kamera', slug: 'thermal-kamera' },
        { name: 'Digital recorder', slug: 'digital-recorder' }
      ],
      _count: {
        likes: 89,
        comments: 34
      }
    },
    {
      id: '3',
      title: 'Historie černé magie v českých zemích',
      excerpt: 'Ponořte se do temné historie našich předků. Kde se v Čechách a na Moravě nejčastěji praktikovala černá magie a jaké stopy po sobě zanechala.',
      slug: 'historie-cerne-magie-ceske-zeme',
      coverImage: null,
      publishedAt: '2025-01-10T10:00:00Z',
      views: 4521,
      featured: true,
      status: 'published' as const,
      author: {
        firstName: 'Petr',
        lastName: 'Dvořák'
      },
      category: {
        name: 'Historie',
        slug: 'historie'
      },
      tags: [
        { name: 'Černá magie', slug: 'cerna-magie' },
        { name: 'Historie', slug: 'historie' },
        { name: 'Folklore', slug: 'folklore' }
      ],
      _count: {
        likes: 234,
        comments: 67
      }
    }
  ]

  // Use real articles if available, otherwise use mock data
  const displayArticles = articles.length > 0 ? articles : mockArticles
  const featuredArticles = displayArticles.filter((article) => 
    'featured' in article && article.featured
  )

  const categoryColors = {
    'Expedice': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    'Vybavení': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    'Historie': 'bg-purple-500/20 text-purple-400 border-purple-500/50',
    'Důkazy': 'bg-green-500/20 text-green-400 border-green-500/50',
    'Psychologie': 'bg-pink-500/20 text-pink-400 border-pink-500/50'
  }

  const calculateReadTime = (content?: string) => {
    if (!content) return '5 min'
    const words = content.split(' ').length
    const readingSpeed = 200 // words per minute
    return `${Math.ceil(words / readingSpeed)} min`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const loadMoreArticles = () => {
    setVisibleArticles(prev => prev + 6)
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Chyba při načítání článků: {error}</p>
        <Button onClick={() => refetch()} variant="outline">
          Zkusit znovu
        </Button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Načítání článků...</p>
      </div>
    )
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                DOPORUČENÉ ČLÁNKY
              </h2>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                Nejčtenější
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.slice(0, 2).map((article) => (
                <Card key={article.id} className="bg-gray-900/50 border-gray-700/50 overflow-hidden group hover:bg-gray-900/70 transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                    {article.coverImage ? (
                      <Image 
                        src={article.coverImage} 
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Eye className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                      Doporučeno
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`absolute top-4 right-4 ${categoryColors[article.category?.name as keyof typeof categoryColors] || 'bg-gray-500/20 text-gray-400 border-gray-500/50'}`}
                    >
                      {article.category?.name || 'Ostatní'}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {article.author.firstName} {article.author.lastName}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(article.publishedAt!)}
                        </span>
                      </div>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {calculateReadTime()}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {article.tags.map((tag: { name: string; slug: string }, index: number) => (
                        <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-400 text-xs">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {article.views.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {article._count.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {article._count.comments}
                        </span>
                      </div>
                      
                      <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10" asChild>
                        <Link href={`/blog/${article.slug}`}>
                          Číst více
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Articles */}
        <div>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              VŠECHNY ČLÁNKY
            </h2>
            <div className="text-gray-400">
              Zobrazeno {Math.min(visibleArticles, displayArticles.length)} z {displayArticles.length} článků
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayArticles.slice(0, visibleArticles).map((article) => (
              <Card key={article.id} className="bg-gray-900/50 border-gray-700/50 overflow-hidden group hover:bg-gray-900/70 transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                  {article.coverImage ? (
                    <Image 
                      src={article.coverImage} 
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Eye className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <Badge 
                    variant="outline" 
                    className={`absolute top-3 right-3 text-xs ${categoryColors[article.category?.name as keyof typeof categoryColors] || 'bg-gray-500/20 text-gray-400 border-gray-500/50'}`}
                  >
                    {article.category?.name || 'Ostatní'}
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {article.author.firstName} {article.author.lastName}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(article.publishedAt!)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {calculateReadTime()}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {article.views.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {article._count.likes}
                      </span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 text-xs h-8" 
                    asChild
                  >
                    <Link href={`/blog/${article.slug}`}>
                      Číst článek
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {visibleArticles < displayArticles.length && (
            <div className="text-center mt-12">
              <Button 
                onClick={loadMoreArticles}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3"
              >
                Načíst více článků
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
