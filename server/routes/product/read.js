'use strict'

const opts = {
    schema: {
      query: {
        type: 'object',
        properties: {
            name: {
                type: 'string'
            },
            brand: {
                type: 'string'
            },
            priceMin: {
                type: 'integer'
            },
            priceMax: {
                type: 'integer'
            },
            category: {
                type: 'integer'
            },
            status: {
                type: 'string'
            }
        },
      }
    }
  }

module.exports = async function (fastify, opts) {
    fastify.get('/', opts, async function (request, reply) {
        const query = Object.assign(request.query);
        let where = ''

        const {
            name,
            brand,
            priceMin,
            priceMax,
            category,
            status
        } = request.query

        if(name) {
            where += `AND product.name like '%${name}%'`
        }
        
        if(brand) {
            where += `AND product.brand = '${brand}'`
        }
        
        if(priceMax && priceMin) {
            where += `AND product.price >= ${priceMin} AND product.price <= ${priceMax}`
        }
        
        if(category) {
            where += `AND category.id = ${category}`
        }
        
        if(status) {
            where += `AND product.status = '${status}'`
        }


        const client = await fastify.pg.connect();
        try{
            const {rows} = await client.query(
                `SELECT product.id, brand, product.name, product.price, product.status, category.name AS category, username AS seller
                 FROM public.product 
                   INNER JOIN public.user ON  public.user.id = public.product.user_id
                   INNER JOIN public.category ON public.category.id = public.product.category_id
                 WHERE 1=1 ${where}`
            )

            const response = {
                "products" : rows
            }

            if(rows){
                reply
                    .code(200)
                    .header('Content-type','application/json')
                    .send(response)
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
                `SELECT product.id, brand, product.name, product.price, product.status, category.name AS category, username AS seller
                FROM public.product 
                  INNER JOIN public.user ON  public.user.id = public.product.user_id
                  INNER JOIN public.category ON public.category.id = public.product.category_id
                WHERE product.id = ${request.params.id}`
            )

            const response = {
                "product" : rows[0]
            }

            if(rows) {
                reply
                .code(200)
                .header('Content-type','application/json')
                .send(response)
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