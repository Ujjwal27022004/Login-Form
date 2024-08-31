const express = require('express')
const app = express()
require("./db/db.js")

const cookieparser = require("cookie-parser")
const{restrictTologgedinUserOnly} = require('./middleware/auth.js')
const {v4:uuidv4} = require('uuid')
const {setUser} = require("./service/auth.js")

const hbs = require ('hbs')
const path = require('path')
const empcollection = require("./model/model.js")
const template_path = path.join(__dirname,"../template/views")

app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"../template/views")));//for css file
app.use(cookieparser())
app.set('view engine','hbs')
app.set('views',template_path)

// app.get("",(req,res)=>{
//     res.send("Hello world")
// })

app.get("",(req,res)=>{
    res.render("signup")
})

app.post("/empdata",async (req,res)=>{
    try {
        const password = req.body.password
        const cpassword = req.body.cpassword
        
    if(password===cpassword){
        const empData = new empcollection({
            name : req.body.name,
            Email : req.body.Email,
            phone : req.body.phone,
            password : req.body.password,
            cpassword:req.body.cpassword
        })

        console.log(empData);
        
        const postData = await empData.save()
        console.log(postData)
        res.send(postData)
    }
    else{
        res.send("password are not matching")
    }
} catch (error) {
    res.send(error)
}
})


app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/loginpage",async (req,res)=>{
   try {
    const email = req.body.Email
    const password = req.body.password

    console.log(email)
    console.log(password)


    const getemail = await empcollection.findOne({Email:email})
    console.log(getemail)

    if(getemail && getemail.password === password)
    {
        const sessionID = uuidv4();
        setUser(sessionID, getemail);
        res.cookie('uid', sessionID, { httpOnly: true });
        return res.render("index",{ name: getemail.name,Email:getemail.Email,phone:getemail.phone,password:getemail.password });
    }
    else{
        res.send("Password is incorrect")
    }
   } catch (error) {
    res.send(error)
   }
})

app.get("/index", restrictTologgedinUserOnly, (req, res) => {
    
    res.render("index", { name: req.user.name,Email: req.user.Email,phone: req.user.phone,password: req.user.password });
});



app.listen(3000,()=>{
    console.log(`listening to port 3000`)
})