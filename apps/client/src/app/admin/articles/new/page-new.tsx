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
  Plus,
  AlertCircle
} from 'lucide-react'
import { useAuth, useAuthGuard } from '@/store/auth-store'
import { useArticleMutations } from '@/hooks/use-articles-graphql'
import { type CreateArticleInput } from '@/lib/graphql/articles'
import Link from 'next/link'

interface ArticleFormData {
  title: string
  excerpt: string
  content: string
  categoryId: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  featured: boolean
  tags: string[]
}

export default function NewArticlePage() {
  const { user } = useAuth()
  const { isAuthenticated, isEditor } = useAuthGuard()
  const { createArticle, loading } = useArticleMutations()
  const router = useRouter()

  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    excerpt: '',
    content: '',
    categoryId: '',
    status: 'DRAFT',
    featured: false,
    tags: []
  })

  const [newTag, setNewTag] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Mock categories - in real app, these would come from GraphQL
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
      router.push('/admin')
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

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Název článku je povinný')
      return false
    }
    
    if (!formData.content.trim()) {
      setError('Obsah článku je povinný')
      return false
    }

    if (!formData.categoryId) {
      setError('Kategorie je povinná')
      return false
    }

    return true
  }

  const handleSubmit = async (status: 'DRAFT' | 'PUBLISHED') => {
    if (!validateForm()) return

    try {
      const articleData: CreateArticleInput = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        excerpt: formData.excerpt.trim() || undefined,
        categoryId: formData.categoryId,
        tags: formData.tags.length > 0 ? formData.tags : undefined,
        status,
        featured: formData.featured
      }

      await createArticle(articleData)
      setSuccess(true)
      
      // Redirect after successful creation
      setTimeout(() => {
        router.push('/admin')
      }, 2000)

    } catch (err) {
      console.error('Failed to create article:', err)
      setError('Nepodařilo se vytvořit článek. Zkuste to znovu.')
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

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-gray-900 border-gray-700 max-w-md">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Článek byl vytvořen!</h2>
            <p className="text-gray-400 mb-4">Přesměrování na admin panel...</p>
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
          </CardContent>
        </Card>
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
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zpět
                </Button>
              </Link>
              
              <div>
                <h1 className="text-2xl font-bold text-white">Nový článek</h1>
                <p className="text-gray-400">Vytvořte nový článek pro blog</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => handleSubmit('DRAFT')}
                disabled={loading.creating}
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading.creating ? 'Ukládám...' : 'Uložit koncept'}
              </Button>
              
              <Button
                onClick={() => handleSubmit('PUBLISHED')}
                disabled={loading.creating}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                {loading.creating ? 'Publikuji...' : 'Publikovat'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert className="bg-red-500/10 border-red-500/50 text-red-400">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Title */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Základní informace
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-gray-300">Název článku *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Zadejte název článku..."
                    className="bg-gray-800 border-gray-600 text-white"
                    disabled={loading.creating}
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt" className="text-gray-300">Krátký popis</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    placeholder="Krátký popis článku pro náhled..."
                    rows={3}
                    className="bg-gray-800 border-gray-600 text-white resize-none"
                    disabled={loading.creating}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Obsah článku *</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Napište obsah článku..."
                  rows={20}
                  className="bg-gray-800 border-gray-600 text-white resize-none"
                  disabled={loading.creating}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category & Status */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Nastavení</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300">Kategorie *</Label>
                  <Select 
                    value={formData.categoryId} 
                    onValueChange={(value) => handleInputChange('categoryId', value)}
                    disabled={loading.creating}
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

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="rounded border-gray-600"
                    disabled={loading.creating}
                  />
                  <Label htmlFor="featured" className="text-gray-300 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Doporučený článek
                  </Label>
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
                    className="bg-gray-800 border-gray-600 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    disabled={loading.creating}
                  />
                  <Button
                    onClick={handleAddTag}
                    size="sm"
                    variant="outline"
                    className="border-gray-600"
                    disabled={loading.creating}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-red-500/20 text-red-400 border-red-500/50 flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-red-300"
                        disabled={loading.creating}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Autor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-gray-400 text-sm">{user?.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
