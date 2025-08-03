'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  FileText, 
  Tag, 
  Star,
  X,
  Plus
} from 'lucide-react'
import { useAuth, useAuthGuard } from '@/store/auth-store'
import { useArticles } from '@/hooks/use-articles'
import Link from 'next/link'

interface ArticleFormData {
  title: string
  excerpt: string
  content: string
  categoryId: string
  status: 'draft' | 'published'
  featured: boolean
  tags: string[]
}

export default function NewArticlePage() {
  const { user } = useAuth()
  const { isAuthenticated, isEditor } = useAuthGuard()
  const { createArticle } = useArticles()
  const router = useRouter()

  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    excerpt: '',
    content: '',
    categoryId: '',
    status: 'draft',
    featured: false,
    tags: []
  })

  const [newTag, setNewTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Mock categories - in real app, these would come from API
  const categories = [
    { id: '1', name: 'Expedice', slug: 'expedice' },
    { id: '2', name: 'Vybavení', slug: 'vybaveni' },
    { id: '3', name: 'Historie', slug: 'historie' },
    { id: '4', name: 'Důkazy', slug: 'dukazy' },
    { id: '5', name: 'Psychologie', slug: 'psychologie' }
  ]

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    
    if (!isEditor) {
      router.push('/blog')
      return
    }
  }, [isAuthenticated, isEditor, router])

  const handleInputChange = (field: keyof ArticleFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setError(null)
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.content) {
      setError('Název a obsah článku jsou povinné')
      return
    }

    if (!user) {
      setError('Uživatel není přihlášen')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const articleData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt || undefined,
        authorId: user.id,
        categoryId: formData.categoryId || undefined,
        status: formData.status,
        featured: formData.featured,
        publishedAt: formData.status === 'published' ? new Date().toISOString() : undefined,
        views: 0,
        tags: [], // Tags will be handled separately in real implementation
        _count: {
          likes: 0,
          comments: 0
        },
        author: user,
        category: categories.find(c => c.id === formData.categoryId),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
        coverImage: null
      }

      await createArticle(articleData as any)
      setSuccess(true)
      
      setTimeout(() => {
        router.push('/admin')
      }, 2000)
      
    } catch (error) {
      console.error('Failed to create article:', error)
      setError(error instanceof Error ? error.message : 'Nepodařilo se vytvořit článek')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthenticated || !isEditor) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="mb-4">Ověřuji oprávnění...</div>
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zpět na dashboard
                </Button>
              </Link>
              
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FileText className="h-6 w-6 text-red-500" />
                  Nový článek
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          
          {success && (
            <Alert className="border-green-500/50 bg-green-500/10">
              <AlertDescription className="text-green-400">
                Článek byl úspěšně vytvořen! Přesměrovávám na dashboard...
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="border-red-500/50 bg-red-500/10">
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Basic Info */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Základní informace</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-white">
                  Název článku *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Zadejte název článku..."
                  required
                  disabled={isSubmitting}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="excerpt" className="text-white">
                  Perex (krátký popis)
                </Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Krátký popis článku pro náhled..."
                  rows={3}
                  disabled={isSubmitting}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-white">
                    Kategorie
                  </Label>
                  <Select 
                    value={formData.categoryId} 
                    onValueChange={(value) => handleInputChange('categoryId', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Vyberte kategorii" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id} className="text-white">
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status" className="text-white">
                    Stav článku
                  </Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value: 'draft' | 'published') => handleInputChange('status', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="draft" className="text-white">Koncept</SelectItem>
                      <SelectItem value="published" className="text-white">Publikováno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    disabled={isSubmitting}
                    className="rounded border-gray-600 bg-gray-800"
                  />
                  <Star className="w-4 h-4 text-yellow-500" />
                  Doporučený článek
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Štítky
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Přidat štítek..."
                  disabled={isSubmitting}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                />
                <Button
                  type="button"
                  onClick={handleAddTag}
                  disabled={isSubmitting || !newTag.trim()}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-gray-800 text-gray-300 flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        disabled={isSubmitting}
                        className="hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Content */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Obsah článku</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Zde napište obsah článku..."
                rows={20}
                required
                disabled={isSubmitting}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Link href="/admin">
              <Button variant="outline" className="border-gray-600 text-gray-400">
                Zrušit
              </Button>
            </Link>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
              >
                <Eye className="w-4 h-4 mr-2" />
                Náhled
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting || !formData.title || !formData.content}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Ukládám...
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Uložit článek
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
