import { Router } from 'express'

const router = Router()

// Demo categories data
const demoCategories = [
  {
    id: '1',
    name: 'Expedice',
    slug: 'expedice',
    description: 'Záznamy z paranormálních expedic',
    color: '#3B82F6',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _count: {
      articles: 12
    }
  },
  {
    id: '2',
    name: 'Vybavení',
    slug: 'vybaveni',
    description: 'Přehled paranormálního vybavení',
    color: '#F59E0B',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _count: {
      articles: 8
    }
  },
  {
    id: '3',
    name: 'Historie',
    slug: 'historie',
    description: 'Historické paranormální případy',
    color: '#8B5CF6',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _count: {
      articles: 15
    }
  },
  {
    id: '4',
    name: 'Důkazy',
    slug: 'dukazy',
    description: 'Analýza paranormálních důkazů',
    color: '#10B981',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _count: {
      articles: 6
    }
  },
  {
    id: '5',
    name: 'Psychologie',
    slug: 'psychologie',
    description: 'Psychologické aspekty paranormálních jevů',
    color: '#EC4899',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _count: {
      articles: 4
    }
  }
]

// Get all categories
router.get('/', (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query
    
    let filteredCategories = [...demoCategories]
    
    // Search filter
    if (search) {
      const searchTerm = (search as string).toLowerCase()
      filteredCategories = filteredCategories.filter(category =>
        category.name.toLowerCase().includes(searchTerm) ||
        category.description?.toLowerCase().includes(searchTerm)
      )
    }
    
    // Pagination
    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = startIndex + limitNum
    
    const paginatedCategories = filteredCategories.slice(startIndex, endIndex)
    
    const pagination = {
      page: pageNum,
      limit: limitNum,
      total: filteredCategories.length,
      totalPages: Math.ceil(filteredCategories.length / limitNum),
      hasNext: endIndex < filteredCategories.length,
      hasPrev: pageNum > 1
    }
    
    res.json({
      success: true,
      data: paginatedCategories,
      pagination
    })
    
  } catch (error) {
    console.error('Get categories error:', error)
    res.status(500).json({
      success: false,
      message: 'Chyba při načítání kategorií'
    })
  }
})

// Get category by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params
    const category = demoCategories.find(c => c.id === id)
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kategorie nenalezena'
      })
    }
    
    res.json(category)
    
  } catch (error) {
    console.error('Get category error:', error)
    res.status(500).json({
      success: false,
      message: 'Chyba při načítání kategorie'
    })
  }
})

// Get category by slug
router.get('/slug/:slug', (req, res) => {
  try {
    const { slug } = req.params
    const category = demoCategories.find(c => c.slug === slug)
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kategorie nenalezena'
      })
    }
    
    res.json(category)
    
  } catch (error) {
    console.error('Get category by slug error:', error)
    res.status(500).json({
      success: false,
      message: 'Chyba při načítání kategorie'
    })
  }
})

// Get popular categories
router.get('/popular', (req, res) => {
  try {
    const { limit = 5 } = req.query
    const limitNum = parseInt(limit as string)
    
    // Sort by article count and take top categories
    const popularCategories = [...demoCategories]
      .sort((a, b) => b._count.articles - a._count.articles)
      .slice(0, limitNum)
    
    res.json(popularCategories)
    
  } catch (error) {
    console.error('Get popular categories error:', error)
    res.status(500).json({
      success: false,
      message: 'Chyba při načítání populárních kategorií'
    })
  }
})

// Create category (admin only)
router.post('/', (req, res) => {
  try {
    // TODO: Add authentication middleware
    const { name, description, color } = req.body
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Název kategorie je povinný'
      })
    }
    
    // Check if category already exists
    const existingCategory = demoCategories.find(c => 
      c.name.toLowerCase() === name.toLowerCase()
    )
    
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: 'Kategorie s tímto názvem již existuje'
      })
    }
    
    // Create new category
    const newCategory = {
      id: `demo-category-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
      description: description || null,
      color: color || '#6B7280',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _count: {
        articles: 0
      }
    }
    
    demoCategories.push(newCategory)
    
    res.status(201).json(newCategory)
    
  } catch (error) {
    console.error('Create category error:', error)
    res.status(500).json({
      success: false,
      message: 'Chyba při vytváření kategorie'
    })
  }
})

// Update category (admin only)
router.put('/:id', (req, res) => {
  try {
    // TODO: Add authentication middleware
    const { id } = req.params
    const { name, description, color } = req.body
    
    const categoryIndex = demoCategories.findIndex(c => c.id === id)
    
    if (categoryIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Kategorie nenalezena'
      })
    }
    
    // Update category
    const updatedCategory = {
      ...demoCategories[categoryIndex],
      ...(name && { name }),
      ...(description && { description }),
      ...(color && { color }),
      ...(name && { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') }),
      updatedAt: new Date().toISOString()
    }
    
    demoCategories[categoryIndex] = updatedCategory
    
    res.json(updatedCategory)
    
  } catch (error) {
    console.error('Update category error:', error)
    res.status(500).json({
      success: false,
      message: 'Chyba při aktualizaci kategorie'
    })
  }
})

// Delete category (admin only)
router.delete('/:id', (req, res) => {
  try {
    // TODO: Add authentication middleware
    const { id } = req.params
    
    const categoryIndex = demoCategories.findIndex(c => c.id === id)
    
    if (categoryIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Kategorie nenalezena'
      })
    }
    
    // Remove category
    demoCategories.splice(categoryIndex, 1)
    
    res.json({
      success: true,
      message: 'Kategorie byla odstraněna'
    })
    
  } catch (error) {
    console.error('Delete category error:', error)
    res.status(500).json({
      success: false,
      message: 'Chyba při odstraňování kategorie'
    })
  }
})

export default router
