'use strict'

module.exports = async function (fastify, opts) {
  fastify.post('/', async function (request, reply) {
    const username = request.body.username
    const type = request.body.type

	const client = await fastify.pg.connect()
	try {
		const { rows } = await client.query(
			'INSERT INTO public.user (username, type) VALUES ($1, $2) RETURNING id, username, type', [username, type]
		)

		const reponse = {
			"users": rows[0],
            "message": "정상 등록 되었습니다."
		}
		reply
			.code(201)
			.send(reponse)
	} finally {
		client.release()
	}
  })
}