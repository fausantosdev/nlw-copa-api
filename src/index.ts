import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query']
})

async function bootstrapp() {
    const fastify = Fastify({
        logger: true
    })

    fastify.get('/pools/count', async (request, reply) => {
        
        const count = await prisma.pool.count()
        
        return {
            count
        }
    })

    await fastify.listen({ port: 3333 }, (err, address) => {
        if (err) throw err
    })
}

bootstrapp()