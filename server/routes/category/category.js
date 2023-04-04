'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async (req, reply) => {
    const client = await fastify.pg.connect();
    try {
      const { rows } = await client.query(
        `SELECT column_name, udt_name, is_nullable FROM information_schema.columns WHERE table_name = 'category'`
      )
      
      reply.code(200).send(rows);
    } finally {
      client.release();
    }
  })
}

