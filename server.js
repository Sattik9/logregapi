const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();
const roleRouter=require("./Route/roleRoute");
const app=express();

//***bodyparser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//***cors */
app.use(cors());

//***routers */
app.use('/api',roleRouter);

app.use('/uploads',express.static('uploads'));

//***mongoose */
const port=process.env.PORT;
const dbDriver=process.env.MONGO_URL;
mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    app.listen(port,()=>{
        console.log('db is connected!');
        console.log(`server is running at http://localhost:${port}`);
    })
})
.catch(()=>{
    console.log('error');
})