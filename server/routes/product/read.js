'use strict'

module.exports = async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {
        const client = await fastify.pg.connect();
        try{
            const {rows} = await client.query(
                `SELECT product.id,brand,product.name,price,category.name,status FROM product JOIN "user" ON product.user_id = "user".id JOIN category ON product.category_id = category.id`
            )

            if(rows){
                reply
                    .code(200)
                    .header('Content-type','application/json')
                    .send(rows)
            }else{
                reply
                    .code(404)
                    .header('Content-type','text/plain')
                    .send('Not Found')
            }
        }finally {
            client.release();
        }
    })


    fastify.get('/:id', async function (request, reply) {
        const client = await fastify.pg.connect();
        try{
            const {rows} = await client.query(
                `SELECT product.id,brand,product.name,price,category.name,status FROM product JOIN "user" ON product.user_id = "user".id JOIN category ON product.category_id = category.id WHERE product.id = ${request.params.id}`
            )

            if(rows) {
                reply
                .code(200)
                .header('Content-type','application/json')
                .send(rows)
            }
            else {
                reply
                .code(404)
                .header('Content-type','text/plain')
                .send('Not Found')
            }
        }finally {
            client.release();
        }
    })
}