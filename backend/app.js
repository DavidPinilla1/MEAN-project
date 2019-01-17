const express = require('express');
const bodyParser=require('body-parser');
const app = express();

const post=require('./models/post')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//7WQdm1J5nT70MmfU  //password Metroid_300
app.post('/api/posts', (req,res,next)=>{
    const posts=req.body;
    console.log(posts);
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