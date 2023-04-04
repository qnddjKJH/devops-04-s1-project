'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
	const client = await fastify.pg.connect()
	try {
		const { rows } = await client.query(
			`SELECT id, username, type FROM public.user WHERE id = ${request.params.id}`
		)
		const reponse = {
			"user": rows[0]
		}
		reply
			.code(200)
			.send(reponse)
	} finally {
		client.release()
	}
  })
}
