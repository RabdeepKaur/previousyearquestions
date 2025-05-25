import React from 'react'
import { BookOpenCheck } from 'lucide-react';
import { Button } from '../ui/button';
import NavLink from './nav-link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Header = () => {

    return (
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
  <div className="flex items-center">
    <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
      <BookOpenCheck className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transition duration-200 ease-in-out" />
      <span className="font-extrabold text-base lg:text-xl text-gray-900">YeTuNhiAaneWala</span>
    </NavLink>
  </div>
  
 
  <div className="flex items-center space-x-4 lg:space-x-12 px-90">
    <NavLink href="/#princing" className="text-sm lg:text-base font-medium hover:text-gray-600 transition">
      Pricing
    </NavLink>
    <NavLink href="/upload" className="text-sm lg:text-base font-medium hover:text-gray-600 transition">
      Upload PYQS
    </NavLink>
    {<SignedIn> && 
      <NavLink href="/dashboard" className="text-sm lg:text-base font-medium hover:text-gray-600 transition">
       previous uploads
      </NavLink>
    </SignedIn>}
  </div>
<div className='flex lg:justify-end lg:flex-1'>
  <SignedIn>
  <div className="flex gap-2 items-center">
    <div>pro</div>
    <SignedIn>
              <UserButton />
      </SignedIn>
  </div>
  </SignedIn>
  <SignedOut>
    <div>
      <Button >
  <NavLink href="/sign-in" className='text-secondary'>Singin</NavLink>
  </Button>
</div>
</SignedOut>
</div>
      </nav>
    )
}

export default Header
