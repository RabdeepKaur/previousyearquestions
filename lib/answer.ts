
import { getDB } from "./DB";

export async function getAnswer(userid: string) {
    const sql=await getDB();
    const answer=await sql 'SELECT'
}