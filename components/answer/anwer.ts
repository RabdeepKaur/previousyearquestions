import { getDB } from "@/lib/DB";
export async function getanswerById(id:string){
    try{
        const sql=await getDB();
const [answer]=await sql`SELECT * FROM answer WHERE id=${id}`;
return answer;
    }catch(error){
        console.log("Error fetching answer by ID:", error);
        return null;
    }
}