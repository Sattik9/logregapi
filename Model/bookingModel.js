const mongoose=require('mongoose')

const schema=mongoose.Schema;

const bookingSchema=new schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    checkin:{
        type:Date
    },
    checkout:{
        type:Date
    },
    room:{
    type:schema.Types.ObjectId,
    ref:"room"
    },
    userid:{
     type:schema.Types.ObjectId,
    ref:"user"
    },
    request:{
       type:String
    },
    isPending:{
        type:Boolean,
        default:true
   }
},{
    timestamps:true
})

const bookingModel=mongoose.model('booking',bookingSchema);
module.exports=bookingModel;