
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
 className=" relative  flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12  bg-[radial-gradient(circle,rgba(161,240,149,1)_0%,rgba(237,223,223,1)_96%)]  ">
    <div className=" relative min-h-[70vh] flex flex-col items-center space-y-6 text-center">
            <div
            className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-secondary via-primary to-primary animate-gradient-x group">
        <Badge
        variant={"secondary"}
         className=" relative flex items-center px-6 py-2 text-base font-medium bg-secondary rounded-full group-hover:bg-gray-50 transition-colors duration-200 border border-primary">
        <Sparkles className="h-6 w-6 mr-2 animate-pulse"></Sparkles>
        <p className="text-base text-primary"> Powered by AI</p>
        </Badge>
        </div>
        <MotionH1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-hero leading-tight mb-6"
        >Turn
         <span className='bg-gradient-to-r from-primary to-accent text-white bg-clip-text '> Past Papers {" "}</span>{" "}
         & {" "}
          <span className="bg-gradient-to-r from-primary to-accent text-white bg-clip-text ">
            Your Note
          </span>{" "}
          into Perfect,{" "}
          <MotionSpan
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="relative"
          >
            Mark-Sized Answers
            <MotionDiv
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="absolute bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </MotionSpan>
        </MotionH1>
         <MotionP
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg md:text-xl text-hero-muted max-w-3xl mx-auto leading-relaxed mb-10"
        >
          Upload previous year questions and notes — let AI craft precise, mark-weighted
          answers to help you study efficiently and score higher.
        </MotionP>
          <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Button className="group text-xl"   >
            Try now
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
            </MotionDiv>
        </div>
   </MotionSection>
  )
}

export default Herosection
