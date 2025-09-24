/*"use client";
import { useUploadThing } from "@/utils/uploadting";
import UploadFormInput from "./uploadform-input";
import {set, z} from 'zod';
import { toast } from "sonner";
import { generateAnswer, storePdf } from "@/actions/uploadaction";
import { useRef, useState } from "react";
import { generateAnswerwithgeminiAI } from "@/lib/gemini";
import { useUser } from "@clerk/nextjs";

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
const { user } = useUser(); 
  const formRef = useRef<HTMLFormElement>(null); // reseting the form after the wrok is done
const [isLoading,setIsLoading]=useState(false);

//upload thing hooks 
  const{startUpload,routeConfig}=useUploadThing('pdfUploader',{
    onClientUploadComplete:()=>{
      console.log('upload Sucessfully')
       toast.success('Your file has been uploaded successfully.');
    }, 
    
  onUploadBegin: (file: File) => {
    console.log("Upload has begun for", file);
  }
  });
//submit button handler 
const handleSubmit= async(e:React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault()
   console.log('submitted')
const formData = new FormData(e.currentTarget);
const file=formData.get('questionPaper') as File;
   try{

setIsLoading(true);
   const formData=new FormData(e.currentTarget)
   const questionPaper=formData.get('questionPaper') as File;
   const notes=formData.get('notes') as File;


   

// validation of the file
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

//upload the file to uploadthing 
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
// parsingt h pdf 
const answer = await generateAnswer(uploadResponse, 100, 'Maths');

console.log("Answer from OpenAI:", answer);

// Safely destructure with defaults
const { data = null, message = null } = answer || {};

setIsLoading(false); // Stop loader after getting the answer

if (data) {
  toast(message || 'Saving PDF answer to dashboard...');
}

if (answer?.data?.answer) {
  try {
    const storeResult = await storePdf({
      userId: user?.id || "guest", // from Clerk auth
      sessionId: "some-session-id", // you need to generate or retrieve this dynamically
      originalFileUrl: uploadResponse[0].serverData.questionPaper.url,
      answerText: answer.data.answer,
      title: "Generated Answer",
      filename: uploadResponse[0].serverData.notes.name,
      fileUrl: uploadResponse[0].serverData.notes.url,
      uploadType: "generated-answer"
    });

    console.log("PDF Stored Result:", storeResult);
    toast.success('Answer saved to dashboard');
  } catch (error) {
    console.error("Error saving PDF:", error);
    toast.error('Failed to save the answer');
  }
} else {
  toast.error('No answer generated from OpenAI');
}
 

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
  
const answer = await generateAnswerwithgeminiAI(questionPaperText, notesText);  

  console.log({ answer });
    console.log("Gemini Answer:", answer);
 }
 catch (geminiError){
  console.error('Gemini API failed:', geminiError);
 }
toast.loading('HANG tight! The AI is working its magic')

 }
formRef.current?.reset();// reseting the form
   }
   catch(error){
    setIsLoading(false);
    console.error('Error during form submission:', error);
    formRef.current?.reset();
   }z
};
return(
   <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
   <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit}/>
   </div>
)
}
*/
/*
"use client";
import {useEffect} from "react"
import { useUploadThing } from "@/utils/uploadting";
import UploadFormInput from "./uploadform-input";
import { z } from 'zod';
import { toast } from "sonner";
import { generateAnswer, storePdf } from "@/actions/uploadaction";
import { useRef, useState } from "react";
import { generateAnswerwithgeminiAI } from "@/lib/gemini";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from 'uuid'; 
import {useRouter} from "next/navigation";
import {getanswerById} from "../answer/anwer"


async function fetchFileText(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch file content');
  return await response.text();
}

const schema = z.object({
  questionPaper: z.instanceof(File, { message: 'Invalid question paper file' })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: 'Question paper file size should be less than 20MB'
    })
    .refine((file) => file.type.startsWith('application/pdf'), {
      message: 'Question paper file type should be PDF'
    }),
  notes: z.instanceof(File, { message: 'Invalid notes file' })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: 'Notes file size should be less than 20MB'
    })
    .refine((file) => file.type.startsWith('application/pdf'), {
      message: 'Notes file type should be PDF'
    })
});

export default function UploadForm() {
  const { user } = useUser();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
   const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [isCheckingLimit, setIsCheckingLimit] = useState(true);
const router=useRouter();
  /* out of free limit logic here
const uploadLimit = 1;

 // Check user's existing uploads on component mount
  useEffect(() => {
    const checkUserUploads = async () => {
      if (user?.id) {
        try {
          const answers = await getanswerById(user.id);
          setUserAnswers(Array.isArray(answers) ? answers : []);
          console.log("Fetched answers:", answers);
          // If user already has uploads equal to or exceeding limit, redirect to dashboard
          if ((answers ?? []).length >= uploadLimit) {
            toast.error("You have reached your upload limit. Redirecting to dashboard...");
            router.push("/dashboard");
            return;
          }
        } catch (error) {
          console.error("Error checking user uploads:", error);
        }
      }
      setIsCheckingLimit(false);
    };

    checkUserUploads();
  }, [user?.id, router, uploadLimit]);


  
  // Upload thing hooks
  const { startUpload, routeConfig } = useUploadThing('pdfUploader', {
    onClientUploadComplete: () => {
      console.log('Upload successful');
      toast.success('Your files have been uploaded successfully.');
    },//Idontknow what wrong wiht this file , i think is a typescrit error
    onUploadBegin: ({ file }) => {
      console.log("Upload has begun for", file);
    }
  });

  // Submit button handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');

    if (!user?.id) {
      toast.error("Please SignIn to continue");
      return;
    }
 
 
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const questionPaper = formData.get('questionPaper') as File;
      const notes = formData.get('notes') as File;

      // Validation of the files
      const validationFields = schema.safeParse({
        questionPaper: questionPaper,
        notes: notes
      });

      if (!validationFields.success) {
        const errors = validationFields.error.flatten().fieldErrors;
        const errorMessage = errors.questionPaper?.[0] || errors.notes?.[0] || 'Invalid files';
        toast.error(errorMessage);
        setIsLoading(false);
        return;
      }

      toast.success('Files are valid');
      console.log('Validation successful:', validationFields);

      // Upload the files to uploadthing
      toast.loading('Uploading your PDFs...');
      const resp = await startUpload([questionPaper, notes]);
      
      if (!resp || resp.length < 2) {
        toast.error("Failed to upload files. Please try again.");
        setIsLoading(false);
        return;
      }

      // Separate question paper and notes from response
      const [questionPaperUpload, notesUpload] = resp;

      // Transform resp to match generateAnswer's expected input
      const uploadResponse = [{
        serverData: {
          userId: user.id,
          questionPaper: {
            url: questionPaperUpload.url,
            name: questionPaperUpload.name ?? "question-paper.pdf"
          },
          notes: {
            url: notesUpload.url,
            name: notesUpload.name ?? "notes.pdf"
          }
        }
      }];

      // Generate answer
      toast.loading('Generating answer...');
      const answer = await generateAnswer(uploadResponse, 100, 'Maths');
      console.log("Answer from AI:", answer);

      if (!answer?.success || !answer?.data?.answer) {
        toast.error(answer?.message || 'Failed to generate answer');
        setIsLoading(false);
        return;
      }

      // Store the answer in database
      toast.loading('Saving answer to dashboard...');
      const sessionId = uuidv4(); // Generate unique session ID
      
      const storeResult = await storePdf({
        userId: user.id,
        sessionId: sessionId,
        originalFileUrl: questionPaperUpload.url,
        answerText: answer.data.answer,
        title: `Generated Answer - ${new Date().toLocaleDateString()}`,
        filename: notesUpload.name ?? "notes.pdf",
        filePath: notesUpload.url,
        uploadType: "generated-answer"
      });

      console.log("PDF Store Result:", storeResult);

      if (storeResult?.success) {
        toast.success('Answer generated and saved to dashboard successfully!');
      } else {
        toast.error(storeResult?.message || 'Failed to save the answer');
      }

      // Reset form
      formRef.current?.reset();
      router.push(`/dashboard`) // Redirect to dashboard after successful upload and processing
      setIsLoading(false);

    } catch (error) {
      console.error('Error during form submission:', error);
      toast.error('An unexpected error occurred');
      setIsLoading(false);
      formRef.current?.reset();
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />
    </div>
  );
}*/
"use client";
import {useEffect} from "react"
import { useUploadThing } from "@/utils/uploadting";
import UploadFormInput from "./uploadform-input";
import { z } from 'zod';
import { toast } from "sonner";
import { generateAnswer, storePdf } from "@/actions/uploadaction";
import { useRef, useState } from "react";
import { generateAnswerwithgeminiAI } from "@/lib/gemini";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from 'uuid'; 
import {useRouter} from "next/navigation";
import {getanswerById} from "../answer/anwer"
import { Upload } from "lucide-react";
import { Card } from "../ui/card";

