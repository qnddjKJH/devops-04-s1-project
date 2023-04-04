'use strict'

module.exports = async function (fastify, opts) {
  fastify.delete('/', async function (request, reply) {
	const client = await fastify.pg.connect()
	try {
		const { rows } = await client.query(
			`DELETE FROM public.user WHERE id = ${request.body.id}`
		)
		const reponse = {
            "status" : "success",
            "message" : "delete ok"
		}
		reply
			.code(200)
			.send(reponse)
	} finally {
		client.release()
	}
  })
}