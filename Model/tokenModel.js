const mongoose=require('mongoose');
const schema=mongoose.Schema;

const tokenSchema=new schema({
    _userId:{
        type:schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    token:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        default:Date.now(),
        index:{
            expires:864000
        }
    }
})

const tokenModel=mongoose.model('token',tokenSchema);
module.exports=tokenModel;