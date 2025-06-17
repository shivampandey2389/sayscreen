import express from "express";
import dotenv from "dotenv";
import authRouter from "./src/routes/user.route.js"
import fs from "fs";
import { connectDB } from "./src/libs/db.js";
import cookieParser from "cookie-parser";

dotenv.config()
const app = express();
app.use(express.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
  res.send("Hello user")
})

app.use('/auth',authRouter);

// app.post('/',(req,res)=>{
//   const file = fs.readFileSync("./public/avatar.png",{encoding:"base64"})
//   imageKit.upload({
//     file,
//     fileName:"uploaded_image.png",
//   },(error,result)=>{
//     if (error) return res.status(500).json(error);
//     return res.json(result);
//   })
// })

app.listen(3000,()=>{
  connectDB()
  console.log("Connect to http://localhost:3000")
})