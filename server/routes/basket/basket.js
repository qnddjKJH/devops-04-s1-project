'use strict'

module.exports =  async function getBasket(fastify, opts) {
  fastify.get('/', async function (request, reply) {
    console.log(request.headers.userid);
    const client = await fastify.pg.connect()
    try {
      const { rows } = await client.query(
        `SELECT public.basket.id, public.user.username, public.product.brand, public.product.name, public.product.price, public.category.name, public.basket.quantity
          FROM public.basket
          INNER JOIN public.user ON public.basket.user_id = public.user.id
          INNER JOIN public.product ON public.basket.product_id = public.product.id
          INNER JOIN public.category ON public.product.category_id = public.category.id
        WHERE public.basket.user_id = $1`,
        [request.headers.userid]
        )
        reply.code(200).send(rows)
        } finally {
          client.release()
        }
      }
    ),
  
  fastify.post('/', async function (request, reply) {
    const user_id = request.body.user_id
    const product_id = request.body.product_id
    const quantity = request.body.quantity
    const client = await fastify.pg.connect()
    try {
      const { rows } = await client.query(
        'INSERT INTO public.basket(user_id, product_id, quantity) VALUES($1, $2, $3)', [user_id, product_id, quantity]
      )
      reply.code(201).send(rows)
    } finally {
      client.release()
    }
  }),

  fastify.patch('/:id', async function (request, reply) {
    const quantity = request.body.quantity
    const client = await fastify.pg.connect()
    try{
      const { rows } = await client.query(
        'UPDATE public.basket SET quantity = $1 WHERE id = $2', [quantity, request.params.id]
      )
      reply.code(200).send(rows)
    } finally {
      client.release()
    }
  }),

  fastify.delete('/', async function (request, reply) {
    const client = await fastify.pg.connect()
    try{
      const { rows } = await client.query(
        'DELETE FROM public.basket WHERE id = $1', [request.body.id]
      )
      reply.code(200).send(rows)
    } finally {
      client.release()
    }
  })
}

