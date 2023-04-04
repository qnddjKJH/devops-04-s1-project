'use strict'

const { readAll, readOne } = require('./product')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    
    let result = await readAll()

    if(result){
        reply
            .code(200)
            .header('Content-type','application/json')
            .send(result)
    }else{
        reply
            .code(404)
            .header('Content-type','text/plain')
            .send('Not Found')
    }
  })

  fastify.get('/:id', async function (request, reply) {
    
    let result = await readOne(request.params.id)

    if(result) {
      reply
        .code(200)
        .header('Content-type','application/json')
        .send(result)
    }
    else {
      reply
        .code(404)
        .header('Content-type','text/plain')
        .send('Not Found')
    }
  })
}
