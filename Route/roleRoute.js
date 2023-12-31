const express=require('express');
const Route=express.Router();
const roleControll=require('../Controller/roleController');
const bannerimage=require("../Utility/bannerimage");
const userVerify=require("../MIddleware/userVerify");
Route.post('/register',bannerimage.single("image"),roleControll.regcreate);
Route.post('/login',roleControll.login);
Route.get('/confirmation/:email/:token',roleControll.confirmation);
Route.get('/userpanel',userVerify,roleControll.userpanel);
Route.get('/allusers',roleControll.alluser);
module.exports=Route;
