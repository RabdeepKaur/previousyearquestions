"use client";
import { useUploadThing } from "@/utils/uploadting";
import UploadFormInput from "./uploadform-input";
import {set, z} from 'zod';
import { toast } from "sonner";
import { generateAnswer } from "@/actions/uploadaction";
import { useRef, useState } from "react";

const schema = z.object({
  file: z.instanceof(File, {message: 'Invalid file'})
    .refine((file) => file.size <= 20*1024*1024, {
      message: 'File size should be less than 24MB'
    })
    .refine((file)=>file.type.startsWith('application/pdf'), {
      message: 'File type should be PDF'
    })
});

export default function UploadForm(){;

  const formRef = useRef<HTMLFormElement>(null);
const {isLoading,setIsLoading}=useState(false);


  const{startUpload,routeConfig}=useUploadThing('pdfUploader',{
    onClientUploadComplete:()=>{
      console.log('upload Sucessfully')
       toast.success('Your file has been uploaded successfully.');
    }, 
    
   onUploadBegin: ({ file }) => {
      console.log("Upload has begun for", file);
    }
  });

const handleSubmit= async(e:React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault()
   console.log('submitted')

   try{

setIsLoading(true);
   const formData=new FormData(e.currentTarget)
   const file=formData.get('file') as File;

   //validation => schema usign zod =>upload file to upload thing =>parse the pdf usig langchain => summarithe pdf sing ai
// parsing of the pf wiht longchin

const validationFields=schema.safeParse({file})
if(!validationFields.success){
    toast.error(validationFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid file')
    setIsLoading(false);
   return
}

console.log(validationFields);
const resp=await startUpload([file]);
if(!resp){
  toast.error("Failed to upload file. Please try again.");
  return ("OOPS ! looks like you have not singup to us yet or you are not logged in");
}
toast.loading('We are uploading your pdf')
    toast.success('File is valid')
    toast.loading('HANG tight! The AI is working its magic')

const summary= await generateAnswer(resp)
console.log(summary);

const {data =null , message=null}=summary ||{};
if(data){
  // save the summary to the database
  toast.loading('Saving answer so you can access at anytiem ! checl out previous questions');  
}

formRef.current?.reset();
   }
   catch(error){
    setIsLoading(false);
    console.error('Error during form submission:', error);
    formRef.current?.reset();
   }
};
return(
   <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
   <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit}/>
   </div>
)
}
