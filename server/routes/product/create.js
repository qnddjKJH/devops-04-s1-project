'use strict'

//const { createOne, isValid } = require('./product')
const { createOne } = require('./product')

module.exports = async function (fastify, opts) {
  fastify.post('/', async function (request, reply) {
    // if(!isValid(request.body)) {
    //   reply
    //     .code(400)
    //     .header('Content-type','text/plain')
    //     .send('Bad Request')
    // }

    const result = await createOne(request.body)
    
    reply
      .code(200)
      .header('Content-type','application/json')
      .send(result)
  })
}