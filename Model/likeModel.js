const mongoose=require('mongoose');
const schema=mongoose.Schema;

const likeSchema=new schema({
    like:{
        type:Boolean,
        default:0
    },
    blog:{
        type:schema.Types.ObjectId,
        ref:'blog'
    },
    user:{
        type:schema.Types.ObjectId,
        ref:'user'
    }
},{
    timestamps:true
});

const likeModel=mongoose.model('like',likeSchema);
module.exports=likeModel;