import { CircleUserRound, Clapperboard, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='bg-base-100 border-b border-base-300 w-full fixed top-0 z-40 p-3 backdrop-blur-lg bg-base-100/80'>
      <div className='mx-auto max-w-7xl px-4 h-16 flex justify-between items-center'>
        
          <Link to="/" className='flex items-center gap-2'>
            <div className='w-12 h-12 rounded-xl border border-primary/20 flex items-center justify-center bg-primary/10'>
              <Clapperboard className='w-6 h-6 text-primary' />
            </div>
            <h1 className='text-lg font-bold'>SayScreen</h1>
          </Link>

        <div className='flex items-center gap-4'>
          <Link to="/setting" className='btn btn-neutral rounded-xl bg-base-100 border-base-100 sm:btn-sm md:btn-md lg:btn-md xl:btn-md'>
            <Settings className='w-6 h-6 text-primary' />
            <span className='hidden sm:inline'>Setting</span>
          </Link>

          <Link to="/profile" className='btn btn-neutral rounded-xl bg-base-100 border-base-100 sm:btn-sm md:btn-md lg:btn-md xl:btn-md'>
            <CircleUserRound className='w-6 h-6 text-primary' />
            <span className='hidden sm:inline'>Profile</span>
          </Link>

          <Link>
          
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
