
import { getDB } from "./DB";

export async function getAnswer(userId: string) {
    const sql=await getDB();
    const answer =await sql `SELECT * FROM answer 
  WHERE "userId" = ${userId}`;
    return answer ;
}