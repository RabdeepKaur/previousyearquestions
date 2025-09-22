"use client"
import { Badge, BookOpen, FileText, Sparkles } from "lucide-react";
import UploadFormInput from "./uploadform-input";
import { MotionDiv } from "../common/motion-wrapper";
import {Button} from "../ui/button";
import { useState } from "react";


export default function UploadHeader(){
    const [uploadType, setUploadType] = useState<'question' | 'notes'>('question');
    return (
        <section >
          <div className="max-w-4xl mx-auto px-6 ">
      {/* Header */}
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center "
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold  bg-clip-text text-green-950">
            Upload Your Documents
          </h1>
        </div>
        <p className="text-lg text-hero-muted max-w-2xl mx-auto">
          Upload your previous year questions and study notes. Our AI will help you create perfect answers.
        </p>
      </MotionDiv>

      {/* Upload Type Selector */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <p className="text-base font-medium mb-4 block">Select Document Type</p>
        <div className="flex gap-4">
          <Button
            onClick={() => setUploadType('question')}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Question Papers
          </Button>
          <Button
            onClick={() => setUploadType('notes')}
            className="flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Study Notes
          </Button>
        </div>
      </MotionDiv>
</div>
</section>
    )
}   