async function fetchFileText(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch file content');
  return await response.text();
}

const schema = z.object({
  questionPaper: z.instanceof(File, { message: 'Invalid question paper file' })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: 'Question paper file size should be less than 20MB'
    })
    .refine((file) => file.type.startsWith('application/pdf'), {
      message: 'Question paper file type should be PDF'
    }),
  notes: z.instanceof(File, { message: 'Invalid notes file' })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: 'Notes file size should be less than 20MB'
    })
    .refine((file) => file.type.startsWith('application/pdf'), {
      message: 'Notes file type should be PDF'
    })
});

export default function UploadForm() {
  const { user } = useUser();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const router = useRouter();

  
 
  // Upload thing hooks
  const { startUpload, routeConfig } = useUploadThing('pdfUploader', {
    onClientUploadComplete: () => {
      console.log('Upload successful');
      toast.success('Your files have been uploaded successfully.');
    },
    onUploadBegin: ({ file }) => {
      console.log("Upload has begun for", file);
    }
  });

  // Submit button handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');

    if (!user?.id) {
      toast.error("Please SignIn to continue");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const questionPaper = formData.get('questionPaper') as File;
      const notes = formData.get('notes') as File;

      // Validation of the files
      const validationFields = schema.safeParse({
        questionPaper: questionPaper,
        notes: notes
      });

      if (!validationFields.success) {
        const errors = validationFields.error.flatten().fieldErrors;
        const errorMessage = errors.questionPaper?.[0] || errors.notes?.[0] || 'Invalid files';
        toast.error(errorMessage);
        setIsLoading(false);
        return;
      }

      toast.success('Files are valid');
      console.log('Validation successful:', validationFields);

      // Upload the files to uploadthing
      toast.loading('Uploading your PDFs...');
      const resp = await startUpload([questionPaper, notes]);
      
      if (!resp || resp.length < 2) {
        toast.error("Failed to upload files. Please try again.");
        setIsLoading(false);
        return;
      }

      // Separate question paper and notes from response
      const [questionPaperUpload, notesUpload] = resp;

      // Transform resp to match generateAnswer's expected input
      const uploadResponse = [{
        serverData: {
          userId: user.id,
          questionPaper: {
            url: questionPaperUpload.url,
            name: questionPaperUpload.name ?? "question-paper.pdf"
          },
          notes: {
            url: notesUpload.url,
            name: notesUpload.name ?? "notes.pdf"
          }
        }
      }];

      // Generate answer
      toast.loading('Generating answer...');
      const answer = await generateAnswer(uploadResponse, 100, 'Maths');
      console.log("Answer from AI:", answer);

      if (!answer?.success || !answer?.data?.answer) {
        toast.error(answer?.message || 'Failed to generate answer');
        setIsLoading(false);
        return;
      }

      // Store the answer in database
      toast.loading('Saving answer to dashboard...');
      const sessionId = uuidv4(); // Generate unique session ID
      
      const storeResult = await storePdf({
        userId: user.id,
        sessionId: sessionId,
        originalFileUrl: questionPaperUpload.url,
        answerText: answer.data.answer,
        title: `Generated Answer - ${new Date().toLocaleDateString()}`,
        filename: notesUpload.name ?? "notes.pdf",
        filePath: notesUpload.url,
        uploadType: "generated-answer"
      });

      console.log("PDF Store Result:", storeResult);

      if (storeResult?.success) {
        toast.success('Answer generated and saved to dashboard successfully!');
        // Update the userAnswers state to reflect the new upload
        setUserAnswers(prev => [...prev, storeResult.data]);
      } else {
        toast.error(storeResult?.message || 'Failed to save the answer');
      }

      // Reset form
      formRef.current?.reset();
      router.push(`/dashboard`); // Redirect to dashboard after successful upload and processing
      setIsLoading(false);

    } catch (error) {
      console.error('Error during form submission:', error);
      toast.error('An unexpected error occurred');
      setIsLoading(false);
      formRef.current?.reset();
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <div className="text-sm text-gray-600 mb-4">
      </div>
      <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />
    </div>
  );
}