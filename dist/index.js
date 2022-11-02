"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("@fastify/cors"));
const prisma = new client_1.PrismaClient({
    log: ['query']
});
async function bootstrapp() {
    const fastify = (0, fastify_1.default)({
        logger: true
    });
    await fastify.register(cors_1.default, {
        origin: true
    });
    fastify.get('/pools/count', async (request, reply) => {
        const count = await prisma.pool.count();
        return {
            count
        };
    });
    const port = parseInt(`${process.env.PORT}`) || 3333;
    const host = process.env.HOST || '0.0.0.0';
    await fastify.listen({ port, host }, (err, address) => {
        if (err)
            throw err;
    });
}
bootstrapp();
