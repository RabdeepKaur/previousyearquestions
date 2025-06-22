/*
import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";


const f= createUploadthing()

export const ourFileRouter={
    pdfUploader: f({pdf: {maxFileSize: "32MB"}})
    .middleware(async ({req}) => {
        //get user info 
        const user= await currentUser();

        if(!user)throw new UploadThingError("Unauthorized");
        return {userId:user.id};
}
    ).onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
 
      // Whatever is returned here will be sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter; 
export type OurFileRouter= typeof ourFileRouter;*/
import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Option 1: Allow anonymous uploads (no authentication required)
  pdfUploader: f({ pdf: { maxFileSize: "32MB" , maxFileCount:10 } })
    .middleware(async ({ req }) => {
      // Optional: Get user info if available, but don't require it
      const user = await currentUser();
      
      return { 
        userId: user?.id || "anonymous",
        isAuthenticated: !!user 
      };
    })
    .onUploadComplete(async ({ metadata,file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      
      // Return file info that can be accessed publicly
      return { 
        uploadedBy: metadata.userId, 
        url: file.url,
        isPublic: true
      };
    }),

  // Option 2: Require auth for upload but allow public access to files
  authenticatedPdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      // Require authentication for upload
      const user = await currentUser();
      if (!user) throw new UploadThingError("Unauthorized");
      
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      
      // Store file info in your database with public access flag
      // await db.files.create({
      //   userId: metadata.userId,
      //   url: file.url,
      //   isPublic: true,
      //   filename: file.name
      // });
      
      return { 
        uploadedBy: metadata.userId, 
        url: file.url 
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;