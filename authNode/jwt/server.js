require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const app = express()
const register =require("./utils/register")
const login =require("./utils/login")
const authenticate=require("./utils/authMiddleware")

// register
app.post("/register", register)

// login
app.post("/login",login)


// protected routes 
app.get("/",authenticate,(req,res)=>{
    res.sendStatus(200)
})

//  other route after checking the credentiality 
mongoose.connect(process.env.mongo).then(() => {
    app.listen(3000, () => {
        console.log("lis tening at port  3000 dev");
    })
}).catch(
    () => {

        console.log("not connected");
    }
) 