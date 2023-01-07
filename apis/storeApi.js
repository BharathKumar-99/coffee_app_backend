const express = require('express');
var jwt = require('jsonwebtoken')
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser')
var storeCtrl = require('./../controllers/store_controllers');
app.use(bodyParser.json())
var authenticateToken = require('./../middleware/auth')
app.use(bodyParser.urlencoded({ extended: false }))



app.post('/addstore', async function (req, res) {
    const products = await storeCtrl.addStore(req)
    res.json(products);
});

app.get('/getonestore', async function (req, res) {
    const store = await storeCtrl.getStore(req.query.id)
    if (store == null) {
        res.json({ 'message': 'Store not found' })
    } else {
        res.json({
            'Data': {
                store
            }
        })
    }
});
module.exports = app;