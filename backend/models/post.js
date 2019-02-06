const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    id:String,
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('post',postSchema)