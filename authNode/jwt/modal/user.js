const mongoose=require("mongoose")
const UserSchema=new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    bio:{ type: String, default: 'I can tell he is ver nice guy but  he need t oupdate to tell aboiut himself a little more ' },   password:String
})

const userModel=mongoose.model("user",UserSchema)

module.exports = userModel