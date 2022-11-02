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

    const port = parseInt(`${process.env.PORT}`) || 3333
    const host = process.env.HOST || '0.0.0.0'

    await fastify.listen({ port , host }, (err, address) => {
        if (err) throw err
    })
}

bootstrapp()