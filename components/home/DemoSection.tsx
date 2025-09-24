"use client"
import React from 'react'
import BgGradient from '../common/BgGradient'
import { Coffee } from 'lucide-react'
import {useRef,useEffect} from "react"

import gsap from "gsap";

const DemoSection = () => {
    const stepRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Animate each step sequentially
    gsap.fromTo(
      stepRefs.current,
      { opacity: 0, y: 50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.8, duration: 1, ease: "power3.out" }
    );

    // Optional: add bouncing arrow animation
    gsap.to("#arrow", { y: -10, repeat: -1, yoyo: true, duration: 0.8, ease: "power1.inOut" });
  }, []);

  // Utility to add refs
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !stepRefs.current.includes(el)) stepRefs.current.push(el);
  };

  return (
    <section className="relative">
      <div className="py-10 lg:py-15 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div>
       <BgGradient/>
        </div>
        <div className='flex flex-col items-center text-center space-y-4'>
        <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4">
          <Coffee className=' w-6 h-6 text-black'/>
          </div>
          <div className="text-center mb-16">
          <h3 className='font-bold text-3xl max-w-2xl mx-auto px-3 sm:px-6'> Watch how we transforms your 6.0 CGPA into an 8.5+ </h3>
          <p className=' text-lg max-w-2xl mx-auto px-3 sm:px-6'>because let’s be real — nobody’s getting a 9 </p>
          </div>
  
            {/* show how this works*/}</div>
          </div>
      
    </section>
  )
}

export default DemoSection
