const mongoose=require('mongoose');
const schema=mongoose.Schema;

const categorySchema=new schema({
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
    rooms:[{
        type:schema.Types.ObjectId,
        ref:"room"
    }],
    image:{
        type:String
    }
},{
    timestamps:true
});

const categoryModel=mongoose.model('category',categorySchema);
module.exports=categoryModel;