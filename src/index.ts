import Fastify from 'fastify'

async function bootstrapp() {
    const fastify = Fastify({
        logger: true
    })

    fastify.get('/pools/count', (request, reply) => {
        return {
            count: 1234857
        }
    })

    await fastify.listen({ port: 3333 }, (err, address) => {
        if (err) throw err
    })
}

bootstrapp()