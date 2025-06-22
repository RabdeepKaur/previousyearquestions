"use client";
import { useUploadThing } from "@/utils/uploadting";
import UploadFormInput from "./uploadform-input";
import {set, z} from 'zod';
import { toast } from "sonner";
import { generateAnswer } from "@/actions/uploadaction";
import { useRef, useState } from "react";
import { generateAnswerwithgeminiAI } from "@/lib/gemini";

async function fetchFileText(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch file content');
  return await response.text(); // For PDF, you'll likely need PDF parsing logic
}

const schema = z.object({
  questionPaper: z.instanceof(File, {message: 'Invalid question paper file'})
    .refine((file) => file.size <= 20*1024*1024, {
      message: ' question paper File size should be less than 24MB'
    })
    .refine((file)=>file.type.startsWith('application/pdf'), {
      message: ' question paper File type should be PDF'
    }),
    notes: z.instanceof(File, {message: 'Invalid notes file'})
    .refine((file) => file.size <= 20*1024*1024
, {
      message: 'Notes File size should be less than 24MB'
    })
    .refine((file)=>file.type.startsWith('application/pdf'), {
      message: 'Notes File type should be PDF'
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
   const questionPaper=formData.get('questionPaper') as File;
   const notes=formData.get('notes') as File;


   //validation => schema usign zod =>upload file to upload thing =>parse the pdf usig langchain => summarithe pdf sing ai
// parsing of the pf wiht longchin

const validationFields=schema.safeParse({
  questionPaper: questionPaper,
  notes: notes
})
if(!validationFields.success){
    toast.error(validationFields.error.flatten().fieldErrors.questionPaper?.[0] ?? 'Invalid file')
    setIsLoading(false);
   return
}
toast.success('File is valid')
console.log(validationFields);


const resp = await startUpload([questionPaper ,notes]);
if (!resp) {
  toast.error("Failed to upload file. Please try again.");
  return ("OOPS ! looks like you have not singup to us yet or you are not logged in");
}
toast.loading('We are uploading your pdf')


// Transform resp to match generateAnswer's expected input
const uploadResponse = resp.map((item) => ({
 serverData: {
    userId: item.serverData?.uploadedBy ?? "unknown",
    questionPaper: {
      url: item.url,
      name: item.name ?? "uploaded.pdf"
    },
    notes: {
      url: item.url,
      name: item.name ?? "uploaded.pdf"
    }
  }
}));
 let answer;

 try{
const answer= await generateAnswer(uploadResponse);

console.log("openai answer",answer);
toast.success('Answer generated using OpenAI');
 } catch (error) {
  console.error('Error generating answer using openai:', error);
 try{
   // Assuming you want to use the uploaded file's URL as input
 const questionPaperText = await fetchFileText(uploadResponse[0].serverData.questionPaper.url);
  const notesText = await fetchFileText(uploadResponse[0].serverData.notes.url);
  
answer = await generateAnswerwithgeminiAI(questionPaperText, notesText);  

  console.log({ answer });
    console.log("Gemini Answer:", answer);
 }
 catch (geminiError){
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
