import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
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
interface CreateContextOptions {
    req: Request;
    requireAuth: boolean;
}
export declare function createContext({ req, requireAuth }: CreateContextOptions): Promise<Context>;
export {};
