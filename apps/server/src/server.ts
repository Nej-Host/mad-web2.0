import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { redis } from './lib/redis'
import { errorHandler, notFound } from './middleware'
import articlesRoutes from './routes/articles.routes'

const app = express()
const PORT = process.env.PORT || 3001

// Initialize Prisma
export const prisma = new PrismaClient()

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: 'Connected',
    redis: redis.status
  })
})

// Simple test endpoint
app.get('/test', async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT COUNT(*)::int as count FROM articles`
    res.json({ 
      success: true, 
      message: 'Database test passed',
      result
    })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Database test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Quick data creation endpoint
app.post('/test-create', async (req, res) => {
  try {
    // Create a test user first
    const user = await prisma.user.upsert({
      where: { email: 'test@madzone.cz' },
      update: {},
      create: {
        email: 'test@madzone.cz',
        clerkId: 'test-clerk-id-' + Date.now(),
        firstName: 'Test',
        lastName: 'User',
        role: 'ADMIN'
      }
    })

    // Create a test category
    const category = await prisma.category.upsert({
      where: { slug: 'technology' },
      update: {},
      create: {
        name: 'Technology',
        slug: 'technology',
        description: 'Tech articles'
      }
    })

    // Create a test article
    const article = await prisma.article.create({
      data: {
        title: 'Test Article',
        slug: 'test-article-' + Date.now(),
        content: 'This is a test article content with some lorem ipsum text.',
        excerpt: 'Test article excerpt',
        authorId: user.id,
        categoryId: category.id,
        status: 'PUBLISHED',
        featured: true,
        readTime: 3,
        publishedAt: new Date()
      }
    })

    res.json({
      success: true,
      message: 'Test data created',
      data: { user, category, article }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create test data',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// API routes
app.use('/api/articles', articlesRoutes)

// Error handling
app.use(notFound)
app.use(errorHandler)

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect()
  redis.disconnect()
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`)
  console.log(`🔴 Redis: ${redis.status}`)
})

export default app
