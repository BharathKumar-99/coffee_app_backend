const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.getAllProducts = async function getAllPosts(req) {
    const products = await prisma.products.findMany({
        skip: req.body.skip,
        take: 10,
        where: {
            storeId: {
                equals: req.body.storeId
            }
        }
    })
    return products
}

module.exports.getProductsById = async function getPostById(id) {
    const products = await prisma.products.findUnique({
        where: {
            id
        }
    })
    return products
}

module.exports.addproducts = async function addproducts(req, res) {
    var reqest = req.body;
    const products = await prisma.products.create(
        {
            data: {
                name: reqest.name,
                pic: reqest.pic,
                storeId: reqest.storeId,
                price: reqest.price,
                discount: reqest.discount,
                quantity: reqest.quantity,
                isOnlineSale: true,
            }
        }
    )
    return products
}






