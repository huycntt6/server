//import dotenv
require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;

const serverless = require("serverless-http");


//connect to DB
mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
)
.then(()=>console.log('Đã kết nối DB!'))
.catch(err=>console.log('Lỗi Kết nối DB!')
);


//import Routes
const authRoute = require('../routes/auth');
//postroutes
const postRoute = require('../routes/posts');

//Middlewares
 
app.use(express.json());

//Route Middlewares
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
//app.listen(port, ()=> console.log('Server đang hoạt động! port => ' + port));

module.exports = app;
module.exports.handler = serverless(app);