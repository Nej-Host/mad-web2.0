"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = createContext;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createContext({ req, requireAuth }) {
    const context = {
        prisma,
        req,
    };
    if (requireAuth && req.auth?.userId) {
        // Najít nebo vytvořit uživatele v databázi na základě Clerk ID
        const clerkId = req.auth.userId;
        let user = await prisma.user.findUnique({
            where: { clerkId }
        });
        if (!user) {
            // Pokud uživatel neexistuje, vytvoříme ho
            user = await prisma.user.create({
                data: {
                    clerkId,
                    email: req.auth.sessionClaims?.email || `user-${clerkId}@madzone.cz`,
                    firstName: req.auth.sessionClaims?.firstName || undefined,
                    lastName: req.auth.sessionClaims?.lastName || undefined,
                    imageUrl: req.auth.sessionClaims?.imageUrl || undefined,
                }
            });
        }
        context.user = {
            id: user.id,
            clerkId: user.clerkId,
            email: user.email,
            role: user.role,
        };
    }
    return context;
}
