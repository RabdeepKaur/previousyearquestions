import React from 'react'
import { BookOpenCheck } from 'lucide-react';
import { Button } from '../ui/button';
import NavLink from './nav-link';

const Header = () => {
  const isLoggedIn=false;
    return (
      <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto" >
<div  className="flex lg:flex">
<NavLink href="/" className='flex items-center gap-1 lg:gap-2 shrink-0'>
  <BookOpenCheck className='w-5h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 tranform transform transition duration-200 ease-in-out'></BookOpenCheck>
 <span className='font-extrabold lg:text-xl text-gray-900'>YeTuNhiAaneWala</span>
 </NavLink>
</div>
<div className=' flex lg:justify-center gap-20 lg:gap-12 lg:items-center '>
  <NavLink href="/#princing" > Pricing</NavLink>
  {isLoggedIn &&<NavLink href="/dashboard" > YePaperDekhaHai</NavLink>}
</div>
<div className='flex lg:justify-end lg:flex-1'>
  {isLoggedIn ?
  (<div className="flex gap-2 items-center">
    <NavLink href="/sign-in"> Upload PYQS</NavLink>
    <div>pro</div>
    <Button>Signout</Button>
  </div>):(
    <div>
  <NavLink href="/sign-in">Singin</NavLink>
</div>)}
</div>
      </nav>
    )
}

export default Header
