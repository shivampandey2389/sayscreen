import { Clapperboard, Mail } from 'lucide-react'
import React from 'react'

const Loginpage = () => {
  return (
    <div className='h-screen w-full'>
      <div className='flex flex-col items-center justify-center h-full w-full'>
        <div className='flex flex-col items-center'>
          <div className='w-12 h-12 rounded-xl border border-primary/20 flex items-center justify-center bg-primary/10'>
            <Clapperboard className='w-6 h-6 text-primary' />
          </div>
          <h1 className='text-3xl font-bold'>Welcome Back</h1>
          <p className='text-md font-semibold'>Sign in to your account</p>
        </div>

        <form action="" className='mt-3 space-y-6'>

          <label className="input validator w-full">
            <Mail className='h-5 w-5 text-base-content/40'/>
            <input
              type="text"
              required
              placeholder="Username"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minlength="3"
              maxlength="30"
              title="Only letters, numbers or dash"
            />
          </label>

        </form>
      </div>
    </div>
  )
}

export default Loginpage