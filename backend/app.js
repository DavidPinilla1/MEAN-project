const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
const app = express();

mongoose.connect('mongodb+srv://Metroid_300:7WQdm1J5nT70MmfU@cluster0-k37ax.mongodb.net/mean?retryWrites=true',{ useNewUrlParser: true })
    .then(()=>console.log('Connected to database')).catch(()=>console.log('Connection failed!:('))

const Post=require('./models/post');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
     "GET, POST, PATCH, DELETE, OPTIONS");
    next();
  });
app.post('/api/posts', (req,res,next)=>{
    const post=new Post({
        title:req.body.title,
        content:req.body.content
    })
    post.save().then(doc=>res.status(201).json({
        message:'Post added',
        postId:doc._id
    }));
    
});
app.get('/api/posts',(req, res) => {
    Post.find()
    .then(doc=>
        res.status(200).json({message:'posts from the server',posts:doc}));
})
app.delete('/api/posts/:id',(req,res)=>{
    Post.deleteOne({_id:req.params.id}).then(res=>console.log('deleted'))
    res.status(200).json({message:'post deleted'})
    
})
module.exports = app;