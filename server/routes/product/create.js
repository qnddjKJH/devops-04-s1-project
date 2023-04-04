'use strict'

module.exports = async function (fastify, opts) {
    fastify.post('/', async function (request, reply) {
        const client = await fastify.pg.connect();
        try{
            const {status,name,price,brand,category_id,user_id} = request.body

            const {rows} = await client.query(
                `INSERT INTO product (status,name,price,brand,category_id,user_id) VALUES ($1,$2,$3,$4,$5,$6)`,[status,name,price,brand,category_id,user_id]
            )

            if(rows) {
                reply
                .code(200)
                .header('Content-type','application/json')
                .send(rows)
            }
        }finally {
            client.release();
        }
    })
}