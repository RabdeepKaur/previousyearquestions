import React from 'react'
import BgGradient from '../common/BgGradient'
import { Coffee } from 'lucide-react'

const DemoSection = () => {
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
          <h3 className='font-bold text-3xl max-w-2xl mx-auto px-3 sm:px-6'> Watch how we transforms your 6.0 CGPA into an 8.5+ (because let’s be real — nobody’s getting a 9 😅)</h3>
          </div>
          <div className='flex justify-center items-center px-2 sm:px-4 lg:px-6'>
            
            {/* show how this works*/}</div>
          </div>
      </div>
    </section>
  )
}

export default DemoSection
