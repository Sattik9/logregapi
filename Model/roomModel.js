const mongoose=require('mongoose');
const schema=mongoose.Schema;

const roomSchema=new schema({
    name:{
        type:String
    },
    bed:{
        type:Number
    },
    bath:{
        type:Number
    },
    wifi:{
        type:String,
        default:"yes"
    },
    description:{
        type:String
    },
    categoryid:{
        type:schema.Types.ObjectId,
        ref:"category"
    },
    reviews:[{
        type:schema.Types.ObjectId,
        ref:"review"
    }],
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    image:{
        type:String
    }
},{
    timestamps:true
});

const roomModel=mongoose.model('room',roomSchema);
module.exports=roomModel;