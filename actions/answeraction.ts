"use server"
import { getDB } from "@/lib/DB";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// this file is for CRUD fucntion in the dashbord or anser page 
export async function deleteAnswer(userId:string, answerId:string) {
    try{
// delete from databse 
// delte from cache
const user=await currentUser();
if(!user?.id) throw new Error("Not authenticated");
if(user.id !== userId) throw new Error("Unauthorized");
const sql=await  getDB();
const result=await sql`DELETE FROM answers WHERE id=${answerId} AND user_id=${userId} RETURNING *`;
if(result.length===0) {
    revalidatePath('/dashboard'); // removing of the chace from dashboard page
    return {success:true}
}
return {success:false}
    }catch(error){
        console.log("Error deleting answer:", error);
return {success:false}
    }
}