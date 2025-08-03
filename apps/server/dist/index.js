"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const type_graphql_1 = require("type-graphql");
const client_1 = require("@prisma/client");
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
require("reflect-metadata");
const context_1 = require("./context");
const UserResolver_1 = require("./resolvers/UserResolver");
const TaskResolver_1 = require("./resolvers/TaskResolver");
const EventResolver_1 = require("./resolvers/EventResolver");
const ExpenseResolver_1 = require("./resolvers/ExpenseResolver");
const SiteSettingsResolver_1 = require("./resolvers/SiteSettingsResolver");
const prisma = new client_1.PrismaClient();
async function startServer() {
    // Vytvoření Express aplikace
    const app = (0, express_1.default)();
    // CORS konfigurace
    app.use((0, cors_1.default)({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    }));
    app.use(express_1.default.json());
    // Vytvoření GraphQL schématu
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [
            UserResolver_1.UserResolver,
            TaskResolver_1.TaskResolver,
            EventResolver_1.EventResolver,
            ExpenseResolver_1.ExpenseResolver,
            SiteSettingsResolver_1.SiteSettingsResolver,
        ],
        validate: false,
    });
    // Vytvoření Apollo Serveru
    const server = new server_1.ApolloServer({
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
    // Veřejné endpointy (bez autentizace)
    app.use('/graphql/public', (0, express4_1.expressMiddleware)(server, {
        context: async ({ req }) => (0, context_1.createContext)({ req, requireAuth: false }),
    }));
    // Chráněné endpointy (s autentizací)
    app.use('/graphql', (0, clerk_sdk_node_1.ClerkExpressRequireAuth)(), (0, express4_1.expressMiddleware)(server, {
        context: async ({ req }) => (0, context_1.createContext)({ req, requireAuth: true }),
    }));
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
