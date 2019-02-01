const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
const postsRoutes=require('./routes/posts')
const app = express();
mongoose.connect('mongodb+srv://Metroid_300:7WQdm1J5nT70MmfU@cluster0-k37ax.mongodb.net/mean?retryWrites=true',{ useNewUrlParser: true })
    .then(()=>console.log('Connected to database')).catch(()=>console.log('Connection failed!:('))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
     "GET, POST, PATCH,PUT, DELETE, OPTIONS");
    next();
  });

  app.use('/api/posts',postsRoutes);

module.exports = app;