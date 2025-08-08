'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const instagramPosts = [
  {
    id: 1,
    image: '/images/post1.jpg',
    caption: 'Nová expedice na hrad Kašperk byla úspěšná! Podařilo se nám zaznamenat několik zajímavých anomálií...',
    likes: 1247,
    comments: 89,
    timestamp: '2024-12-15T10:30:00Z'
  },
  {
    id: 2,
    image: '/images/post2.jpg',
    caption: 'Přípravy na další výzkum v plném proudu. Tentokrát míříme do opuštěného sanatoria v Krkonoších.',
    likes: 892,
    comments: 56,
    timestamp: '2024-12-14T15:45:00Z'
  },
  {
    id: 3,
    image: '/images/post3.jpg',
    caption: 'Záběry z poslední noci na starém hřbitově. Co myslíte o těchto světelných anomáliích?',
    likes: 1534,
    comments: 134,
    timestamp: '2024-12-13T20:15:00Z'
  },
  {
    id: 4,
    image: '/images/post4.jpg',
    caption: 'Behind the scenes: Příprava vybavení před výjezdem. Každý detail je důležitý.',
    likes: 675,
    comments: 42,
    timestamp: '2024-12-12T14:20:00Z'
  },
  {
    id: 5,
    image: '/images/post5.jpg',
    caption: 'Týmová porada před vstupem do továrních ruin. Bezpečnost je naší prioritou.',
    likes: 983,
    comments: 71,
    timestamp: '2024-12-11T18:30:00Z'
  },
  {
    id: 6,
    image: '/images/post6.jpg',
    caption: 'Noční snímky z expedice. Atmosféra byla opravdu výjimečná.',
    likes: 1156,
    comments: 98,
    timestamp: '2024-12-10T22:45:00Z'
  }
]

function formatTimeAgo(timestamp: string) {
  const now = new Date()
  const postTime = new Date(timestamp)
  const diffInHours = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 24) {
    return `${diffInHours}h`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d`
  }
}

export function InstagramSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Instagram className="h-8 w-8 text-pink-500 mr-3" />
            <h2 className="text-3xl lg:text-5xl font-bold text-white">
              @MADZONE_CZ
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Sledujte naše dobrodružství v reálném čase
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent mb-12" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {instagramPosts.map((post) => (
            <Card key={post.id} className="bg-gray-900/50 border-gray-800/50 overflow-hidden group hover:bg-gray-900/70 transition-all duration-300">
              <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center space-x-6 text-white">
                    <div className="flex items-center">
                      <Heart className="h-6 w-6 mr-2" />
                      <span className="font-semibold">{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-6 w-6 mr-2" />
                      <span className="font-semibold">{post.comments}</span>
                    </div>
                  </div>
                </div>
                
                {/* Placeholder for actual image */}
                <div className="w-full h-full bg-gradient-to-br from-red-500/20 to-gray-800 flex items-center justify-center">
                  <Instagram className="h-16 w-16 text-gray-600" />
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2 text-xs text-gray-500">
                  <span>{formatTimeAgo(post.timestamp)}</span>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      {post.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      {post.comments}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm line-clamp-3">
                  {post.caption}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white" asChild>
            <Link href="https://ig.madzone.cz" target="_blank" rel="noopener noreferrer">
              <Instagram className="mr-2 h-5 w-5" />
              Sledovat na Instagramu
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
