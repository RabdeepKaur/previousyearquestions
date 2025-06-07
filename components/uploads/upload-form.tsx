"use client";
import { useUploadThing } from "@/utils/uploadting";
import UploadFormInput from "./uploadform-input";
import {set, z} from 'zod';
import { toast } from "sonner";
import { generateAnswer } from "@/actions/uploadaction";
import { useRef, useState } from "react";
import { generateAnswerwithgeminiAI } from "@/lib/gemini";

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
const [isLoading,setIsLoading]=useState(false);


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
toast.success('File is valid')
console.log(validationFields);

const resp = await startUpload([file]);
if (!resp) {
  toast.error("Failed to upload file. Please try again.");
  return ("OOPS ! looks like you have not singup to us yet or you are not logged in");
}
toast.loading('We are uploading your pdf')


// Transform resp to match generateAnswer's expected input
const uploadResponse = resp.map((item) => ({
  serverData: {
    userId: item.serverData?.uploadedBy ?? "unknown",
    file: {
      url: item.url,
      name: item.name ?? "uploaded.pdf"
    }
  }
}));
 let answer;

 try{
const answer= await generateAnswer(uploadResponse);

console.log(answer);
 } catch (error) {
  console.error('Error generating answer:', error);
 try{
   // Assuming you want to use the uploaded file's URL as input
   const fileUrl = uploadResponse[0]?.serverData.file.url;
   answer = await generateAnswerwithgeminiAI(fileUrl);
    console.log("Gemini Answer:", answer);
 }catch (geminiError){
  console.error('Gemini API failed:', geminiError);
 }
toast.loading('HANG tight! The AI is working its magic')
/*
const {data =null , message=null}=answer ||{};
if(data){
  // save the summary to the database
  toast.loading('Saving answer so you can access at anytiem ! checl out previous questions');  
}*/
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
