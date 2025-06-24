import express from "express";
import dotenv from "dotenv";
import authRouter from "./src/routes/user.route.js"
import cors from "cors"
import { connectDB } from "./src/libs/db.js";
import cookieParser from "cookie-parser";
import { imageKit } from "./src/libs/imageKit.js";

dotenv.config()
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
  }))
app.get('/',(req,res)=>{
  res.send("Hello user")
})

app.use('/auth',authRouter);

app.get('/upload-video', function (req, res) {
  const { token, expire, signature } = imageKit.getAuthenticationParameters();
  res.send({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
});


app.listen(3000,()=>{
  connectDB()
  console.log("Connect to http://localhost:3000")
})