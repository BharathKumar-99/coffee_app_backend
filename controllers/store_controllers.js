const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// module.exports.getAllProducts = async function getAllPosts(req) {
//     const products = await prisma.products.findMany({
//         skip: req.body.skip,
//         take: 10,
//         where: {
//             storeId: req.body.storeId
//         }
//     })
//     return products
// }


module.exports.addStore = async function addStore(req, res) {
    var reqest = req.body;
    const store = await prisma.store.create(
        {
            data: {
                name: reqest.name,
                longitude: reqest.longitude,
                latetude: reqest.latetude,
                rating: reqest.rating,
                phone: reqest.phone,
                email: reqest.email,
                address: reqest.address,
                showOutOfStock: true,
                isOnline: true
            }
        }
    )
    return store
}
