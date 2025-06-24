import { Clapperboard, Eye, EyeOff, KeyRound, Loader2, Mail } from 'lucide-react'
import { useState } from 'react'
import {Link} from "react-router-dom"
import { useAuthStore } from '../store/useAuthStore';

const Loginpage = () => {
  const [showPassword,setShowPassword] = useState(false);
  const {isLogin,login} = useAuthStore();
  const [formData,setFormData] = useState({
    email:"",
    password:""
  })
  const handleSubmit =(e)=>{
    e.preventDefault();
    try {
      login(formData)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center w-full max-w-md'>
        <div className='flex flex-col items-center'>
          <div className='w-12 h-12 rounded-xl border border-primary/20 flex items-center justify-center bg-primary/10'>
            <Clapperboard className='w-6 h-6 text-primary' />
          </div>
          <h1 className='text-3xl font-bold'>Welcome Back</h1>
          <p className='text-md font-semibold'>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className='mt-3 space-y-6 flex flex-col w-full items-center'>

           <label className="input validator w-full ">
            <Mail className='h-5 w-5 text-base-content/40'/>
            <input
              type="email"
              value={formData.email}
              name='email'
              required
              placeholder="Email"
              onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})}
            />
          </label>

           <label className="input validator w-full">
            <KeyRound className='h-5 w-5 text-base-content/40' />
            <input
              type={showPassword?'text':'password'}
              value={formData.password}
              name='password'
              required
              placeholder="*********"
              onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})}
            />
            <button onClick={()=>setShowPassword(!showPassword)}>
              {
                showPassword ? 
                <EyeOff className='h-5 w-5 text-base-content/40' />
                :
                <Eye className='h-5 w-5 text-base-content/40' />
              }
            </button>
          </label>
            
           <button type='submit' className="btn btn-primary w-full">
            {
              isLogin ?(
                <>
                <Loader2 className=' size-5 animate-spin'/>
                Loading...
                </>
              ):(
                "Log in"
              )
            }
            </button>

        </form>
        <div className='flex items-center mt-1 gap-1'>
          <p className='text-base-content/60'>Don&apos;t have an account? </p>
          <Link to="/sign-up" className='link link-primary'>Create Account</Link>
        </div>
      </div>
    </div>
  )
}

export default Loginpage