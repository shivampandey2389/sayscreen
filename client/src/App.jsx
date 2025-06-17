import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Homepage from "./pages/Homepage.jsx";
import Loginpage from "./pages/Loginpage";
import SignUp from "./pages/SignUp";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./Outlet/Layout.jsx";
const App = () =>{
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {index:true , element:<Homepage/>},
        {path:"/login",element:<Loginpage/>},
        {path:"/sign-up",element:<SignUp/>},
        {path:"/profile",element:<ProfilePage/>},
        {path:"/setting",element:<ProfilePage/>}
      ]
    }
  ])
  return(
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App;