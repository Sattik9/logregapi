
const jwt=require('jsonwebtoken');
const jwtuserverify=async(req,res,next)=>{
    const token=req.body.token||req.query.token||req.headers['x-access-token'];
    if(!token){
        return res.status(400).json({sucess:false,message:'token is absent!'})
    }
    else{
        try{
           const user=jwt.verify(token,process.env.SECRET_USER);
           req.user=user;
           next()
        }
        catch(error){
            return res.status(400).json({success:false,message:'invalid user token!'});
        }
    }
}

module.exports=jwtuserverify;