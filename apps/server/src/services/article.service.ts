import { prisma } from '../lib/prisma'
import { redis, RedisKeys, CacheTTL, safeRedisOp } from '../lib/redis'

export interface CreateArticleInput {
  title: string
  content: string
  excerpt?: string
  coverImage?: string
  categoryId: string
  authorId: string
  tags?: string[]
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  featured?: boolean
}

export interface UpdateArticleInput {
  title?: string
  content?: string
  excerpt?: string
  coverImage?: string
  categoryId?: string
  tags?: string[]
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  featured?: boolean
}

export interface ArticleFilters {
  categoryId?: string
  featured?: boolean
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  authorId?: string
  search?: string
  tags?: string[]
}

export interface PaginationOptions {
  page?: number
  limit?: number
  sortBy?: 'createdAt' | 'publishedAt' | 'views' | 'title'
  sortOrder?: 'asc' | 'desc'
}

export class ArticleService {
  // Create article
  static async createArticle(data: CreateArticleInput) {
    const { tags = [], ...articleData } = data

    // Generate slug from title
    const slug = this.generateSlug(data.title)
    
    // Check if slug exists
    const existingArticle = await prisma.article.findUnique({
      where: { slug }
    })
    
    if (existingArticle) {
      throw new Error('Article with this title already exists')
    }

    // Calculate read time (approximately 200 words per minute)
    const readTime = Math.ceil(data.content.split(' ').length / 200)

    const article = await prisma.article.create({
      data: {
        ...articleData,
        slug,
        readTime,
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
        tags: {
          create: tags.map(tagName => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: {
                  name: tagName,
                  slug: this.generateSlug(tagName)
                }
              }
            }
          }))
        }
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            imageUrl: true
          }
        },
        category: true,
        tags: {
          include: {
            tag: true
          }
        },
        _count: {
          select: {
            comments: true,
            likes: true,
            bookmarks: true
          }
        }
      }
    })

    // Clear relevant caches
    await this.clearArticleListCaches()

    return article
  }

  // Get article by ID or slug
  static async getArticle(identifier: string, userId?: string) {
    const cacheKey = RedisKeys.article(identifier)
    
    // Try to get from cache first
    const cached = await redis.get(cacheKey)
    if (cached) {
      const article = JSON.parse(cached)
      
      // Increment view count asynchronously
      this.incrementViews(article.id)
      
      // Add user-specific data if userId provided
      if (userId) {
        article.isLiked = await this.isArticleLiked(article.id, userId)
        article.isBookmarked = await this.isArticleBookmarked(article.id, userId)
      }
      
      return article
    }

    // Get from database
    const article = await prisma.article.findFirst({
      where: {
        OR: [
          { id: identifier },
          { slug: identifier }
        ],
        status: 'PUBLISHED'
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            imageUrl: true
          }
        },
        category: true,
        tags: {
          include: {
            tag: true
          }
        },
        _count: {
          select: {
            comments: {
              where: { isActive: true }
            },
            likes: true,
            bookmarks: true
          }
        }
      }
    })

    if (!article) {
      throw new Error('Article not found')
    }

    // Cache the article
    await redis.setex(cacheKey, CacheTTL.MEDIUM, JSON.stringify(article))

    // Increment view count asynchronously
    this.incrementViews(article.id)

    // Add user-specific data if userId provided
    if (userId) {
      article.isLiked = await this.isArticleLiked(article.id, userId)
      article.isBookmarked = await this.isArticleBookmarked(article.id, userId)
    }

    return article
  }

  // Get articles with filters and pagination
  static async getArticles(filters: ArticleFilters = {}, pagination: PaginationOptions = {}) {
    const {
      categoryId,
      featured,
      status = 'PUBLISHED',
      authorId,
      search,
      tags = []
    } = filters

    const {
      page = 1,
      limit = 10,
      sortBy = 'publishedAt',
      sortOrder = 'desc'
    } = pagination

    const skip = (page - 1) * limit

    // Build cache key
    const cacheKey = RedisKeys.articlesList(
      JSON.stringify({ filters, pagination })
    )

    // Try cache first - temporarily disabled for testing
    // const cached = await safeRedisOp(
    //   () => redis.get(cacheKey),
    //   null
    // )
    // if (cached) {
    //   return JSON.parse(cached)
    // }

    // Build where clause
    const where: any = {
      status
    }

    if (categoryId) where.categoryId = categoryId
    if (featured !== undefined) where.featured = featured
    if (authorId) where.authorId = authorId
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ]
    }
    if (tags.length > 0) {
      where.tags = {
        some: {
          tag: {
            name: { in: tags }
          }
        }
      }
    }

    // Get articles and total count
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              imageUrl: true
            }
          },
          category: true,
          tags: {
            include: {
              tag: true
            }
          },
          _count: {
            select: {
              comments: {
                where: { isActive: true }
              },
              likes: true,
              bookmarks: true
            }
          }
        },
        orderBy: {
          [sortBy]: sortOrder
        },
        skip,
        take: limit
      }),
      prisma.article.count({ where })
    ])

    const result = {
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    }

    // Cache the result
    // Cache result - temporarily disabled for testing
    // await redis.setex(cacheKey, CacheTTL.SHORT, JSON.stringify(result))

    return result
  }

  // Update article
  static async updateArticle(id: string, data: UpdateArticleInput) {
    const { tags, ...articleData } = data

    // Generate new slug if title changed
    if (data.title) {
      articleData.slug = this.generateSlug(data.title)
    }

    // Update published date if status changed to PUBLISHED
    if (data.status === 'PUBLISHED') {
      const currentArticle = await prisma.article.findUnique({
        where: { id },
        select: { status: true, publishedAt: true }
      })
      
      if (currentArticle?.status !== 'PUBLISHED' && !currentArticle?.publishedAt) {
        articleData.publishedAt = new Date()
      }
    }

    // Calculate read time if content changed
    if (data.content) {
      articleData.readTime = Math.ceil(data.content.split(' ').length / 200)
    }

    const updateData: any = {
      ...articleData,
      updatedAt: new Date()
    }

    // Handle tags update
    if (tags) {
      updateData.tags = {
        deleteMany: {},
        create: tags.map(tagName => ({
          tag: {
            connectOrCreate: {
              where: { name: tagName },
              create: {
                name: tagName,
                slug: this.generateSlug(tagName)
              }
            }
          }
        }))
      }
    }

    const article = await prisma.article.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            imageUrl: true
          }
        },
        category: true,
        tags: {
          include: {
            tag: true
          }
        },
        _count: {
          select: {
            comments: true,
            likes: true,
            bookmarks: true
          }
        }
      }
    })

    // Clear caches
    await Promise.all([
      redis.del(RedisKeys.article(id)),
      redis.del(RedisKeys.article(article.slug)),
      this.clearArticleListCaches()
    ])

    return article
  }

  // Delete article
  static async deleteArticle(id: string) {
    const article = await prisma.article.findUnique({
      where: { id },
      select: { slug: true }
    })

    if (!article) {
      throw new Error('Article not found')
    }

    await prisma.article.delete({
      where: { id }
    })

    // Clear caches
    await Promise.all([
      redis.del(RedisKeys.article(id)),
      redis.del(RedisKeys.article(article.slug)),
      this.clearArticleListCaches()
    ])

    return { success: true }
  }

  // Like/unlike article
  static async toggleArticleLike(articleId: string, userId: string) {
    const existingLike = await prisma.articleLike.findUnique({
      where: {
        userId_articleId: {
          userId,
          articleId
        }
      }
    })

    if (existingLike) {
      // Unlike
      await prisma.articleLike.delete({
        where: { id: existingLike.id }
      })
      return { liked: false }
    } else {
      // Like
      await prisma.articleLike.create({
        data: {
          userId,
          articleId
        }
      })
      return { liked: true }
    }
  }

  // Bookmark/unbookmark article
  static async toggleArticleBookmark(articleId: string, userId: string) {
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_articleId: {
          userId,
          articleId
        }
      }
    })

    if (existingBookmark) {
      // Remove bookmark
      await prisma.bookmark.delete({
        where: { id: existingBookmark.id }
      })
      return { bookmarked: false }
    } else {
      // Add bookmark
      await prisma.bookmark.create({
        data: {
          userId,
          articleId
        }
      })
      return { bookmarked: true }
    }
  }

  // Helper methods
  private static generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  private static async incrementViews(articleId: string) {
    // Use Redis for view counting to avoid database hits
    const key = RedisKeys.articleViews(articleId)
    const views = await redis.incr(key)
    
    // Update database every 10 views
    if (views % 10 === 0) {
      await prisma.article.update({
        where: { id: articleId },
        data: {
          views: {
            increment: 10
          }
        }
      })
    }
  }

  private static async isArticleLiked(articleId: string, userId: string): Promise<boolean> {
    const like = await prisma.articleLike.findUnique({
      where: {
        userId_articleId: {
          userId,
          articleId
        }
      }
    })
    return !!like
  }

  private static async isArticleBookmarked(articleId: string, userId: string): Promise<boolean> {
    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_articleId: {
          userId,
          articleId
        }
      }
    })
    return !!bookmark
  }

  private static async clearArticleListCaches() {
    const keys = await redis.keys('articles:*')
    if (keys.length > 0) {
      await redis.del(...keys)
    }
  }
}
