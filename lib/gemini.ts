  import { Answer_system_prompt } from '@/utils/prompts';
 import {GoogleGenerativeAI} from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
 export  const  generateAnswerwithgeminiAI= async (pdfText:string)=>{
    try{
        const model =genAI.getGenerativeModel ({model:'gemini-1.5-pro-002',
            generationConfig:{
                temperature:0.7,
                maxOutputTokens:1500,
            }
        });
        const prompt=`${Answer_system_prompt}`;
        const result=await model.generateContent(prompt);
        const resposne=await result.response;
        if(!resposne.text()){
        throw new Error('No response from Gemini AI');
    }
    return resposne.text();
} catch (error) {
        console.error('gemini api error:',error);
        throw error;
    }
}