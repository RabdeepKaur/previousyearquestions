
import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Badge } from '../ui/badge'
import {MotionSection,MotionDiv,MotionH1,MotionSpan,MotionP} from "@/components/common/motion-wrapper"
import {containerVariants, itemVariants}from "@/utils/constants"
//import { useRouter } from "next/navigation";



const Herosection = () => {
  // const router = useRouter(); server component ha
  return (
 <MotionSection  variants={containerVariants}
 initial='hidden'
animate='visible'
 className=" relative  flex flex-col z-0 items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 xl:pb-28 transition-all animate-in px-4 sm:px-6 lg:px-12  bg-[radial-gradient(circle,rgba(161,240,149,1)_0%,rgba(237,223,223,1)_96%)]  ">
    <div className=" relative min-h-[60vh] sm:min-h-[65vh] lg:min-h-[70vh] flex flex-col items-center sm:space-y-6 lg:space-y-8  text-center max-w-7xl mx-auto">
            <div
            className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-secondary via-primary to-primary animate-gradient-x group">
        <Badge
        variant={"secondary"}
         className="  relative flex items-center px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-sm sm:text-base font-medium bg-secondary rounded-full group-hover:bg-gray-50 transition-colors duration-200 border border-primary">
        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mr-2 animate-pulse"></Sparkles>
        <p className="text-sm sm:text-base text-primary"> Powered by AI</p>
        </Badge>
        </div>
        <MotionH1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-hero leading-tight mb-4 sm:mb-6 px-2"
        >Turn
         <span className='bg-gradient-to-r from-primary to-accent bg-clip-text text-white'> Past Papers {" "}</span>{" "}
         & {" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-white">
            Your Note
          </span>{" "}
          into Perfect,{" "}
          <MotionSpan
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="relative inline-block"
          >
             <span className="block sm:inline">Mark-Sized Answers</span>
            <MotionDiv
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="absolute bottom-1 sm:bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </MotionSpan>
        </MotionH1>
         <MotionP
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-hero-muted max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 lg:mb-10 px-2"
        >
          Upload previous year questions and notes — let AI craft precise, mark-weighted
          answers to help you study efficiently and score higher.
        </MotionP>
          <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full sm:w-auto"
        >
          <Button className="group text-base sm:text-lg md:text-xl px-6 sm:px-8 py-2.5 sm:py-3 w-full sm:w-auto min-w-[160px] sm:min-w-[180px]"   >
            Try now
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
            </MotionDiv>
        </div>
   </MotionSection>
  )
}

export default Herosection
