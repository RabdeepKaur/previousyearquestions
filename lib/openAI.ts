import { Answer_system_prompt } from "@/utils/prompts";
import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAnswerAI(pdfText:string) {
try{
    const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        {
            role: "system",
            content: Answer_system_prompt,
        },
        {
            role: "user",
            content: ` **STUDY MATERIAL:**
[Your parsed notes content]
[Your parsed Question content]
**PREVIOUS YEAR QUESTION:**
Question: [Question text]
Marks: [X marks]
Subject: [Subject name]

**REQUIREMENTS:**
- Write answer appropriate for [X] marks
- Use academic language
- Include examples from the notes where relevant

Generate the complete answer now.\n\n${pdfText}`,
        },
    ],
    temperature: 0.7,
    max_tokens: 1500
});
return response.choices[0].message.content;
}
catch (error:any) {
if(error?.status === 429) {
    throw new Error("Rate limit exceeded. Please try again later.");
}
throw error;
}
}
