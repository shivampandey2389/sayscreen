import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom"
import Homepage from "./pages/Homepage.jsx";
import Loginpage from "./pages/Loginpage";
import SignUp from "./pages/SignUp";
import Layout from "./Outlet/Layout.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore.js";
import SettingPage from "./pages/SettingPage.jsx";
import { useEffect } from "react";
import Upload from "./pages/Upload.jsx";
const App = () =>{
  const {authUser,isCheckAuth,checkAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {index:true , element:authUser ? <Homepage/> : <Navigate to="/login"/>},
        {path:"/login",element:!authUser ? <Loginpage/>:<Navigate to="/"/>},
        {path:"/sign-up",element:!authUser ? <SignUp/>:<Navigate to="/"/>},
        {path:"/setting",element:<SettingPage/>},
        {path:"/upload",element:authUser?<Upload/>:<Navigate to="/login"/>}
      ]
    }
  ])

  if(isCheckAuth && !checkAuth){
    return(
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }
  return(
    <>
    <RouterProvider router={router}/>
     <Toaster/>
    </>
  )
}

export default App;