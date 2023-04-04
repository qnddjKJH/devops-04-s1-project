'use strict'

class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

module.exports = async function (fastify, opts) {
  fastify.get('/', async (req, reply) => {
    const client = await fastify.pg.connect();
    console.log(req.headers.userid);
    try {
      const { rows } = await client.query(
        `SELECT id, name FROM public.category`
      )

      const response = {
        "categories" : rows
      }
      
      reply.code(200).send(response);
    } finally {
      client.release();
    }
  }),

  fastify.post('/', async (req, reply) => {
    const body = req.body;
    const category_name = body.name;

    const client = await fastify.pg.connect();
    try {
        const { rows } = await client.query(
            'INSERT INTO public.category(name) VALUES($1) RETURNING id, name',
            [category_name]
        );

        const category = new Category(rows[0].id, rows[0].name);

        const response = {
            "category" : category,
            "message" : "정상 등록되었습니다."
        }
        
        reply.code(201).send(response)
    } finally {
        client.release();
    }
  })

  fastify.delete('/', async (req, reply) => {
    const category_id = req.body.category_id;

    const client = await fastify.pg.connect();
    try {
        const { rows } = await client.query(
            'DELETE FROM public.category WHERE id = $1',
            [category_id]
        );

        const response = {
            "status" : "success",
            "message" : "정상 삭제되었습니다."
        }
        
        reply.code(200).send(response)
    } finally {
        client.release();
    }
  })
}
