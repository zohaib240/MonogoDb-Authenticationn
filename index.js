import connectDB from "./src/db/index.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt"
import mongoose from 'mongoose';
const { ConnectionStates } = mongoose;
import userRouter from './src/routes/userRoutes.js'; // Correct import path





const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// cookies

// set krna

// app.get("/",(req,res) => {
//   res.cookie('name','zohaib')
//   res.send('done hogya')
// })

// // read krna ya mangwana
// app.get('/read',(req,res) => {
// console.log(req.cookies);
// res.send('read')
// })

// bcrypt and incript

// app.get('/methode',(req,res) =>{
//   bcrypt.genSalt(15, function(err, salt) {
//     bcrypt.hash('sdsdsdsdsd', salt, function(err, hash) {
//       console.log(hash);
      
//         // Store hash in your password DB.
//     });
// });
// })

// app.get('/check',(req,res)=>{
//   bcrypt.compare('sdsdsdsdsd','$2b$15$chPcgsCVfpe/r.fOwY4/NuQQTVn8tjkAj36ZK.HHuLiKa6Q3uU0Jm', function(err, result) {
//     console.log(result);
//     // result == true
// });
// })

// jwt 

// app.get('/jwt', (req,res)=>{
//  let token = jwt.sign({email : "zohaib@gmail.com"},"google secrete")
// console.log(token);
// res.cookie('token',token)
// res.send('done')

// })
 

// app.get('/jwtread',(req,res)=>{
// let data = jwt.verify(req.cookies.token,'google secrete')
// console.log(data);

// })


// app.listen(3000)

// app.get('/set-cookie', (req, res) => {
//   res.cookie('token', 'someRandomToken', { httpOnly: true });
//   res.send('Cookie has been set');
// });

// app.listen(3000, () => console.log('Server running on port 3000'));


// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
   res.send("Hello World2!");
 });
 
 // routes
 app.use("/api/v1", userRouter);
 
 connectDB()
   .then(() => {
     app.listen(process.env.PORT, () => {
       console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
     });
   })
   .catch((err) => {
     console.log("MONGO DB connection failed !!! ", err);
   });

console.log("Server started...");
