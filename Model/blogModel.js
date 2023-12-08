const mongoose=require('mongoose')

const schema=mongoose.Schema;

const blogSchema=new schema({
    title:{
        type:String
    },
    subtitle:{
        type:String
    },
    content:{
        type:String
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    image:{
        type:String
    },
    comments:[{
        type:mongoose.Types.ObjectId,
        ref:"comment"
    }],
    isActivate:{
        type:Boolean,
        default:true
    },
    likes:[{
        type:schema.Types.ObjectId,
        ref:"like"
    }]
})

const blogModel=mongoose.model('blog',blogSchema);
module.exports=blogModel;