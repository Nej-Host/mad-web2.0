import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

// Rozšíření Express Request typu pro Clerk
declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        sessionClaims?: {
          email?: string;
          firstName?: string;
          lastName?: string;
          imageUrl?: string;
        };
      };
    }
  }
}

export interface Context {
  prisma: PrismaClient;
  user?: {
    id: string;
    clerkId: string;
    email: string;
    role: string;
  };
  req: Request;
}

const prisma = new PrismaClient();

interface CreateContextOptions {
  req: Request;
  requireAuth: boolean;
}

export async function createContext({ req, requireAuth }: CreateContextOptions): Promise<Context> {
  const context: Context = {
    prisma,
    req,
  };

  // Pro demo účely - vytvoříme demo uživatele
  const demoUser = await prisma.user.findUnique({
    where: { email: 'demo@madzone.cz' }
  });

  if (demoUser) {
    context.user = {
      id: demoUser.id,
      clerkId: demoUser.clerkId,
      email: demoUser.email,
      role: demoUser.role,
    };
  }

  return context;
}
