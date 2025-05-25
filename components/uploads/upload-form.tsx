"use client";
import { useUploadThing } from "@/utils/uploadting";
import UploadFormInput from "./uploadform-input";
import {z} from 'zod';

const schema = z.object({
  file: z.instanceof(File, {message: 'Invalid file'})
    .refine((file) => file.size <= 20*1024*1024, {
      message: 'File size should be less than 24MB'
    })
    .refine((file)=>file.type.startsWith('application/pdf'), {
      message: 'File type should be PDF'
    })
});

export default function UploadForm(){
  const{startUpload,routeConfig}=useUploadThing('pdfUploader',{
    onClientUploadComplete:()=>{
      console.log('upload Sucessfully')
    },
    
   onUploadBegin: ({ file }) => {
      console.log("Upload has begun for", file);
    }
  });

const handleSubmit= async(e:React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault()
   console.log('submitted')
   const formData=new FormData(e.currentTarget)
   const file=formData.get('file') as File;

   //validation => schema usign zod =>upload file to upload thing =>parse the pdf usig langchain => summarithe pdf sing ai


const validationFields=schema.safeParse({file})
if(!validationFields.success){
   console.log(validationFields.error.flatten().fieldErrors.file?.[0]??'Invalid file')
   return
}
console.log(validationFields);
const resp=await startUpload([file]);
if(!resp){
  return ("OOPS ! looks like you have not singup to us yet or you are not logged in");
}

};
return(
   <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
   <UploadFormInput onSubmit={handleSubmit}/>
   </div>
)
}
