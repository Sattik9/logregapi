const mongoose=require('mongoose');
const schema=mongoose.Schema;

const userSchema=new schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    
    password:{
        type:String
    },
    image:{
         type:String
    },
    answer:{
        type:String
    },
    bookings:[{
            type:mongoose.Types.ObjectId,
            ref:"booking"
    }],
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:"blog"
    }],
    isAdmin:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const userModel=mongoose.model('user',userSchema);
module.exports=userModel;