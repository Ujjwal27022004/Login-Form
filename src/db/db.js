const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/empform", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(()=>{
    console.log("Connect")
})
.catch((error)=>{
    console.log("connection error",error)
})