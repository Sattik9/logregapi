const userModel=require("../Model/userModel");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const tokenModel=require('../Model/tokenModel')
const nodemailer=require('nodemailer');
const crypto=require('crypto');
const regcreate=async(req,res)=>{
    try{
       const User=new userModel({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        image:req.file.path,
        password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(12)),
        answer:req.body.answer
       })
       const data=await userModel.findOne({email:req.body.email});
       if(!req.body.name||!req.body.email||!req.body.phone||!req.body.password||!req.body.answer){
        return res.status(400).json({
            success:false,
            message:"all fields are required!"
        })
       }else{
          if(data){
            return res.status(400).json({
                success:false,
                message:"user already exists!"
            })
          }else{
            User.save()
            .then((user)=>{
                console.log(user._id);
               const Token=new tokenModel({
                _userId:user._id,
                token:crypto.randomBytes(16).toString('hex')
               })
               Token.save()
               .then((token)=>{
                const transPorter=nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth:{
                         user:"sttksarkar5261@gmail.com",
                         pass:"pgfhifvnazrlkbiq",
                        }
                })
                const mailOptions={
                    from: 'no-reply@sattik.com',
                    to: user.email,
                    subject: 'Account Verification',
                    text: 'Hello ' + req.body.name + ',\n\n' + 'Please verify your account by clicking the link:'+`https://logregapi-fcmq.onrender.com/api/confirmation/${user.email}/${token.token}` 
                }
                transPorter.sendMail(mailOptions);
                return res.status(200).json({
                    success:true,
                    message:"verification link sent!",
                    data:user
                })
               })
               .catch((error)=>{
                return res.status(400).json({
                    success:false,
                    message:"token save error!"
                })
               })
            })
            .catch((error)=>{
                return res.status(400).json({
                    success:false,
                    message:error
                })
            })
          }
       }
    }
    catch(error){
        console.log(error);
         return res.status(400).json({
            success:false,
            message:"error"
         })
    }
}


const confirmation=async(req,res)=>{
    try{
      const token=await tokenModel.findOne({token:req.params.token});
      if(token){
         userModel.findOne({_id:token._userId,email:req.params.email})
         .then((user)=>{
            if(!user){
                return res.status(400).json({
                    success:false,
                    message:"user doesnt exist!"
                })
            }else{
                if(user.isVerified==true){
                    return res.status(400).json({
                        success:false,
                        message:"user is already verified!"
                    })
                }else{
                    user.isVerified=true;
                    user.save();
                    return res.status(200).json({
                        success:true,
                        message:"user is verified!"
                    })
                }
            }
         })
      }else{
        return res.status(400).json({
            success:false,
            message:"token is not found!"
        })
      }
      
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"error!"
        })
    }
}


const login=async(req,res)=>{
    try{
        const data=await userModel.findOne({email:req.body.email});
      const email=req.body.email;
      const password=req.body.password;
      if(!email||!password){
         return res.status(400).json({message:"all fields are mandatory!"});
      }
      else{
        if(data){
          if(data.isAdmin==false && data.isVerified==true){
            const pwd=data.password;
            if(bcrypt.compareSync(req.body.password,pwd)){
               const token=jwt.sign({
                id:data._id,
                name:data.name,
                email:data.email,
                phone:data.phone,
                image:data.image,
                answer:data.answer
               },process.env.SECRET_USER,{expiresIn:"1d"});
               return res.status(200).json({success:true,message:"login is successful!",token,user:data});
            }
            else{
              return res.status(400).json({success:false,message:"password is wrong"});
            }
          }else{
            return res.status(400).json({success:false,message:"individual is not a user! or individual is not verified!"});
          }
        }
        else{
          return res.status(400).json({success:true,message:"user doesnt exist!"})
        }
      } 

    }catch(error){
        console.log(error);
        return res.status(400).json({success:false,message:"error!"})
    }
}

const userpanel=async(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"welcome user!"
    })
}

const alluser=async(req,res)=>{
    try{
        const allUser=await userModel.find();
        return res.status(200).json({
            success:true,
            message:"data fetched!",
            users:allUser
        })
    }catch(error){
          return res.status(400).json({
            success:false,
            message:"error!"
          })
    }
}

// const adminlogin=async(req,res)=>{
//     const admin=await userModel.findOne({email:req.body.email});
//     const emails=req.body.email;
//     const pwd=req.body.password;
//     if(!emails||!pwd){
//         return res.status(400).json({message:'all fields are required!'})
//     }
//     else{
//         if(admin){
//             if(admin.isAdmin=="admin"){
//                const pwd=admin.password;
//                if(bcrypt.compareSync(req.body.password,pwd)){
//                   const adminToken=jwt.sign({
//                     id:admin._id,
//                     name:admin.name,
//                     email:admin.email
//                   },process.env.SECRET_ADMIN,{expiresIn:process.env.DUR});
//                   return res.status(200).json(
//                     {success:true,
//                     adminToken,
//                     data:admin});
//                }
//                else{
//                 return res.status(400).json({success:false,message:'password is wrong'});
//                }
//             }
//             else{
//                 return res.status(400).json({success:false,message:'individual is not a admin'});
//             }
//         }
//         else{
//             return res.status(400).json({success:true,message:"user doesn't exist!"})
//         }
//     }

   
// }

// const superadminlogin=async(req,res)=>{
//     const superAdmin=await userModel.findOne({email:req.body.email});
//     const emails=req.body.email;
//     const pwd=req.body.password;
//     if(!emails||!pwd){
//         return res.status(400).json({message:'all fields are required!'})
//     }
//     else{
//         if(superAdmin){
//             if(superAdmin.isAdmin=="superAdmin"){
//                const pwd=superAdmin.password;
//                if(bcrypt.compareSync(req.body.password,pwd)){
//                   const superadminToken=jwt.sign({
//                     id:superAdmin._id,
//                     name:superAdmin.name,
//                     email:superAdmin.email
//                   },process.env.SECRET_SUPER,{expiresIn:process.env.DUR});
//                   return res.status(200).json(
//                     {success:true,
//                     superadminToken,
//                     data:superAdmin});
//                }
//                else{
//                 return res.status(400).json({success:false,message:'password is wrong'});
//                }
//             }
//             else{
//                 return res.status(400).json({success:false,message:'individual is not a superadmin'});
//             }
//         }
//         else{
//             return res.status(400).json({success:true,message:"user doesn't exist!"})
//         }
//     }
   
// }


// const userdashboard=async(req,res)=>{
//     return res.status(200).json({message:'welcome user!'});
// }

// const admindashboard=async(req,res)=>{
//     return res.status(200).json({message:'welcome admin!'});
// }
// const superadmindashboard=async(req,res)=>{
//     return res.status(200).json({message:'welcome super admin!'});
// }

// const userBlock=async(req,res)=>{
    
//     try{
//         const id=req.params.id;
//         const block=await userModel.findByIdAndUpdate(id,{isBlock:true},{new:true});
//         return res.status(200).json({message:"user is blocked!"});

//     }
//     catch(error){
//         return res.status(200).json({message:"error!"});
//     }
    
// }

// const userUnblock=async(req,res)=>{
//     try{
//         const id=req.params.id;
//         const unblock=await userModel.findByIdAndUpdate(id,{isBlock:false},{new:true});

//         return res.status(200).json({message:"user is unblocked!"});

//     }
//     catch(error){
//         return res.status(200).json({message:"error!"});
//     }
// }
module.exports={
    
    login,
    regcreate,
    confirmation,
    userpanel,
    alluser
    
}