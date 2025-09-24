/*"use server" //server action file:- works directly on the server 
import { generateAnswerwithgeminiAI } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchanin";
import { generateAnswerAI } from "@/lib/openAI";
import {auth} from "@clerk/nextjs/server"
import {getDB} from "@/lib/DB"

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
}

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
      data:{answer: answer
      } ,
    };
  } catch (err) {
    console.error("Processing error:", err);
    return {
      success: false,
      message: "File processing failed",
    };
  }
}
// saving of data to the db
interface SavePdfInput {
  userId: string;
  sessionId: string;
  originalFileUrl: string;
  answerText?: string;
  title?: string;
  filename: string;
  fileUrl?: string;
  uploadType?: string;
}

async function savePdf({
  userId,
  sessionId,
  originalFileUrl,
  answerText,
  title,
  filename,
  fileUrl,
  uploadType
}: SavePdfInput) {
  try {
    const sql = await getDB();

    const [result] = await sql`
      INSERT INTO answer (
        userId, sessionId, originalFileUrl, answerText, title, filename, fileUrl, uploadType
      )
      VALUES (
        ${userId}, ${sessionId}, ${originalFileUrl}, ${answerText}, ${title}, ${filename}, ${fileUrl}, ${uploadType}
      )
      RETURNING *;
    `;

    return result;
  } catch (error) {
    console.error("Error saving Pdf summary", error);
    throw error;
  }
}

export async function storePdf(
  input: SavePdfInput   // take the full input object
) {
  try {
    // Authenticate user
    const authData = await auth();
    if (!authData?.userId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Always use userId from auth(), not the caller (for security)
    const result = await savePdf({
      ...input,
      userId: authData.userId,
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error saving pdf",
    };
  }
}
*/"use server"
import { generateAnswerwithgeminiAI } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchanin";
import { generateAnswerAI } from "@/lib/openAI";
import { auth, clerkClient } from "@clerk/nextjs/server"
import { getDB } from "@/lib/DB"
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from "next/cache";
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
  marks: number = 100,
  subject: string = 'General'
) {
  if (!uploadResponse || !Array.isArray(uploadResponse) || uploadResponse.length === 0) {
    return {
      success: false,
      message: "File upload failed - no upload response",
      data: null,
    };
  }

  const [{ serverData }] = uploadResponse;

  if (!serverData?.questionPaper?.url || !serverData?.notes?.url) {
    return {
      success: false,
      message: "Missing question paper or notes URL",
      data: null,
    };
  }

  const { questionPaper, notes } = serverData;

  try {
    console.log("Processing Question Paper:", questionPaper.name, "from URL:", questionPaper.url);
    console.log("Processing Notes:", notes.name, "from URL:", notes.url);

    // Extract text from PDFs
    const [pdfText, notesText] = await Promise.all([
      fetchAndExtractPdfText(questionPaper.url),
      fetchAndExtractPdfText(notes.url)
    ]);

    console.log("Parsed Question Paper Text length:", pdfText?.length || 0);
    console.log("Parsed Notes Text length:", notesText?.length || 0);

    if (!pdfText || !notesText) {
      return {
        success: false,
        message: "Failed to extract text from PDFs",
        data: null,
      };
    }

    let answer;

    // Try OpenAI first
    try {
      answer = await generateAnswerAI(notesText, pdfText, marks, subject);
      console.log("OpenAI answer generated successfully");
    } catch (openAIError: any) {
      console.error("OpenAI API failed:", openAIError);

      const statusCode = openAIError?.response?.status || openAIError?.statusCode || openAIError?.code;
      console.log("OpenAI error status code:", statusCode);

      // Fallback to Gemini for rate limits or server errors
      if (statusCode === 429 || statusCode >= 500 || !statusCode) {
        try {
          console.log("Falling back to Gemini AI...");
          answer = await generateAnswerwithgeminiAI(notesText, pdfText, marks, subject);
          console.log("Gemini answer generated successfully");
        } catch (geminiError) {
          console.error("Gemini API also failed:", geminiError);
          return {
            success: false,
            message: "Failed to generate answer from both OpenAI and Gemini",
            data: null,
          };
        }
      } else {
        return {
          success: false,
          message: `OpenAI API error: ${openAIError.message}`,
          data: null,
        };
      }
    }

    if (!answer) {
      return {
        success: false,
        message: "No answer generated from AI services",
        data: null,
      };
    }

    return {
      success: true,
      message: "Answer generated successfully",
      data: { answer: answer },
    };
    
  } catch (error) {
    console.error("Processing error:", error);
    return {
      success: false,
      message: `File processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      data: null,
    };
  }
}

// Database save interface - updated to match Prisma schema
interface SavePdfInput {
  userId: string;
  sessionId: string;
  originalFileUrl: string;
  answerText?: string;
  title?: string;
  filename: string;
  filePath?: string;  // Changed from fileUrl to filePath to match schema
  uploadType?: string;
}

// Function to sync Clerk user with database
async function ensureUserExists(userId: string) {
  try {
    const sql = await getDB();
    
    // Check if user exists
    const [existingUser] = await sql`
      SELECT id FROM "User" WHERE id = ${userId}
    `;

    if (!existingUser) {
      // Get user info from Clerk // there is some probelm wiht the clerk async fucntion wiht the databse 
     const clerkUser = await (await clerkClient()).users.getUser(userId);
      
      const email = clerkUser.emailAddresses[0]?.emailAddress || `${userId}@temp.email`;
      const fullName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || null;

      // Create the user
      await sql`
        INSERT INTO "User" (id, email, "fullName", "createdAt", "updatedAt", status)
        VALUES (${userId}, ${email}, ${fullName}, NOW(), NOW(), 'inactive')
        ON CONFLICT (id) DO UPDATE SET
          email = EXCLUDED.email,
          "fullName" = EXCLUDED."fullName",
          "updatedAt" = NOW()
      `;
      
      console.log("Created/updated user in database:", { userId, email, fullName });
    }
    
    return true;
  } catch (error) {
    console.error("Error ensuring user exists:", error);
    // Fallback: create minimal user record
    const sql = await getDB();
    await sql`
      INSERT INTO "User" (id, email, "createdAt", "updatedAt", status)
      VALUES (${userId}, ${userId + '@temp.email'}, NOW(), NOW(), 'inactive')
      ON CONFLICT (id) DO NOTHING
    `;
    return true;
  }
}

async function savePdf({
  userId,
  sessionId,
  originalFileUrl,
  answerText,
  title,
  filename,
  filePath,
  uploadType
}: SavePdfInput) {
  try {
    const sql = await getDB();

    // Check if the required fields are present
    if (!userId || !sessionId || !originalFileUrl) {
      throw new Error("Missing required fields: userId, sessionId, or originalFileUrl");
    }

    // Ensure the user exists in the database
    await ensureUserExists(userId);

    // Check if the session exists, if not create it
    const [existingSession] = await sql`
      SELECT id FROM "Session" WHERE "sessionId" = ${sessionId}
    `;

    if (!existingSession) {
      // Create a new session
      await sql`
        INSERT INTO "Session" ("id", "sessionId", "userId", "uploadsUsed", "maxUploads", "createdAt", "expiresAt")
        VALUES (${sessionId}, ${sessionId}, ${userId}, 1, 2, NOW(), NOW() + INTERVAL '7 days')
      `;
      console.log("Created new session:", sessionId);
    } else {
      // Update uploads used count
      await sql`
        UPDATE "Session" 
        SET "uploadsUsed" = "uploadsUsed" + 1 
        WHERE "sessionId" = ${sessionId}
      `;
      console.log("Updated session upload count:", sessionId);
    }

    console.log("Attempting to save PDF with data:", {
      userId,
      sessionId,
      originalFileUrl,
      answerText: answerText ? `${answerText.substring(0, 100)}...` : null,
      title,
      filename,
      filePath,
      uploadType
    });

    // Generate UUID for the answer record
    const answerId = uuidv4();

    const [result] = await sql`
      INSERT INTO answer (
        id, "userId", "sessionId", "originalFileUrl", "answerText", status, title, filename, "filePath", "uploadType", "createdAt"
      )
      VALUES (
        ${answerId},
        ${userId}, 
        ${sessionId}, 
        ${originalFileUrl}, 
        ${answerText || null}, 
        ${'complete'},
        ${title || 'Generated Answer'}, 
        ${filename}, 
        ${filePath || null}, 
        ${uploadType || 'generated-answer'},
        NOW()
      )
      RETURNING *;
    `;

    console.log("Successfully saved PDF to database:", result);
    return result;

  } catch (error) {
    console.error("Error saving PDF to database:", error);
    throw new Error(`Database save failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function storePdf(input: SavePdfInput) {
  try {
    // Authenticate user
    const authData = await auth();
    
    if (!authData?.userId) {
      console.error("Authentication failed - no user ID");
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    // Validate input
    if (!input.sessionId || !input.originalFileUrl || !input.filename) {
      console.error("Missing required input fields:", input);
      return {
        success: false,
        message: "Missing required fields",
      };
    }

    // Use authenticated userId for security (ignore the passed userId)
    const result = await savePdf({
      ...input,
      userId: authData.userId,
    });
    revalidatePath('/dashboard'); // Revalidate the dashboard path to reflect new data
    return {
      success: true,
      message: "Answer saved successfully",
      data: result,
    };

  } catch (error) {
    console.error("Error in storePdf:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error saving PDF answer",
    };
  }
}