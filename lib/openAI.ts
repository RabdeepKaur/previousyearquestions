"use server";
import OpenAI from "openai";
import { buildAnswerPrompt } from "@/utils/prompts";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY||" "
});

export async function generateAnswerAI(
  noteText: string,
 questionpaper: string,
  marks: number,
  subject: string
) {
  try {
    const prompt = buildAnswerPrompt(noteText, questionpaper, marks, subject);

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an academic assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 5000,
    });

    return response.choices[0].message?.content;
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    throw error;
  }
}
