// // how to know if file exist or not in nodejs
// require('dotenv').config();
// const express = require('express')
// const multer  = require('multer')
// const path =require("path")
// const mongoose=require("mongoose")
// const cors=require("cors")
// const fs=require('fs')
// var url = require('url');



// const storage=multer.diskStorage({
//   // destination of the fie where  should be your file
//   destination:function (req,file,cb){
//     cb(null,path.join(__dirname,'./upload'))
//   },
//   // 
//   filename:function(req,file,cb){
//     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//       cb(null, true);
//   } else {
//       cb(null, false);
//       return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//   }
//   }
// })
// const upload = multer({storage:storage })
// //  middeware 
// const app = express()
// app.use(express.static(__dirname+"/upload"));
// const corsOption={
//   origin:"*",
//   credentials:true,
//   optionSuccessStatus:200
// }
// app.use(cors(corsOption))
// app.use(express.json())
// //  Database 
 
// //  connecting to db 
// // console.log(process.env.mongo)
// let connect=mongoose.connect(process.env.mongo).then(()=>{
//   console.log("connected");
// }).catch(
//   ()=>{
//     console.log("not connected");
//   }
// )
// //  img schema 
// const imgSchema=new mongoose.Schema({
//   originalname: String,
//   url:String
// }) 

// //  modal for img schema 

// const Img= mongoose.model('images',imgSchema)

// // serving home page 
// app.get('/',(req,res)=>{
//     res.sendFile(__dirname+"/index.html")
// })

// app.post('/upload', upload.single("file"), function (req, res, next) {
//   console.log(req.file)
//   const {originalname,mimetype}= req.file
//   let url=req.protocol + '://' + req.get('host') +'/show/'+ originalname;
//     Img.create({originalname,url})
//     res.send(url)
  
// })
// app.get("/show/:img",(req,res)=>{
//    console.log(req.params)
//   let imgPath="/upload/"+req.params.img
//   console.log(imgPath);
//   console.log(  );
//   if(fs.existsSync('.'+imgPath)){
//     let url=req.protocol + '://' + req.get('host') + req.originalUrl;
//     console.log(url);
//     res.sendFile(__dirname+imgPath)
//   }
//   else {
//     res.send('error')
//   }
// })


// app.listen(3000,()=>{
//     console.log("llistening");
// })