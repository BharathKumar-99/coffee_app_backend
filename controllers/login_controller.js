const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()
var jwt = require('jsonwebtoken')

module.exports.verifyLogin = async function verifyLogin(req) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        })
        return user
    } catch (error) {
        return error
    }
};

module.exports.createUser = async function createUser(req) {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        });
        return user;
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                return 'Email Already Exists Try Different Email Address';
            }
        }
        return JSON.stringify(e)
    }

}

module.exports.createToken = function createToken(user) {
    console.log(user);
    return jwt.sign(user, process.env.ACCESS_TOKEN,
        { expiresIn: '2592000s' });
}

module.exports.getUser = async function getUser(id) {
    console.log(id);
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: id
            }

        })
        console.log(user);
        return user;
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                return 'Email Already Exists Try Different Email Address';
            }
        }
        return JSON.stringify(e)
    }
}