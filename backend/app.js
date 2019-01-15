const express = require('express');

const app = express();

app.use('/api/posts',(req, res, next) => {
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