import User from "../models/users.models.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});


const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET, {
      expiresIn: "6h",
    });
  };
  

  const generateRefreshToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET, {
      expiresIn: "7d",
    });
  };
  
//  register User

 const registerUser = async (req ,res) => {
   const { email,password  } =req.body;
   try{
   const user = await User.findOne({
     email : "email"
   })
  const createUser  = await User.create({
     email,
     password
  })     
  res.json({
     messege : "user register successfully",
     data : createUser
  })
}catch (err){
if (err.code=11000){
  res.json({
    message : "Already exist user"
  })
}
}
 }


 // login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: "email required" });
  if (!password) return res.status(400).json({ message: "password required" });
  // email mujood ha bhi ya nahi ha
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "no user found" });
  // password compare krwayenga bcrypt
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(400).json({ message: "incorrect password" });

  // token generate
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // cookies
  res.cookie("refreshToken", refreshToken, { http: true, secure: false });

  res.json({
    message: "user loggedIn successfully",
    accessToken,
    refreshToken,
    data: user,
  });
};


// Logout User 

const logoutUser =(req,res)=>{
res.clearCookie("refreshToken")
res.json({
  messege : "logout Successfully"
})
}


// refreresh Token

const refreshToken = async (req,res)=>{
const refreshToken = req.cookies.refreshToken || req.body.refreshToken

if(!refreshToken)
return res.status(404).json({
  messege : "no token found"
})

const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);

const user = await User.findOne({email : decodedToken.email})

if (!user) return res.status(404).json({ message: "invalid token" });

const generateToken = generateAccessToken(user)
res.json({ message: "access token generated", accesstoken: generateToken });
res.json({ decodedToken });

}

// image server se araha h or server se image delete horha h fs ki help se

const uploadImageToCloudinary  = async (localpath)=>{
    try {const uploadResult = await cloudinary.uploader
       .upload(
        localpath, {
          resource_type: "auto",}
       )
       fs.unlinkSync(localpath);
    return uploadResult.url;
      }
       catch(error) {
           console.log(error);
       };
    console.log(uploadResult);
}
  
// image ka url cloudinary se arha h

const uploadImage = async(req,res)=>{
  if (!req.file)
    return res.status(400).json({
      message: "no image file uploaded",
    });

    try {
      const uploadResult = await uploadImageToCloudinary(req.file.path);
      console.log(uploadResult);
      
      if(!uploadResult)
        res.json({
      messege : "err accurd while uploading"
      })

      res.json({
        message: "image uploaded successfully",
        url: uploadResult,
      });

    } catch (error) {
      res.status(500).json({
        message : "err accured while uploading image"
      })
    }
}

 export {registerUser,loginUser,logoutUser,refreshToken,uploadImage}