const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
const app = express();

mongoose.connect('mongodb+srv://Metroid_300:7WQdm1J5nT70MmfU@cluster0-k37ax.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true })
    .then(()=>console.log('Connected to database')).catch(()=>console.log('Connection failed!:('))

const Post=require('./models/post');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.post('/api/posts', (req,res,next)=>{
    const post=new Post({
        title:req.body.title,
        content:req.body.content
    })
    console.log(post)
    res.status(201).json({
        message:'Post added'
    })
});
app.get('/api/posts',(req, res, next) => {
    const posts=[
        {id:'sa4d80',
        title:'titulo',
        content:'contenido prueba'},
        {id:'dsa849',
        title:'segundo',
        content:'segundo contenido prueba'}
        
    ]
    res.status(200).json({message:'posts from the server',posts:posts})
})
module.exports = app;