const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        unique:true,
    },
    profilePic:{
        type:String,
        default:""
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,    
    },
    bio:{
        type:String,
    }
},{timestamps:true});

const User=mongoose.model("User",userSchema);
module.exports=User;