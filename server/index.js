import express from "express";
import dotenv from "dotenv";
import authRouter from "./src/routes/user.route.js"
import cors from "cors"
import { connectDB } from "./src/libs/db.js";
import cookieParser from "cookie-parser";
import { imageKit } from "./src/libs/imageKit.js";
import multer from "multer";
import fs from "fs"

dotenv.config()
const app = express();
const upload = multer({dest:'temp/'})
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

app.post("/api/upload", upload.fields([
  {name:'thumnail',maxCount:1},
  {name:'video',maxCount:1}]), 
  async (req, res) => {
  const {title,description}  = req.body;
  const thumnailFile = req.files['thumnail']?.[0];
  const videoFile = req.files['video']?.[0];
  if (!title||!description||!thumnailFile || !videoFile) {
     return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const thumnailBuffer = fs.readFileSync(thumnailFile.path);
    const videoBuffer = fs.readFileSync(videoFile.path);

    const thumnailUpload = await imageKit.upload({
      file: thumnailBuffer, // binary
      fileName: thumnailFile.originalname,
      folder:'/thumbnails',
      extensions: [
        {
          name: "google-auto-tagging",
          maxTags: 5,
          minConfidence: 95,
        },
      ],
      transformation: {
        pre: 'l-text,i-Imagekit,fs-50,l-end',
        post: [{ type: "transformation", value: "w-100" }],
      },
      checks: `"file.size" < "1mb"`,
      isPublished: true,
    });

    const videoUpload = await imageKit.upload({
      file:videoBuffer,
      fileName:videoFile.originalname,
      folder:'/videos',
      extensions: [
        {
          name: "google-auto-tagging",
          maxTags: 5,
          minConfidence: 95,
        },
      ],
      transformation: {
        pre: 'l-text,i-Imagekit,fs-50,l-end',
        post: [{ type: "transformation", value: "w-100" }],
      },
      checks: `"file.size" < "10mb"`,
      isPublished: true,
    })

    // Cleanup local file
    fs.unlinkSync(thumnailFile.path);
    fs.unlinkSync(videoFile.path);

    console.log("File is uploaded");
    return res.status(201).json({
      message: "Both files uploaded successfully",
      thumbnail: thumnailUpload.url,
      video: videoUpload.url,
      title,
      description
    });
  } catch (error) {
    console.error("ImageKit Upload Error:", error);
    try {
        if (thumnailFile?.path) fs.unlinkSync(thumnailFile.path);
        if (videoFile?.path) fs.unlinkSync(videoFile.path);
      } catch (cleanupError) {
        console.error("Error cleaning up files:", cleanupError);
      }

      return res.status(500).json({
        error: "Upload failed",
        details: error?.message || "Unknown error occurred",
      });
  }
});


app.listen(3000, async () => {
    await connectDB();
    console.log("Connected to http://localhost:3000");
});