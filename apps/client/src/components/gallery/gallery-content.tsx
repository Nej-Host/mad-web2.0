'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  Calendar, 
  MapPin, 
  Users, 
  Camera,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  Heart
} from 'lucide-react'

interface GalleryItem {
  id: string
  title: string
  description: string
  date: string
  location: string
  category: 'sraz' | 'nataceni' | 'expedice' | 'ostatni'
  coverImage: string
  images: string[]
  participants: string[]
  views: number
  likes: number
}

const galleryCategories = [
  { id: 'all', label: 'Vše', count: 0 },
  { id: 'sraz', label: 'Srazy', count: 0 },
  { id: 'nataceni', label: 'Natáčení', count: 0 },
  { id: 'expedice', label: 'Expedice', count: 0 },
  { id: 'ostatni', label: 'Ostatní', count: 0 },
]

// Mock data pro galerii
const galleryData: GalleryItem[] = [
  {
    id: '1',
    title: 'První Madzone sraz',
    description: 'Naše první oficiální setkání celého týmu. Skvělá atmosféra, hodně zábavy a plánování budoucích projektů.',
    date: '2023-05-15',
    location: 'Praha, Česká republika',
    category: 'sraz',
    coverImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop&crop=center&sig=1',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center&sig=2',
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop&crop=center&sig=3',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop&crop=center&sig=4',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop&crop=center&sig=5',
    ],
    participants: ['Patrik Horyna', 'Matěj Zlatev', 'Jan Hanauer', 'Andrea Šauerová'],
    views: 2847,
    likes: 156
  },
  {
    id: '2',
    title: 'Natáčení v opuštěném zámku',
    description: 'Napínavé natáčení v historickém zámku. Zachytili jsme několik nevysvětlitelných jevů.',
    date: '2023-07-22',
    location: 'Zámek Houska, Česká republika',
    category: 'nataceni',
    coverImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop&crop=center&sig=1',
      'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=800&h=600&fit=crop&crop=center&sig=2',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center&sig=3',
    ],
    participants: ['Patrik Horyna', 'Matěj Zlatev', 'Jiří Jehlář'],
    views: 4231,
    likes: 287
  },
  {
    id: '3',
    title: 'Expedice do Krkonoš',
    description: 'Víkendová expedice za paranormálními jevy v horách. Nádherná příroda a tajemné příběhy.',
    date: '2023-09-10',
    location: 'Krkonoše, Česká republika',
    category: 'expedice',
    coverImage: 'https://images.unsplash.com/photo-1464822759844-d150f39ff2c8?w=800&h=600&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1464822759844-d150f39ff2c8?w=800&h=600&fit=crop&crop=center&sig=1',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center&sig=2',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center&sig=3',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&crop=center&sig=4',
    ],
    participants: ['Celý tým MadZone'],
    views: 3156,
    likes: 201
  },
  {
    id: '4',
    title: 'Letní teambuilding',
    description: 'Relaxační víkend u vody. Čas na odpočinek a plánování nových projektů.',
    date: '2023-08-05',
    location: 'Lipno, Česká republika',
    category: 'sraz',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center&sig=1',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&crop=center&sig=2',
      'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=800&h=600&fit=crop&crop=center&sig=3',
    ],
    participants: ['Patrik Horyna', 'Matěj Zlatev', 'Andrea Šauerová', 'Jan Flekal'],
    views: 1987,
    likes: 143
  },
  {
    id: '5',
    title: 'Backstage z nahrávání MadCastu',
    description: 'Zákulisí z nahrávání našeho podcastu. Vtipné momenty a technické problémy.',
    date: '2023-10-18',
    location: 'Studio, Praha',
    category: 'nataceni',
    coverImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=600&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=600&fit=crop&crop=center&sig=1',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop&crop=center&sig=2',
    ],
    participants: ['Patrik Horyna', 'Matěj Zlatev'],
    views: 1654,
    likes: 98
  },
  {
    id: '6',
    title: 'Vánoční večírek týmu',
    description: 'Tradiční vánoční setkání s dárky a spoustou zábavy.',
    date: '2023-12-15',
    location: 'Brno, Česká republika',
    category: 'sraz',
    coverImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&h=600&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&h=600&fit=crop&crop=center&sig=1',
      'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&h=600&fit=crop&crop=center&sig=2',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&crop=center&sig=3',
      'https://images.unsplash.com/photo-1481667967473-7c84ba497d29?w=800&h=600&fit=crop&crop=center&sig=4',
    ],
    participants: ['Celý tým MadZone'],
    views: 2341,
    likes: 178
  }
]

