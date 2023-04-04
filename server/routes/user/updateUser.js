'use strict'

module.exports = async function (fastify, opts) {
  fastify.patch('/:id', async function (request, reply) {
    const username = request.body.username
    const type = request.body.type

	const client = await fastify.pg.connect()
	try {
		const { rows } = await client.query(
			`UPDATE public.user SET username = $1, type = $2 WHERE id = ${request.params.id} RETURNING id, username, type`,
            [username, type]
		)

		const reponse = {
			"users": rows[0],
            "message": "정상 수정 되었습니다."
		}
		reply
			.code(201)
			.send(reponse)
	} finally {
		client.release()
	}
  })
}