const express = require('express');
const multer = require('multer');
const Post = require('../models/post');

const router = express.Router();

const TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',

}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = TYPE_MAP[file.mimetype];
        let error = new Error('Invalid type');
        if (isValid) {
            error = null;
        }
        cb(error, 'backend/images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext)
    }
});
router.post('', multer({ storage: storage }).single('image'), (req, res, next) => {
    const url= req.protocol +'://'+req.get('host');
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url+ '/images/'+req.file.filename
    })
    post.save().then(doc => res.status(201).json({
        message: 'Post added',
        post:{
            id:doc._id,
            title:doc.title,
            content:doc.content,
            imagePath:doc.imagePath
        }
    }));
});
router.put('/:id', (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    })
    Post.updateOne({ _id: req.params.id }, post).then((doc) => {
        res.status(200).json(doc)
    })
})
router.get('', (req, res) => {
    Post.find()
        .then(doc =>
            res.status(200).json({ message: 'posts from the server', posts: doc }));
})
router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(400).json({ message: 'Post not found' });
        }
    })
})
router.delete('/:id', (req, res) => {
    Post.deleteOne({ _id: req.params.id }).then(res=>console.log('deleted post with id: '+req.params.id))
    res.status(200).json({ message: 'post deleted' })

})
module.exports = router