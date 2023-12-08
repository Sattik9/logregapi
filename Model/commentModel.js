const mongoose=require('mongoose')

const schema=mongoose.Schema;

const commentSchema=new schema({
    review:{
        type:String
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    blog:{
        type:mongoose.Types.ObjectId,
        ref:'blog'
    }
})

const commentModel=mongoose.model('comment',commentSchema);
module.exports=commentModel;