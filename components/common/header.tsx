"use client"
import {useState} from 'react'
import { BookOpenCheck, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import NavLink from './nav-link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { MotionDiv, MotionNav} from "./motion-wrapper"

const Header = () => {
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

    return (
      <MotionNav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
     className="container mx-auto flex items-center justify-between py-3 sm:py-4 px-4 sm:px-6 lg:px-8">

  <MotionDiv 
  initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
  className="flex items-center flex-shrink-0">
    <NavLink href="/" className="flex items-center gap-1.5 sm:gap-2 group">
      <BookOpenCheck className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8  text-gray-900 hover:rotate-12 transition duration-200 ease-in-out" />
      <span className="font-extrabold text-sm sm:text-base lg:text-xl text-gray-900 truncate max-w-[120px] sm:max-w-none"></span>
              <span className="hidden sm:inline text-xl font-bold text-black">Previous Year Questions</span>
              <span className="sm:hidden">PYQ </span>
    </NavLink>
  </MotionDiv>
  
 
  <MotionDiv 
  initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
  className="hidden md:flex items-center space-x-6 lg:space-x-8">
    <NavLink href="/upload" className="text-sm lg:text-base font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap">
      Upload PYQS
    </NavLink>
    
      <NavLink href="/dashboard" className="text-sm lg:text-base font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200">
       Dashboard
      </NavLink>
   
   
  </MotionDiv>
  <MotionDiv
  initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden md:flex items-center"
      >
<div className='flex items-center gap-3'>
  <SignedIn>
  <div className="flex items-center gap-2">
    
    <SignedIn>
              <UserButton
              appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 lg:w-9 lg:h-9"
                    }
                  }} />
      </SignedIn>
  </div>
  </SignedIn>
  <SignedOut>
    <div>
      <Button >
  <NavLink href="/sign-in" className='text-secondary font-medium'>Sing-In</NavLink>
  </Button>
</div>
</SignedOut>
</div>
</MotionDiv>
    
     
       <MotionDiv
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, delay: 0.3 }}
  className="md:hidden flex items-center gap-3"
>
  <SignedIn>
    <UserButton 
      appearance={{
        elements: {
          avatarBox: "w-9 h-9 border border-gray-200 shadow-sm"
        }
      }}
    />
  </SignedIn>

  <button
    onClick={toggleMobileMenu}
    className="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
    aria-label="Toggle mobile menu"
    aria-expanded={isMobileMenuOpen}
  >
    {isMobileMenuOpen ? (
      <X className="w-6 h-6" />
    ) : (
      <Menu className="w-6 h-6" />
    )}
  </button>
</MotionDiv>

{isMobileMenuOpen && (
  <>
    {/* Overlay */}
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
      onClick={toggleMobileMenu}
    />

    {/* Drawer */}
    <MotionDiv
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 right-0 w-72 h-full bg-white shadow-2xl z-50 md:hidden rounded-l-2xl flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md hover:bg-gray-100 transition"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 space-y-3">
        <NavLink 
          href="/upload" 
          className="block text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors duration-200"
          onClick={toggleMobileMenu}
        >
           Upload PYQs
        </NavLink>
        
        <NavLink 
          href="/dashboard" 
          className="block text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors duration-200"
          onClick={toggleMobileMenu}
        >
           Dashboard
        </NavLink>
      </nav>

      {/* Auth Section */}
      <div className="px-4 py-6 border-t">
        <SignedOut>
          <Button className="w-full" onClick={toggleMobileMenu}>
            <NavLink href="/sign-in" className="text-secondary font-medium">
              Sign In
            </NavLink>
          </Button>
        </SignedOut>
      </div>
    </MotionDiv>
  </>
)}

      </MotionNav>
  
    )
}

export default Header
