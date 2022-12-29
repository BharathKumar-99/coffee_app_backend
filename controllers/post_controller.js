const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.getAllPosts = async function getAllPosts(req) {
    const posts = await prisma.post.findMany({
        skip: req.body.skip,
        take: 10,

    })
    return posts
}

module.exports.getPostById = async function getPostById(id) {
    const post = await prisma.post.findUnique({
        where: {
            id
        }
    })
    return post
}

module.exports.addPost = async function addPost(req, res) {
    const post = await prisma.user.update({
        where: {
            email: req.body.email
        },
        data: {
            posts: {
                create: {
                    title: req.body.title,
                    description: req.body.description,
                    name: req.body.name,
                    likes: 0,
                    comments: 0
                }
            }
        },
    });
    return post
}