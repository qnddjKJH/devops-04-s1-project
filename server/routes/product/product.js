let allProducts = [
    {
        "id" : 1,
        "brand" : "노브랜드",
        "name" : "물티슈",
        "price" : 1000,
        "category" : "잡화",
        "status" : "판매중"
    }, 
    {
        "id" : 2,
        "brand" : "엘지",
        "name" : "전기포트",
        "price" : 50000,
        "category" : "가전",
        "status" : "판매중"
    }, 
]

//module.exports = product;
module.exports = {
    readAll: async () =>{
        return allProducts;
    },
    readOne: async (id) => {
        const found = allProducts.filter(product => product.id === Number(id))[0];
        return found
    },
    createOne: async (body) => {
        const newProduct = {
            id: allProducts.length + 1,
            ...body
        }

        allProducts.push(newProduct)

        return newProduct;
    },
    // isValid: (body) => {
    //     const valid = validate(body);
    //     return valid
    //   }
}