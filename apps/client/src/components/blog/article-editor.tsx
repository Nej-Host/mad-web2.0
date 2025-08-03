'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { X, Plus, Save, Eye } from 'lucide-react'

interface ArticleFormData {
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  published: boolean
  featured: boolean
}

const CATEGORIES = [
  { id: 'paranormal', name: 'Paranormální jevy' },
  { id: 'investigation', name: 'Vyšetřování' },
  { id: 'review', name: 'Recenze' },
  { id: 'behind-scenes', name: 'Za scénou' },
  { id: 'news', name: 'Novinky' },
]

export function ArticleEditor() {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [],
    published: false,
    featured: false,
  })
  
  const [newTag, setNewTag] = useState('')
  const [preview, setPreview] = useState(false)
  const [loading, setSaving] = useState(false)

  const handleInputChange = (field: keyof ArticleFormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange('tags', [...formData.tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove))
  }

  const handleSave = async (publish: boolean = false) => {
    setSaving(true)
    try {
      // TODO: Implement API call to save article
      console.log('Saving article:', { ...formData, published: publish })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert(publish ? 'Článek byl publikován!' : 'Článek byl uložen jako koncept!')
    } catch (error) {
      console.error('Error saving article:', error)
      alert('Chyba při ukládání článku')
    } finally {
      setSaving(false)
    }
  }

  if (preview) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Náhled článku</h1>
          <Button 
            onClick={() => setPreview(false)}
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          >
            <X className="h-4 w-4 mr-2" />
            Zavřít náhled
          </Button>
        </div>
        
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-8">
            <div className="mb-4">
              {formData.category && (
                <Badge variant="secondary" className="mb-2">
                  {CATEGORIES.find(c => c.id === formData.category)?.name}
                </Badge>
              )}
              {formData.featured && (
                <Badge className="ml-2 bg-red-600">Featured</Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">{formData.title || 'Bez názvu'}</h1>
            
            {formData.excerpt && (
              <p className="text-gray-400 text-lg mb-6 italic">{formData.excerpt}</p>
            )}
            
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {formData.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="border-red-600 text-red-600">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="prose prose-invert max-w-none">
              {formData.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-300 mb-4">
                  {paragraph || '\u00A0'}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Editor článků</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => setPreview(true)}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Eye className="h-4 w-4 mr-2" />
            Náhled
          </Button>
          <Button 
            onClick={() => handleSave(false)}
            disabled={loading}
            variant="outline"
            className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Uložit koncept
          </Button>
          <Button 
            onClick={() => handleSave(true)}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Publikovat
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Obsah článku</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-gray-300">Název článku</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Zadejte název článku..."
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="excerpt" className="text-gray-300">Krátký popis (perex)</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Krátký popis článku pro seznam..."
                  rows={3}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="content" className="text-gray-300">Obsah článku</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Zde napište obsah článku..."
                  rows={15}
                  className="bg-gray-800 border-gray-600 text-white font-mono"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Tip: Použijte prázdné řádky pro oddělení odstavců
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Publikování</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="featured" className="text-gray-300">Zvýrazněný článek</Label>
                <input
                  id="featured"
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="rounded border-gray-600 bg-gray-800"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Kategorie</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Vyberte kategorii" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Štítky</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Přidat štítek..."
                  className="bg-gray-800 border-gray-600 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button
                  type="button"
                  onClick={addTag}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-red-600 text-red-600 cursor-pointer hover:bg-red-600 hover:text-white"
                      onClick={() => removeTag(tag)}
                    >
                      #{tag}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
