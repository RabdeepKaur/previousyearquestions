"use server"

import { generateAnswerwithgeminiAI } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchanin";
import { generateAnswerAI } from "@/lib/openAI";

export async function generateAnswer(uploadResponse:[{
    serverData:{
        userId:string;
        file:{
            url:string;
            name:string;
        }
    }
}]) {
    if(!uploadResponse){
        return{
            success:false,
            message:'file upload failed',
            data:null,
        }
    }
    const [{ serverData: { userId, file: { url:pdfurl, name:filename } } }] = uploadResponse;
    if(!uploadResponse){
        return{
            success:false,
            message:'file upload failed',
            data:null,
        }
    }
    try{
const pdfText=await fetchAndExtractPdfText(pdfurl);
console.log(pdfText);
let summary;
try{
    summary = await generateAnswerAI(pdfText);
    console.log({summary});
}catch(error){
    console.log(error)
    //call geminiapi 
    if(error instanceof Error && error.message==='RATE_LIMIT_EXCEEDED'){
        try{
summary = await generateAnswerwithgeminiAI(pdfText);
        }catch(geminiError){
console.error(
    'Gemini API failed after OpenAI quote exceeded'
);
throw new Error('Failed to generate summary after OpenAI quote exceeded');
        }
    }
}
if(!summary) {
    return{
        success:false,
        message:'Failed to generate summary',
        data:null,
    }
}
return{
    success:true,
    message:'file upload and Answer generation successful',
    data:{
        summary,
    }
}
    }catch(err){
        return{
            success:false,
            message:'file uplaod failed',
            data:null,
        }
    }
}