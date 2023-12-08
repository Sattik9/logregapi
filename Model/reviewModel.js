const mongoose=require('mongoose');
const schema=mongoose.Schema;

const reviewSchema = new schema({
      name: { 
        type:schema.Types.ObjectId,
        ref:'room'
    },
      rating: { 
        type: Number
      },
      comment: { 
        type: String
     },
      user: {
       type: schema.Types.ObjectId,
       ref: 'user',
       },
     },
    {
      timestamps: true,
    })

const reviewModel=mongoose.model('review',reviewSchema);
module.exports=reviewModel;