export function GalleryContent() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryItem | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [imageViewerOpen, setImageViewerOpen] = useState(false)

  // Filter data based on category
  const filteredGallery = selectedCategory === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === selectedCategory)

  // Update category counts
  const categoriesWithCounts = galleryCategories.map(cat => ({
    ...cat,
    count: cat.id === 'all' 
      ? galleryData.length 
      : galleryData.filter(item => item.category === cat.id).length
  }))

  const openImageViewer = (album: GalleryItem, imageIndex: number = 0) => {
    setSelectedAlbum(album)
    setSelectedImageIndex(imageIndex)
    setImageViewerOpen(true)
  }

  const closeImageViewer = () => {
    setImageViewerOpen(false)
    setSelectedAlbum(null)
    setSelectedImageIndex(0)
  }

  const nextImage = () => {
    if (selectedAlbum && selectedImageIndex < selectedAlbum.images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1)
    }
  }

  const prevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1)
    }
  }

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'sraz': return 'bg-blue-600'
      case 'nataceni': return 'bg-red-600'
      case 'expedice': return 'bg-green-600'
      case 'ostatni': return 'bg-purple-600'
      default: return 'bg-gray-600'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-900/20 to-black border-b border-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Galerie
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Naše galerie fotek srazů, fotek z natáčení a expedic za paranormálními jevy. 
              Prohlédněte si zákulisí naší práce a nezapomenutelné momenty týmu MadZone.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categoriesWithCounts.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'border-gray-600 text-gray-300 hover:bg-gray-800'
                }`}
              >
                {category.label}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((album) => (
            <Card 
              key={album.id} 
              className="bg-gray-900 border-gray-700 hover:border-red-600/50 transition-all duration-300 group cursor-pointer overflow-hidden"
              onClick={() => openImageViewer(album)}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={album.coverImage}
                  alt={album.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute top-3 left-3">
                  <Badge className={`${getCategoryBadgeColor(album.category)} text-white`}>
                    {galleryCategories.find(cat => cat.id === album.category)?.label}
                  </Badge>
                </div>
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    <Camera className="h-3 w-3 mr-1" />
                    {album.images.length}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-white mb-2 group-hover:text-red-400 transition-colors">
                  {album.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {album.description}
                </p>
                
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(album.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {album.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {album.participants.join(', ')}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-700">
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {album.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {album.likes}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    Zobrazit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGallery.length === 0 && (
          <div className="text-center py-16">
            <Camera className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Žádné fotografie nenalezeny
            </h3>
            <p className="text-gray-500">
              V této kategorii nejsou zatím žádné fotografie.
            </p>
          </div>
        )}
      </div>

      {/* Image Viewer Dialog */}
      <Dialog open={imageViewerOpen} onOpenChange={closeImageViewer}>
        <DialogContent className="max-w-6xl w-full h-[90vh] bg-black border-gray-800 p-0">
          {selectedAlbum && (
            <>
              <DialogHeader className="p-6 pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-2xl text-white mb-2">
                      {selectedAlbum.title}
                    </DialogTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(selectedAlbum.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {selectedAlbum.location}
                      </span>
                      <span>
                        {selectedImageIndex + 1} / {selectedAlbum.images.length}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeImageViewer}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </DialogHeader>
              
              <div className="flex-1 relative flex items-center justify-center p-6">
                <div className="relative w-full h-full max-h-[70vh]">
                  <Image
                    src={selectedAlbum.images[selectedImageIndex]}
                    alt={`${selectedAlbum.title} - obrázek ${selectedImageIndex + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
                
                {/* Navigation Buttons */}
                {selectedImageIndex > 0 && (
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                )}
                
                {selectedImageIndex < selectedAlbum.images.length - 1 && (
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                )}
              </div>

              {/* Thumbnail Strip */}
              <div className="p-6 pt-0">
                <div className="flex gap-2 justify-center overflow-x-auto">
                  {selectedAlbum.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        index === selectedImageIndex 
                          ? 'border-red-500' 
                          : 'border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Náhled ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
