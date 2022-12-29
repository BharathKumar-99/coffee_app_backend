const express = require('express');
var jwt = require('jsonwebtoken')
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser')
var loginctl = require('./../controllers/login_controller');
app.use(bodyParser.json())
var authenticateToken = require('./../middleware/auth')
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/login', async (req, res) => {
    var user = await loginctl.verifyLogin(req)
    console.log(user)
    if (user) {
        const token = loginctl.createToken(user);
        res.json(
            {
                token: token,
                user: user,
                error: null
            }
        );
    } else {
        res.json(
            {
                error: 'Email Or Password Invalid',
            }
        )
    }
})

app.post('/signup', async (req, res) => {
    const user = await loginctl.createUser(req);
    if (user != null && user['name'] != null) {
        const token = loginctl.createToken(user);
        res.json({
            user: user
        });
    } else {
        res.json({
            "error": user
        })
    }
})

app.get('/refresh', authenticateToken, (req, res) => {

    const token = jwt.sign({ user }, process.env.ACCESS_TOKEN,
        { expiresIn: '2592000s' });
    res.json({
        "status ": "login",
        token: token
    })
})

app.get('/getUser', authenticateToken, async (req, res) => {
    console.log(req.user);
    const user = await loginctl.getUser(req.user.id);
    if (user != null && user['name'] != null) {

        res.json({
            user: user
        });
    } else {
        res.json({
            "error": user
        })
    }
})

module.exports = app;