'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
	const client = await fastify.pg.connect()
	try {
		const { rows } = await client.query(
			'SELECT id, username, type FROM public.user'
		)

		const reponse = {
			"users": rows
		}
		reply
			.code(200)
			.send(reponse)
	} finally {
		client.release()
	}
  })
}
