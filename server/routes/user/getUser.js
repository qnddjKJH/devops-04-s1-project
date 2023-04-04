'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
	const client = await fastify.pg.connect()
	try {
		const { rows } = await client.query(
			`SELECT * FROM public.user WHERE id = ${request.params.id}`
		)
		reply
			.code(200)
			.send(rows)
	} finally {
		client.release()
	}
  })
}
