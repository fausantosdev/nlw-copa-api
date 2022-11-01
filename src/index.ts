import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'

const prisma = new PrismaClient({
    log: ['query']
})

async function bootstrapp() {
    const fastify = Fastify({
        logger: true
    })

    await fastify.register(cors, {
        origin: true
    })

    fastify.get('/pools/count', async (request, reply) => {
        
        const count = await prisma.pool.count()
        
        return {
            count
        }
    })

    await fastify.listen({ port: 3333, host: process.env.HOST }, (err, address) => {
        if (err) throw err
    })
}

bootstrapp()