"use server "
// app/api/generateAnswer/route.ts
// this is the api to fecth the data from uploadsacin folder 
import { NextResponse } from "next/server";
import { generateAnswer } from "@/actions/uploadaction"; // your existing code


export async function POST(req: Request) {
  const { questionPaperUrl, notesUrl, subject } = await req.json();
  const result = await generateAnswer(questionPaperUrl, notesUrl, subject);
  
  return NextResponse.json({
    success: result.success, // the typescript error is making me crazy .
    message: result.message,
    answer: result.data?.answer || null,
    subject,
  });
}