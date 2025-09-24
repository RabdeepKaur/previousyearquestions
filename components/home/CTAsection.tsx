import Link from "next/link";
import { Button } from "../ui/button";
import { MotionDiv, MotionH2, MotionP } from "../common/motion-wrapper";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTAsection() {
    return(
  <section className=" bg-gray-50 py-20 px-6 ">
      <div className="max-w-4xl mx-auto text-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.05, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10">
          {/* Sparkles Animation */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl backdrop-blur-sm animate-float">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>
          </MotionDiv>

          {/* Main Heading */}
          <MotionH2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-hero mb-6"
          >
            Ready to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              top any exam?
            </span>
          </MotionH2>

          {/* Subtitle */}
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-hero-muted mb-12 max-w-2xl mx-auto"
          >
            Get marked based length answer to ace and exam
          </MotionP>

          {/* CTA Button */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button  className=" text-xl group relative overflow-hidden">
              {/* Button Background Animation */}
              <MotionDiv
                className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              
              <span className="relative z-10 flex items-center">
                GET STARTED
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>

              {/* Shimmer Effect */}
              <MotionDiv
                className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </Button>
          </MotionDiv>

          {/* Trust Indicators */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 mt-16 text-sm text-hero-muted"
          >
          </MotionDiv>
        </div>
      </div>
    </section>
    )
}