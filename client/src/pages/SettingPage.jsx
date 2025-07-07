import { CircleUserRound, Palette , Info } from 'lucide-react'
import React from 'react'

const SettingPage = () => {
  return (
    <div className="bg-base-200 w-full min-h-screen pt-26">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="text-4xl font-semibold mb-8 mt-5">Setting</h1>
        <ul className="list bg-base-200 rounded-box shadow-md">

          <li className="list-row cursor-pointer flex items-center hover:bg-base-100">
            <div className='flex items-center'><CircleUserRound className='size-10' /></div>
            <div>
              <h1 className='text-xl'>Profile</h1>
            </div>
          </li>

          <li className="list-row cursor-pointer flex items-center hover:bg-base-100">
            <div className='flex items-center'><Palette className='size-10' /></div>
            <div>
              <h1 className='text-xl'>Themes</h1>
            </div>
          </li>

          <li className="list-row cursor-pointer flex items-center hover:bg-base-100">
            <div className='flex items-center'><Info className='size-10' /></div>
            <div>
              <h1 className='text-xl'>Contact us</h1>
            </div>
          </li>

          <li className="list-row cursor-pointer flex items-center hover:bg-base-100">
            <div className='flex items-center'><Info className='size-10' /></div>
            <div>
              <h1 className='text-xl'>Contact us</h1>
            </div>
          </li>

        </ul>
      </div>
    </div>
  )
}

export default SettingPage