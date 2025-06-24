import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import {Toaster} from "react-hot-toast";

const Layout = () => {
  return (
    <div data-theme="halloween">
    <Navbar/>
    <main>
      <Outlet/>
    </main>
   
    </div>
  )
}

export default Layout