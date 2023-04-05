'use strict'

module.exports = async function (fastify, opts) {
    fastify.post('/', async function (request, reply) {
        const client = await fastify.pg.connect();
        try{
            const {
                name,
                price,
                brand,
                category_id,
                user_id
            } = request.body

            const check = await client.query(
                `SELECT type FROM public.user WHERE id = $1`, [user_id]
            )

            if(check.rows[0].type != '판매자') {
                reply.code(403).send('판매자가 아닙니다.')
            }

            const { rows } = await client.query(
                `INSERT INTO product (status, name, price, brand, category_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, ['판매중', name, price, brand, category_id, user_id]
            )

            const response = {
                "product" : rows[0]
            }


            if(rows[0]) {
                reply
                .code(200)
                .header('Content-type','application/json')
                .send(response)
            }
        }finally {
            client.release();
        }
    })
}