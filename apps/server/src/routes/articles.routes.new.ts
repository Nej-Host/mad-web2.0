import { Router } from 'express'
import { z } from 'zod'
import { validateRequest, ValidatedRequest } from '../middleware/validation.middleware'
import { authenticateToken, requireAdmin, optionalAuth, AuthRequest } from '../middleware/auth.middleware'
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
  featured: z.boolean().optional(),
  publishedAt: z.string().datetime().optional()
})

const updateArticleSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().max(500).optional(),
  coverImage: z.string().url().optional(),
  categoryId: z.string().cuid().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  publishedAt: z.string().datetime().optional()
})

const querySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.string().optional().transform(val => val === 'true'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'publishedAt', 'views', 'title']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
})

const paramSchema = z.object({
  id: z.string().min(1)
})

// GET /api/articles - Get all articles
router.get('/', 
  validateRequest({ query: querySchema }),
  optionalAuth,
  asyncHandler(async (req: ValidatedRequest & AuthRequest, res) => {
    const queryData = req.validatedQuery as {
      page: number
      limit: number
      categoryId?: string
      tags?: string[]
      featured?: boolean
      status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
      search?: string
      sortBy?: 'createdAt' | 'publishedAt' | 'views' | 'title'
      sortOrder?: 'asc' | 'desc'
    }
    
    const { page, limit, categoryId, tags, featured, status, search, sortBy, sortOrder } = queryData
    
    const filters = {
      categoryId,
      tags,
      featured,
      status,
      search
    }
    
    const pagination = { page, limit, sortBy, sortOrder }
    
    const result = await ArticleService.getArticles(filters, pagination)
    
    res.json({
      success: true,
      data: result
    })
  })
)

// GET /api/articles/:id - Get single article
router.get('/:id',
  validateRequest({ params: paramSchema }),
  optionalAuth,
  asyncHandler(async (req: ValidatedRequest & AuthRequest, res) => {
    const { id } = req.validatedParams!
    const userId = req.user?.id
    
    try {
      const article = await ArticleService.getArticle(id, userId)
      
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
  asyncHandler(async (req: ValidatedRequest & AuthRequest, res) => {
    const articleData = {
      ...req.validatedBody!,
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
  validateRequest({ params: paramSchema, body: updateArticleSchema }),
  authenticateToken,
  requireAdmin,
  asyncHandler(async (req: ValidatedRequest & AuthRequest, res) => {
    const { id } = req.validatedParams!
    
    const article = await ArticleService.updateArticle(id, req.validatedBody!)
    
    res.json({
      success: true,
      data: article
    })
  })
)

// DELETE /api/articles/:id - Delete article
router.delete('/:id',
  validateRequest({ params: paramSchema }),
  authenticateToken,
  requireAdmin,
  asyncHandler(async (req: ValidatedRequest & AuthRequest, res) => {
    const { id } = req.validatedParams!
    
    await ArticleService.deleteArticle(id)
    
    res.json({
      success: true,
      message: 'Article deleted successfully'
    })
  })
)

// POST /api/articles/:id/like - Toggle article like
router.post('/:id/like',
  validateRequest({ params: paramSchema }),
  authenticateToken,
  asyncHandler(async (req: ValidatedRequest & AuthRequest, res) => {
    const { id } = req.validatedParams!
    const userId = req.user!.id
    
    const result = await ArticleService.toggleLike(id, userId)
    
    res.json({
      success: true,
      data: result
    })
  })
)

// POST /api/articles/:id/bookmark - Toggle article bookmark
router.post('/:id/bookmark',
  validateRequest({ params: paramSchema }),
  authenticateToken,
  asyncHandler(async (req: ValidatedRequest & AuthRequest, res) => {
    const { id } = req.validatedParams!
    const userId = req.user!.id
    
    const result = await ArticleService.toggleBookmark(id, userId)
    
    res.json({
      success: true,
      data: result
    })
  })
)

// GET /api/articles/:id/comments - Get article comments
router.get('/:id/comments',
  validateRequest({ params: paramSchema }),
  optionalAuth,
  asyncHandler(async (req: ValidatedRequest & AuthRequest, res) => {
    const { id } = req.validatedParams!
    
    const comments = await ArticleService.getComments(id)
    
    res.json({
      success: true,
      data: comments
    })
  })
)

// POST /api/articles/:id/comments - Add comment to article
router.post('/:id/comments',
  validateRequest({ 
    params: paramSchema,
    body: z.object({
      content: z.string().min(1).max(1000),
      parentId: z.string().optional()
    })
  }),
  authenticateToken,
  asyncHandler(async (req: ValidatedRequest & AuthRequest, res) => {
    const { id } = req.validatedParams!
    const { content, parentId } = req.validatedBody!
    const userId = req.user!.id
    
    const comment = await ArticleService.addComment(id, {
      content,
      authorId: userId,
      parentId
    })
    
    res.status(201).json({
      success: true,
      data: comment
    })
  })
)

export default router
