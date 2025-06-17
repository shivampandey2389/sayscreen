import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  videoUrl:{
    type:String,
    required:true,
  },
  thumbnailUrl:{
    type:String,
    required:true
  },
  controls:{
    type:Boolean,
    default:true
  },
  transformation:{
    height:{
      type:Number,
      default:1920
    },
    width: { 
      type: Number, 
      default:1080
    },
    quality: { 
      type: Number, 
      min: 1, 
      max: 100 
    },
  }
})

const video = mongoose.model('Video',videoSchema);

export default video;