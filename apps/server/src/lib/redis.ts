import Redis from 'ioredis'

// Redis connection with error handling for development
export const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: 1,
  lazyConnect: true
})

// Graceful error handling
redis.on('error', (err) => {
  console.warn('Redis connection error:', err.message)
})

redis.on('connect', () => {
  console.log('✅ Redis connected')
})

// Helper function to safely use Redis
export const safeRedisOp = async <T>(operation: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await operation()
  } catch (error) {
    console.warn('Redis operation failed, using fallback:', error instanceof Error ? error.message : error)
    return fallback
  }
}

// Cache key helpers
export const RedisKeys = {
  article: (id: string) => `article:${id}`,
  articlesList: (filters: string) => `articles:list:${filters}`,
  userArticles: (userId: string) => `user:${userId}:articles`,
  categoryArticles: (categoryId: string) => `category:${categoryId}:articles`,
  articleViews: (id: string) => `article:${id}:views`,
  articleLikes: (id: string) => `article:${id}:likes`,
  userSession: (userId: string) => `session:${userId}`
} as const

// Cache TTL in seconds
export const CacheTTL = {
  ARTICLE: 300, // 5 minutes
  ARTICLES_LIST: 180, // 3 minutes
  USER_DATA: 600, // 10 minutes
  CATEGORY_DATA: 900, // 15 minutes
  VIEWS_COUNT: 86400 // 1 day
} as const
