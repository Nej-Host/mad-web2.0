import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';

const router = Router();
const prisma = new PrismaClient();

// Redis klient pro AWS ElastiCache
const redis = new Redis({
  host: 'madzone-web-dev-kggmse.serverless.euc1.cache.amazonaws.com',
  port: 6379,
  enableReadyCheck: false,
  maxRetriesPerRequest: 3,
  connectTimeout: 10000,
  lazyConnect: true,
});

// Health check endpoint pro ověření databázového připojení
router.get('/health', async (req, res) => {
  try {
    // Test databázového připojení
    await prisma.$queryRaw`SELECT 1`;
    
    // Test Redis připojení
    let redisStatus = 'Connected';
    let redisError = null;
    try {
      await redis.ping();
    } catch (error) {
      redisStatus = 'Disconnected';
      redisError = error instanceof Error ? error.message : 'Unknown error';
    }
    
    // Získání počtu tabulek
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    ` as Array<{ table_name: string }>;

    res.json({
      status: 'OK',
      database: 'Connected',
      postgres: 'Running',
      redis: redisStatus,
      redisError,
      tables: tables.length,
      tableNames: tables.map(t => t.table_name),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'ERROR',
      database: 'Disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// Databázové statistiky endpoint
router.get('/health/database', async (req, res) => {
  try {
    const [
      userCount,
      taskCount,
      articleCount,
      eventCount
    ] = await Promise.all([
      prisma.user.count(),
      prisma.task.count(),
      prisma.article.count(),
      prisma.event.count()
    ]);

    res.json({
      status: 'OK',
      statistics: {
        users: userCount,
        tasks: taskCount,
        articles: articleCount,
        events: eventCount
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database stats failed:', error);
    res.status(500).json({
      status: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// Redis test endpoint
router.get('/health/redis', async (req, res) => {
  try {
    // Test základních Redis operací
    const testKey = 'health-check-test';
    const testValue = `test-${Date.now()}`;
    
    // SET test
    await redis.set(testKey, testValue, 'EX', 60);
    
    // GET test  
    const retrievedValue = await redis.get(testKey);
    
    // DELETE test
    await redis.del(testKey);

    res.json({
      status: 'OK',
      redis: 'Connected',
      operations: {
        set: 'OK',
        get: retrievedValue === testValue ? 'OK' : 'FAILED',
        delete: 'OK'
      },
      server: 'madzone-web-dev-kggmse.serverless.euc1.cache.amazonaws.com:6379',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Redis test failed:', error);
    res.status(500).json({
      status: 'ERROR',
      redis: 'Disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

export default router;
