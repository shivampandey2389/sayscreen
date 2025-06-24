import { Clapperboard, Eye, EyeOff, KeyRound, Loader2, Mail, User } from 'lucide-react'
import  { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword,setShowPassword] = useState(false);
  const {isSigningUp,signup} = useAuthStore();
    const [formData,setFormData] = useState({
      fullName:"",
      email:"",
      password:""
    })

  const validateForm = () => {
   if(!formData.fullName.trim()) return toast.error("Full name is required");
   if(!formData.email.trim()) return toast.error("Email is required");
   if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email");
   if(!formData.password) return toast.error("Password is required");
   if(formData.password.length  < 6) return toast.error("Password must be at least 6 characters");
    
   return true
  };

    const handleSubmit =(e)=>{
      e.preventDefault();
      const success = validateForm()
      if(success) signup(formData)
      navigate('/')
    }

  return (
     <div className='h-screen w-full flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center w-full max-w-md'>
        <div className='flex flex-col items-center'>
          <div className='w-12 h-12 rounded-xl border border-primary/20 flex items-center justify-center bg-primary/10'>
            <Clapperboard className='w-6 h-6 text-primary' />
          </div>
          <h1 className='text-3xl font-bold'>Welcome</h1>
          <p className='text-md font-semibold'>Create a new Account</p>
        </div>

        <form onSubmit={handleSubmit} className='mt-3 space-y-6 flex flex-col w-full items-center'>

          <label className="input validator w-full ">
            <User className='h-5 w-5 text-base-content/40'/>
            <input
              type="text"
              value={formData.fullName}
              name='fullName'
              required
              placeholder="Name"
              onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})}
            />
          </label>

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
              isSigningUp ?( 
              <>
              <Loader2 className='animate-spin size-5'/>
              Loading....
              </>
              ):(
                "Create Account"
              )
            }
            </button>

        </form>
        <div className='flex items-center mt-1 gap-1'>
          <p className='text-base-content/60'>Already have an account ?</p>
          <Link to="/login" className='link link-primary'>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp