import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import 'reflect-metadata';
import { createContext, Context } from './context';
import { UserResolver } from './resolvers/UserResolver';
import { TaskResolver } from './resolvers/TaskResolver';
import { EventResolver } from './resolvers/EventResolver';
import { ExpenseResolver } from './resolvers/ExpenseResolver';
import { SiteSettingsResolver } from './resolvers/SiteSettingsResolver';
import { ArticleResolver } from './resolvers/ArticleResolver';
import authRoutes from './routes/auth';
import articlesRoutes from './routes/articles';
import healthRoutes from './routes/health';

const prisma = new PrismaClient();

async function startServer() {
  // Vytvoření Express aplikace
  const app = express();
  
  // CORS konfigurace
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  }));
  
  app.use(express.json());

  // Vytvoření GraphQL schématu
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      TaskResolver,
      EventResolver,
      ExpenseResolver,
      SiteSettingsResolver,
      ArticleResolver,
    ],
    validate: false,
    authChecker: ({ context, roles }: { context: Context, roles?: string[] }) => {
      // Pro demo účely - vždy autorizovaný
      if (!context.user) {
        // Vytvoříme demo uživatele
        context.user = {
          id: 'demo-user',
          clerkId: 'demo-clerk-id',
          email: 'demo@madzone.cz',
          role: 'ADMIN'
        };
      }
      
      // Pokud jsou specifikované role, zkontrolujeme je
      if (roles && roles.length > 0) {
        return roles.includes(context.user.role);
      }
      
      return true;
    },
  });

  // Vytvoření Apollo Serveru
  const server = new ApolloServer<Context>({
    schema,
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      return {
        message: error.message,
        code: error.extensions?.code,
        path: error.path,
      };
    },
  });

  await server.start();

  // REST API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/articles', articlesRoutes);
  app.use('/api', healthRoutes);

  // Veřejné endpointy (bez autentizace)
  app.use('/graphql/public', expressMiddleware(server, {
    context: async ({ req }) => createContext({ req, requireAuth: false }),
  }));

  // Chráněné endpointy (s autentizací)
  app.use('/graphql', 
    ClerkExpressRequireAuth(),
    expressMiddleware(server, {
      context: async ({ req }) => createContext({ req, requireAuth: false }),
    })
  );

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const port = process.env.PORT || 4000;
  
  app.listen(port, () => {
    console.log(`🚀 Server běží na http://localhost:${port}`);
    console.log(`📊 GraphQL playground: http://localhost:${port}/graphql`);
    console.log(`🌍 Veřejné GraphQL: http://localhost:${port}/graphql/public`);
  });
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Ukončuji server...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Ukončuji server...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer().catch((error) => {
  console.error('Chyba při spouštění serveru:', error);
  process.exit(1);
});
