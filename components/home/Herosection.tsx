import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Badge } from '../ui/badge'
import Link from 'next/link'


const Herosection = () => {
  return (
 <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl ">
    <div className="flex flex-col items-center space-y-6 text-center">
            <div  className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-secondary via-primary to-primary animate-gradient-x group">
        <Badge
        variant={"secondary"}
         className=" relative flex items-center px-6 py-2 text-base font-medium bg-secondary rounded-full group-hover:bg-gray-50 transition-colors duration-200 border border-primary">
        <Sparkles className="h-6 w-6 mr-2 animate-pulse"></Sparkles>
        <p className="text-base text-primary"> Powered by AI</p>
        </Badge>
        </div>
        <h1 className='text-black text-3xl sm:text-4xl font-bold max-w-3xl'>
      <span className='relative inline-block'> Turn Past Papers & Your Note into Perfect, Mark-Sized Answers.</span> 
        </h1>
        <h2 className='text-black text-lg max-w-2xl'>
        Upload previous year questions and notes — let AI craft precise, mark-weighted answers to help you study efficiently and score higher.
        </h2>
        <Button variant={'link'} className=" text-secondary bg-primary"> 
            <Link href="/#freeplan" className="flex gap-2 items-center">
           <span>Try now</span>
           <ArrowRight className="animate-pluse  mt-6 text-base sm-text-lg lg:text-xl rounded-full px-8 sm:px-10 lg-px-12 py-6 sm:py-7 lg:py-8 lg:mt-16"></ArrowRight>
            </Link>
            </Button>
        </div>
   </section>
  )
}

export default Herosection
