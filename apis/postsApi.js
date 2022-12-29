const express = require('express');
var jwt = require('jsonwebtoken')
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser')
var postctl = require('./../controllers/post_controller');
app.use(bodyParser.json())
var authenticateToken = require('./../middleware/auth')
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/getallposts', async function (req, res) {
    const posts = await postctl.getAllPosts(req)
    res.json(posts);
});

app.post('/addpost', authenticateToken, async function (req, res) {
    const post = await postctl.addPost(req)
    res.json(post);
});

module.exports = app;