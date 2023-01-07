const { PrismaClient, Prisma } = require('@prisma/client')
const internal = require('stream')
const prisma = new PrismaClient()

module.exports.getAllProducts = async function getAllPosts(req) {
    try {
        const products = await prisma.products.findMany({
            skip: req.body.skip,
            take: 10,
            where: {
                storeId: {
                    equals: req.body.storeId
                }
            }, include: {
                store: true,
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

        return e
    }

}

module.exports.getProductsById = async function getPostById(id) {
    console.log(id);
    try {
        const products = await prisma.products.findUnique({
            where: {
                pid: parseInt(id),
            },
            include: {
                store: true
            }
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

module.exports.addproducts = async function addproducts(req, res) {
    var reqest = req.body;
    try {
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
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                )
            }
        }

        return e
    }

}

module.exports.delete = async function deleteProduct(req, res) {
    try {
        const deletedproduct = await prisma.products.delete({
            where: {
                pid: req.body.id,
            },
        });
        return {
            "message": "Product deleted successfully"
        }

    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            console.log("product not found");
        } else console.error(error);
        return error
    }
}






