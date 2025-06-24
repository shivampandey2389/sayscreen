import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import toast from "react-hot-toast";

const BASE_URL ="http://localhost:3000"

export const useAuthStore =create((set,get)=>({
  isSigningUp:false,
  isLogin:false,
  authUser:null,
  isCheckAuth:true,


  signup: async(data)=>{
    set({isSigningUp:true})
    try {
      const res = await axiosInstance.post("/auth/sign-up",data)
      set({authUser:res.data});
      toast.success("Account created Successfully");
    } catch (error) {
      toast.error(error.response.data.message)
    }finally{
      set({isSigningUp:false})
    }
  },

  login:async(data)=>{
    set({isLogin:true})
    try {
      const res = await axiosInstance.post('/auth/sign-in',data)
      set({authUser:res.data})
      toast.success("Logged in successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    }finally{
      set({isLogin:false})
    }
  },

  logout:async()=>{
    try {
      await axiosInstance.get('/auth/logout');
      set({authUser:null})
    } catch (error) {
      toast.error("Logged out error",error.response.data.message);
    }
  },

  checkAuth:async()=>{
    try {
      const res = await axiosInstance.get('/auth/check');
      set({authUser:res.data})
    } catch (error) {
      console.log("Error in CheckAuth",error);
      set({authUser:null})
    }finally{
      set({isCheckAuth:false});
    }
  }
}))