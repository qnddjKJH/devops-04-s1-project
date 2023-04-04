'use strict'

module.exports =  async function getBasket(fastify, opts) {
  fastify.get('/', async function (req, res) {
    const getSchema = (
      {
        "baskets": [
          {
            "id": 1,
            "product": {
              "id": 1,
              "category": "잡화",
              "seller": "김코딩",
              "name": "물티슈",
              "price": 1000,
              "brand": "노브랜드",
              "status": "판매중"
            },
            "quantity": 1
          }
        ]
      }
    )
    return getSchema;
  })
}