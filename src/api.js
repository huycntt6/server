const express = require('express');
const app = express();
const mongoose = require('mongoose');

const serverless = require("serverless-http");


//connect to DB
mongoose.connect("mongodb+srv://giahuy:0r000fNFa26eZTtI@realmcluster.getas.mongodb.net/reactjs?retryWrites=true&w=majority",
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
    res.header("Access-Control-Allow-Origin", "https://modest-golick-6cc850.netlify.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/.netlify/functions/api/user', authRoute);
app.use('/.netlify/functions/api/posts', postRoute);
//app.listen(port, ()=> console.log('Server đang hoạt động! port => ' + port));

module.exports = app;
module.exports.handler = serverless(app);