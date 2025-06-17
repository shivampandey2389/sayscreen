import mongoose from "mongoose";

export const connectDB = () =>{
   mongoose.connect(process.env.MONGODB_URI)
   .then(()=>console.log('Connected to mongo Db'))
   .catch((err)=>console.log(err))
}