const express = require('express');
var jwt = require('jsonwebtoken')
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser')
var productsCtrl = require('./../controllers/product_controller');
app.use(bodyParser.json())
var authenticateToken = require('./../middleware/auth')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/getallproducts', async function (req, res) {
    const products = await productsCtrl.getAllProducts(req)
    res.json(products);
});

app.post('/addproducts', async function (req, res) {
    const products = await productsCtrl.addproducts(req)
    res.json(products);
});
module.exports = app;