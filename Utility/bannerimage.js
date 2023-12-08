const multer=require('multer');

const storages=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})

const bannerImage=multer({
    storage:storages,
    fileFilter:function(req,file,cb){
        if(file.mimetype=='image/jpg' || file.mimetype=='image/png' || file.mimetype=='image/jpeg'){
            cb(null,true)
        }
        else{
            cb(null,false)
        }
    }
})

module.exports=bannerImage;