// how to know if file exist or not in nodejs
require('dotenv').config();
const express = require('express')
const multer  = require('multer')
const path =require("path")
const mongoose=require("mongoose")
const cors=require("cors")
const fs=require('fs')
var url = require('url');
const { log } = require('console');



const storage=multer.diskStorage({
  // destination of the fie where  should be your file
  destination:function (req,file,cb){
    cb(null,path.join(__dirname,'./upload'))
  },
  // 
  filename:function(req,file,cb){
    cb(null,file.originalname)
  }
})
const upload = multer({storage:storage })
//  middeware 
const app = express()
app.use(express.static(__dirname+"/upload"));
const corsOption={
  origin:"*",
  credentials:true,
  optionSuccessStatus:200
}
app.use(cors(corsOption))
app.use(express.json())

//  img schema 
const imgSchema=new mongoose.Schema({
  originalname: String,
  url:String
}) 

//  modal for img schema 
const Img= mongoose.model('images',imgSchema)

// getting image 
app.post('/upload', upload.single("avatar"), function (req, res, next) {
  const {originalname,mimetype}= req.file
  if ( mimetype =='image/png' || mimetype =='image/jpeg' ){
   let url=req.protocol + '://' + req.get('host') +'/show/'+ originalname;
   Img.create({originalname,url})
   console.log("hii image");
   res.json({originalname,url})
  }
 else{
   res.sendStatus(400)
 }
})

// show the reqested image 
app.get("/show/:img",(req,res)=>{
  let imgPath="/upload/"+req.params.img
  if(fs.existsSync('.'+imgPath)){
   res.sendFile(__dirname+imgPath)
  }
  else {
    res.sendStatus(404)
  }
})

//  connecting to db then  listening to server  

mongoose.connect(process.env.mongo).then(()=>{
  app.listen(3000,()=>{
    console.log("listening at port  3000 dev");
})
}).catch(
  ()=>{
    console.log("not connected");
  }
)