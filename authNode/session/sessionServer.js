//  importing the modules 
const express=require("express")
const app=express()
const sessions=require("express-session")
//  user cred 
const user="sam"
const password="session1"
var session
//middleware start

// parse request 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session 
app.use(sessions({
    secret: 'keyboard cat',
    resave: false,
    cookie:{maxAge:1000*60*10},
    saveUninitialized: true
  }))

// serving the static file 
app.use(express.static("./public"))

//  home page 
app.get("/",(req,res)=>{
    session=req.session
    if(session.userid){
        res.sendFile(__dirname+"/public/home.html")
    }else{
        res.redirect("/login")
    }
})
// display login page to enter cred
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+"/public/login.html")
})

// checking credential 
app.post("/user",(req,res)=>{
    console.log(req.body);
    if(req.body.username === user && req.body.userpassword === password ){
        session=req.session
        session.userid=req.body.username
        console.log(session);
        res.redirect('/')
    }

    else{
        res.redirect("/login")
    }

})
app.get('/logout',(req,res)=>{
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
            return next(err)
        }

        return res.redirect("/login")
    })
})

app.listen(3000,()=>{
    console.log("listening at port 3000");
})