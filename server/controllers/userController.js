const cloudinary=require("../config/cloudinary");
const {generateToken}=require("../config/utils") ;
const  User =require("../models/User");
const bcrypt=require("bcryptjs");

//signup a user
exports.signup = async(req, res) => {
    try{
      const {fullName, email, password,bio } = req.body;
      if(!fullName || !email || !password || !bio){
          return res.status(401).json({message: "Please fill all the fields"});
      }
      const user=await User.findOne({email});
      if(user){
          return res.status(409).json({message:"User already exists"})
      }
      const hashedPassword= await bcrypt.hash(password, 10);

      const newUser= await User.create({
          fullName,
          email,
          password:hashedPassword,
          bio
      });
      const token=generateToken(newUser._id); 
      res.status(201).json({success:true,message:"Signup successful",token,newUser});
    }
    catch(err){
        res.status(500).json({error:err.message});
        console.log(err);
    }
}

//login a user
exports.login = async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(401).json({message:"Please fill all the fields"});
        }
        const userData=await User.findOne({email});
        if(!userData){
            return res.status(404).json({message:"User not found"});
        }
        const passwordMatch=await bcrypt.compare(password,userData.password);
        if(!passwordMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const token=generateToken(userData._id);
        res.status(200).json({success:true,message:"Login successful",token,userData});
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}
//authenticate a user
exports.checkauth = (req, res) => {
  res.json({ success: true, message: "You are logged in", user: req.user });
}

//controller to update user profile
exports.updateUserProfile = async(req,res)=>{
    try{
        const {profilePic,bio,fullName}=req.body//get id of the user from params
        const userId=req.user._id; //get data to be updated from body
        
        let updatedUser;
        if(!profilePic){
             updatedUser=await User.findByIdAndUpdate(userId,{fullName,bio},{new:true});
        }
        else{
            const result=await cloudinary.uploader.upload(profilePic,{
                folder:'quickchat',
                width:300,
                crop:'scale'
            })
            updatedUser=await User.findByIdAndUpdate(userId,{fullName,bio,profilePic:result.secure_url},{new:true});
        }
        res.status(200).json({success:true,message:"Profile updated successfully",updatedUser});
    }
    catch(err){
        res.status(500).json({error:err.message})
    }   
}

exports.logout = async (req, res) => {
    try {
      // token clear karne ka backend side pe koi direct tarika nahi hota JWT me,
      // but tu client ko bol sakta hai ki token hata de
      res.status(200).json({ success: true, message: "Logout successful" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  