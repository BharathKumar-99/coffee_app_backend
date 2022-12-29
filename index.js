var express = require('express');
var app = express();
require('dotenv').config()
app.use(express.json());

//default Port
app.get('/', function (req, res) {
   res.send('Server Up');
})


//api routes
app.use('/api', require('./apis/authenticationApi'));
app.use('/api', require('./apis/postsApi'));
app.use('/api', require('./apis/products'));
app.use('/api', require('./apis/storeApi'));


var server = app.listen(parseInt(process.env.PORT) || 3000, function () {
   console.log("Example app listening at " + process.env.PORT)
})