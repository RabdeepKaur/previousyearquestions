"use server"
import { generateAnswerwithgeminiAI } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchanin";
import { generateAnswerAI } from "@/lib/openAI";

/* I dont know if this is working or not beasue i cant see the consolelog , but we will keep it beause we need the fucntion .
  export function extractQuestionMarks(pdfText: string) {
  const marksArray: number[] = [];
  
  // Match things like "(10 marks)" or "10 Marks"
  const regex = /\(?(\d+)\s*marks?\)?/gi;
  let match;
  
  while ((match = regex.exec(pdfText)) !== null) {
    marksArray.push(parseInt(match[1], 10));
  }
  
  return marksArray;
}*/
export async function generateAnswer(
  uploadResponse: Array<{
    serverData: {
      userId: string;
      questionPaper: {
        url: string;
        name: string;
      };
      notes: {
        url: string;
        name: string;
      };
    };
  }>,
  marks: number,
  subject: string
) {
  if (!uploadResponse || !Array.isArray(uploadResponse) || uploadResponse.length === 0) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const [{ serverData }] = uploadResponse;

  if (!serverData?.questionPaper?.url || !serverData?.notes?.url) {
    return {
      success: false,
      message: "Missing question paper or notes",
      data: null,
    };
  }

  const { questionPaper, notes } = serverData;

  try {
    console.log("Processing Question Paper:", questionPaper.name, "from URL:", questionPaper.url);
    console.log("Processing Notes:", notes.name, "from URL:", notes.url);

    const pdfText = await fetchAndExtractPdfText(questionPaper.url);
    //const questionMarks = extractQuestionMarks(pdfText);

//console.log("Marks for each question:", questionMarks);

    const notesText = await fetchAndExtractPdfText(notes.url);

    console.log("Parsed Question Paper Text:", pdfText);
    console.log("Parsed Notes Text:", notesText);

    let answer;

    // Try OpenAI first
    try {
      answer = await generateAnswerAI(notesText, pdfText, marks, subject);
      console.log({ answer });
    } catch (error: any) {
      console.error("OpenAI API failed:", error);

      const statusCode = error?.response?.status || error?.statusCode || error?.code;
      console.log("Status code:", statusCode);

      if (statusCode === 429 || statusCode >= 500 || !statusCode) {
        try {
          answer = await generateAnswerwithgeminiAI(notesText, pdfText, marks, subject);
          console.log({ answer });
        } catch (geminiError) {
          console.error("Gemini API failed after OpenAI failure:", geminiError);
          throw new Error("Failed to generate answer from both OpenAI and Gemini");
        }
      }
    }

    if (!answer) {
      return {
        success: false,
        message: "Failed to generate answer",
      };
    }

    return {
      success: true,
      message: "Answer generated successfully",
      data: { answer },
    };
  } catch (err) {
    console.error("Processing error:", err);
    return {
      success: false,
      message: "File processing failed",
    };
  }
}
