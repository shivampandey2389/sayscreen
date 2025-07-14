import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useUpload =create((set,get)=>({
  uploadData:null,
  isDisabled:false,

  uploadup:async(data)=>{
    set({isDisabled:true});
    try {
      const res = await axiosInstance.post('/api/upload',data);
      const newData = res.data;
      console.log(newData);
      toast.success("Successfully uploaded");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Upload failed");
    }finally{
      set({isDisabled:false})
    }
  }
}))