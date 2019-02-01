const express=require('express');
const router=express.Router();

const Post=require('../models/post');

router.post('', (req,res,next)=>{
    const post=new Post({
        title:req.body.title,
        content:req.body.content
    })
    post.save().then(doc=>res.status(201).json({
        message:'Post added',
        postId:doc._id
    }));
    
});
router.put('/:id',(req,res,next)=>{
    const post=new Post({
        _id:req.body.id,
        title:req.body.title,
        content:req.body.content
    })
    Post.updateOne({_id: req.params.id},post).then((err,doc)=>{
        if(err) console.log(err)
        res.status(200).json(doc)
    })
})
router.get('',(req, res) => {
    Post.find()
    .then(doc=>
        res.status(200).json({message:'posts from the server',posts:doc}));
})

router.get('/:id',(req,res,next)=>{
    Post.findById(req.params.id).then(post=>{
        if(post){
            res.status(200).json(post);
        }else{
            res.status(400).json({message:'Post not found'});
        }
    })
})

router.delete('/:id',(req,res)=>{
    Post.deleteOne({_id:req.params.id}).then(res=>console.log('deleted'))
    res.status(200).json({message:'post deleted'})
    
})
module.exports=router