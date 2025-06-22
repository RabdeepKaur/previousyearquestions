"use server"

import { generateAnswerwithgeminiAI } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchanin";
import { generateAnswerAI } from "@/lib/openAI";

export async function generateAnswer(uploadResponse: Array<{
    serverData: {
        userId: string;
         questionPaper: {
            url: string;
            name: string;
        },
        notes:{
            url: string;
            name: string;
        }
    }
}>) {
    if(!uploadResponse || !Array.isArray(uploadResponse)|| uploadResponse.length === 0){
        return{
            success:false,
            message:'file upload failed',
            data:null,
        }
    }
    if(!uploadResponse[0]?.serverData?.questionPaper?.url){
        return{
            success:false,
            message:'file upload failed',
            data:null,
        }
    }
            const [{ serverData: { userId, questionPaper: { url:pdfurl, name:questionPaper } } }] = uploadResponse;
            const [{serverData: { userId: notesUserId, notes: { url: notesUrl, name: notesName } } }] = uploadResponse;
           
    try{
        console.log('processing pdf:',questionPaper, 'from URL:',pdfurl)
        console.log('processing notes:',notesName, 'from URL:',notesUrl)

const pdfText=await fetchAndExtractPdfText(pdfurl);
const notesText=await fetchAndExtractPdfText(notesUrl);

console.log("pdf is getting parseese",pdfText );
console.log("notes is getting parseese",notesText );
let answer;

try{
    const answer = await generateAnswerAI(pdfText);
    
    console.log({answer });
}
catch(error: any){
    console.error("open ai not working")

    //call geminiapi 
     const statusCode = error?.response?.status || error?.statusCode || error?.code;
console.log("statuscode:",statusCode)
   if(statusCode === 429 || statusCode >= 500 || !statusCode) {


        try{
            
answer = await generateAnswerwithgeminiAI(questionPaper, notesText);
console.log({answer});
        }
        catch(geminiError){
console.error(
    'Gemini API failed after OpenAI quote exceeded'
);
throw new Error('Failed to generate summary after OpenAI quote exceeded');
        }
    }
}
if(!answer) {
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
        answer,
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
