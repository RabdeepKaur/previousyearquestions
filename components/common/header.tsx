import React from 'react'
import { BookOpenCheck } from 'lucide-react';
import { Button } from '../ui/button';
import NavLink from './nav-link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { MotionDiv, MotionNav} from "./motion-wrapper"

const Header = () => {

    return (
      <MotionNav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
     className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">

  <MotionDiv 
  initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
  className="flex items-center">
    <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
      <BookOpenCheck className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transition duration-200 ease-in-out" />
      <span className="font-extrabold text-base lg:text-xl text-gray-900">Previous year question</span>
    </NavLink>
  </MotionDiv>
  
 
  <MotionDiv 
  initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
  className="flex items-center space-x-4 lg:space-x-12 px-90">
    <NavLink href="/upload" className="text-sm lg:text-base font-medium hover:text-gray-600 transition">
      Upload PYQS
    </NavLink>
    
      <NavLink href="/dashboard" className="text-sm lg:text-base font-medium hover:text-gray-600 transition">
       Dashboard
      </NavLink>
   
   
  </MotionDiv>
  <MotionDiv
  initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
<div className='flex lg:justify-end lg:flex-1'>
  <SignedIn>
  <div className="flex gap-2 items-center">
    
    <SignedIn>
              <UserButton />
      </SignedIn>
  </div>
  </SignedIn>
  <SignedOut>
    <div>
      <Button >
  <NavLink href="/sign-in" className='text-secondary'>Sing-In</NavLink>
  </Button>
</div>
</SignedOut>
</div>
</MotionDiv>
      </MotionNav>
    )
}

export default Header
