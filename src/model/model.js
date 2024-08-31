const mongoose = require('mongoose')

const empSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    }
})
const empCollection = new mongoose.model('empcollection',empSchema)
module.exports=empCollection