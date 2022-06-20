const jwt = require("jsonwebtoken")
// verify token 
function authenticate(req,res,next){
    const authHeader = req.headers['authorization']
    console.log(authHeader);
    jwt.verify(authHeader,process.env.secret ,(err, verifiedJwt) => {
        if(err){
          res.send(err.message)
        }else{
          next()
        }
    })
    
}
 module.exports=authenticate