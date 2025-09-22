import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildAnswerPrompt } from "@/utils/prompts";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function generateAnswerwithgeminiAI(
  noteText: string,
  questionpaper: string,
  marks: number,
  subject: string
) {
  try {
    const prompt = buildAnswerPrompt(noteText, questionpaper, marks, subject);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 5000,
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    if (!response.text()) {
      throw new Error("No response from Gemini AI");
    }
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
}
