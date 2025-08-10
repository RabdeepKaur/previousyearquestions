import { Answer } from "@/components/answer/answer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getAnswer } from "@/lib/answer";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import{Card} from "@/components/ui/card"


export default async function DashboardPage() {
  const user =await currentUser();
  const UserId = user?.id;
  if(!user?.id) return redirect ('/sign-in');
  const uploadLimit = 3; // Set your desired limit here
const answer= await getAnswer("userId"); // Replace "user-id" with the actual user ID

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-lg mt-2">Welcome to your dashboard!</p>
      <div>
        <Button variant ={'link'} className="border border-gray-300 bg-primary text-white hover:bg-gray-100 hover:text-primary rounded-md shadow-sm px-4 py-2">
            <Link href="/upload">
            <Plus className=" w-5 h-5 mr-2"></Plus>
                New Answers</Link>
        </Button>
      </div>
      <Card className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-6xl mx-auto ">
<Link href="/Answer">{answer.map((answer, index) => (
        <Answer key={index} answer={answer} />
        ))}</Link>
      </Card>
    </div>
  );
}