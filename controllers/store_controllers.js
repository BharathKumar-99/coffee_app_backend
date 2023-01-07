const { PrismaClient, Prisma } = require('@prisma/client')
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

module.exports.getStore = async function getStoreById(id) {
    try {
        const products = await prisma.store.findUnique({
            where: {
                id: parseInt(id),
            },

        })
        return products
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                )
            }
        }
        console.log(e);
        return e
    }
}
