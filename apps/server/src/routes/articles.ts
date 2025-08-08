import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { validateRequest, ValidatedRequest } from '../middleware/validation.middleware'
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.middleware'
import { asyncHandler } from '../middleware'
import { ArticleService } from '../services/article.service'

const router = Router()

// Validation schemas
const createArticleSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  excerpt: z.string().max(500).optional(),
  coverImage: z.string().url().optional(),
  categoryId: z.string().cuid(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional()
})

const updateArticleSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().max(500).optional(),
  coverImage: z.string().url().optional(),
  categoryId: z.string().cuid().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional()
})

const paramSchema = z.object({
  id: z.string().min(1)
})

// GET /api/articles - Get all articles
router.get('/', 
  asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    
    const filters = {
      categoryId: req.query.categoryId as string,
      featured: req.query.featured === 'true',
      status: req.query.status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
      search: req.query.search as string
    }
    
    const pagination = { 
      page, 
      limit,
      sortBy: (req.query.sortBy as 'createdAt' | 'publishedAt' | 'views' | 'title') || 'createdAt',
      sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc'
    }
    
    const result = await ArticleService.getArticles(filters, pagination)
    
    res.json({
      success: true,
      data: result
    })
  })
)

// GET /api/articles/:id - Get single article
router.get('/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    
    try {
      const article = await ArticleService.getArticle(id)
      
      res.json({
        success: true,
        data: article
      })
    } catch (error) {
      if (error instanceof Error && error.message === 'Article not found') {
        return res.status(404).json({
          success: false,
          message: 'Article not found'
        })
      }
      throw error
    }
  })
)

// POST /api/articles - Create new article
router.post('/',
  authenticateToken,
  requireAdmin,
  validateRequest({ body: createArticleSchema }),
  asyncHandler(async (req: ValidatedRequest & AuthRequest, res: Response) => {
    const validatedData = req.validatedBody as {
      title: string
      content: string
      excerpt?: string
      coverImage?: string
      categoryId: string
      tags?: string[]
      featured?: boolean
    }
    
    const articleData = {
      ...validatedData,
      authorId: req.user!.id
    }
    
    const article = await ArticleService.createArticle(articleData)
    
    res.status(201).json({
      success: true,
      data: article
    })
  })
)

// PUT /api/articles/:id - Update article
router.put('/:id',
  authenticateToken,
  requireAdmin,
  validateRequest({ params: paramSchema, body: updateArticleSchema }),
  asyncHandler(async (req: ValidatedRequest & AuthRequest, res: Response) => {
    const { id } = req.validatedParams as { id: string }
    const updateData = req.validatedBody as {
      title?: string
      content?: string
      excerpt?: string
      coverImage?: string
      categoryId?: string
      tags?: string[]
      featured?: boolean
    }
    
    const article = await ArticleService.updateArticle(id, updateData)
    
    res.json({
      success: true,
      data: article
    })
  })
)

// DELETE /api/articles/:id - Delete article
router.delete('/:id',
  authenticateToken,
  requireAdmin,
  validateRequest({ params: paramSchema }),
  asyncHandler(async (req: ValidatedRequest & AuthRequest, res: Response) => {
    const { id } = req.validatedParams as { id: string }
    
    await ArticleService.deleteArticle(id)
    
    res.json({
      success: true,
      message: 'Article deleted successfully'
    })
  })
)

// POST /api/articles/:id/like - Toggle article like
router.post('/:id/like',
  authenticateToken,
  validateRequest({ params: paramSchema }),
  asyncHandler(async (req: ValidatedRequest & AuthRequest, res: Response) => {
    const { id } = req.validatedParams as { id: string }
    const userId = req.user!.id
    
    const result = await ArticleService.toggleArticleLike(id, userId)
    
    res.json({
      success: true,
      data: result
    })
  })
)

// POST /api/articles/:id/bookmark - Toggle article bookmark
router.post('/:id/bookmark',
  authenticateToken,
  validateRequest({ params: paramSchema }),
  asyncHandler(async (req: ValidatedRequest & AuthRequest, res: Response) => {
    const { id } = req.validatedParams as { id: string }
    const userId = req.user!.id
    
    const result = await ArticleService.toggleArticleBookmark(id, userId)
    
    res.json({
      success: true,
      data: result
    })
  })
)

export default router
