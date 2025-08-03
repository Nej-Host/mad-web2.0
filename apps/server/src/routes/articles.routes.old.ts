import { Router, Request, Response } from 'express'
import { articleService } from '../services/article.service'
import { authenticateToken, optionalAuth, requireAdmin, AuthRequest } from '../middleware/auth.middleware'
import { validateRequest, ValidatedRequest } from '../middleware/validation.middleware'
import { asyncHandler } from '../middleware'
import { z } from 'zod'

const router = Router()

// Validation schemas
const createArticleSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  excerpt: z.string().max(500).optional(),
  coverImage: z.string().url().optional(),
  categoryId: z.string().cuid(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  featured: z.boolean().optional()
})

const updateArticleSchema = createArticleSchema.partial()

const getArticlesSchema = z.object({
  page: z.string().transform(Number).pipe(z.number().min(1)).optional(),
  limit: z.string().transform(Number).pipe(z.number().min(1).max(50)).optional(),
  categoryId: z.string().cuid().optional(),
  featured: z.string().transform(val => val === 'true').optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  search: z.string().optional(),
  tags: z.string().transform(val => val.split(',')).optional(),
  sortBy: z.enum(['createdAt', 'publishedAt', 'views', 'title']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
})

// Routes

/**
 * @route GET /api/articles
 * @desc Get articles with filtering and pagination
 * @access Public
 */
router.get('/', validateRequest({ query: getArticlesSchema }), async (req: Request, res: Response) => {
  try {
    const filters = {
      categoryId: req.query.categoryId as string,
      featured: req.query.featured as boolean,
      status: (req.query.status as string) || 'PUBLISHED',
      search: req.query.search as string,
      tags: req.query.tags as string[]
    }

    const pagination = {
      page: (req.query.page as number) || 1,
      limit: (req.query.limit as number) || 10,
      sortBy: (req.query.sortBy as string) || 'publishedAt',
      sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc'
    }

    const result = await ArticleService.getArticles(filters, pagination)
    
    res.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Error fetching articles:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch articles'
    })
  }
})

/**
 * @route GET /api/articles/:identifier
 * @desc Get single article by ID or slug
 * @access Public
 */
router.get('/:identifier', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { identifier } = req.params
    const userId = req.user?.id

    const article = await ArticleService.getArticle(identifier, userId)
    
    res.json({
      success: true,
      data: article
    })
  } catch (error) {
    console.error('Error fetching article:', error)
    if (error.message === 'Article not found') {
      res.status(404).json({
        success: false,
        message: 'Article not found'
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch article'
      })
    }
  }
})

/**
 * @route POST /api/articles
 * @desc Create new article
 * @access Private (Authors, Editors, Admins)
 */
router.post('/', 
  authenticateUser, 
  validateRequest({ body: createArticleSchema }), 
  async (req: Request, res: Response) => {
    try {
      const articleData = {
        ...req.body,
        authorId: req.user!.id
      }

      const article = await ArticleService.createArticle(articleData)
      
      res.status(201).json({
        success: true,
        data: article,
        message: 'Article created successfully'
      })
    } catch (error) {
      console.error('Error creating article:', error)
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create article'
      })
    }
  }
)

/**
 * @route PUT /api/articles/:id
 * @desc Update article
 * @access Private (Author, Editors, Admins)
 */
router.put('/:id', 
  authenticateUser, 
  validateRequest({ body: updateArticleSchema }), 
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      
      // TODO: Add authorization check (user can only edit their own articles or is editor/admin)
      
      const article = await ArticleService.updateArticle(id, req.body)
      
      res.json({
        success: true,
        data: article,
        message: 'Article updated successfully'
      })
    } catch (error) {
      console.error('Error updating article:', error)
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update article'
      })
    }
  }
)

/**
 * @route DELETE /api/articles/:id
 * @desc Delete article
 * @access Private (Author, Editors, Admins)
 */
router.delete('/:id', authenticateUser, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    // TODO: Add authorization check (user can only delete their own articles or is editor/admin)
    
    await ArticleService.deleteArticle(id)
    
    res.json({
      success: true,
      message: 'Article deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting article:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete article'
    })
  }
})

/**
 * @route POST /api/articles/:id/like
 * @desc Toggle article like
 * @access Private
 */
router.post('/:id/like', authenticateUser, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const result = await ArticleService.toggleArticleLike(id, userId)
    
    res.json({
      success: true,
      data: result,
      message: result.liked ? 'Article liked' : 'Article unliked'
    })
  } catch (error) {
    console.error('Error toggling article like:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to toggle like'
    })
  }
})

/**
 * @route POST /api/articles/:id/bookmark
 * @desc Toggle article bookmark
 * @access Private
 */
router.post('/:id/bookmark', authenticateUser, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const result = await ArticleService.toggleArticleBookmark(id, userId)
    
    res.json({
      success: true,
      data: result,
      message: result.bookmarked ? 'Article bookmarked' : 'Bookmark removed'
    })
  } catch (error) {
    console.error('Error toggling bookmark:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to toggle bookmark'
    })
  }
})

export default router
