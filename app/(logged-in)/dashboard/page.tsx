/*import { Answer } from "@/components/answer/answer";
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
  const uploadLimit = 1; // Set your desired limit here
const answer= await getAnswer(); // Replace "user-id" with the actual user ID

  return (
    <div className=" flex flex-col px-100 mt-10 min-h-screen">
      <p className="text-3xl p-4">Welcome to your dashboard!</p>
      <div>
        <Button variant ={'link'} className="border border-gray-300 bg-primary text-white hover:bg-gray-100 hover:text-primary rounded-md shadow-sm px-4 py-2">
            <Link href="/upload">
            <Plus className=" w-5 h-5 mr-2"></Plus>
                New Answers</Link>
        </Button>
      </div>
      <Card className="grid grid-cols-1 sm:gap-6 md:grid-cols-2  mt-8 max-w-6xl mx-auto ">
<Link href="/Answer">{answer.map((answer, index) => (
        <Answer key={index} answer={answer} />
        ))}</Link>
      </Card>
    </div>
  );
}*/
import { Answer } from "@/components/answer/answer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getAnswer } from "@/lib/answer";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user?.id) return redirect("/sign-in");

  const answers = await getAnswer(user.id);
console.log("Fetched answers:", answers);
  return (
    <div className="flex flex-col px-6 mt-10 min-h-screen">
      <p className="text-3xl font-semibold mb-6">Welcome to your dashboard!</p>

      <div className="mb-6">
        <Link href="/upload">
          <Button className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90">
            <Plus className="w-5 h-5" />
            New Answer
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {answers.map((answer: any, index: number) => (
          <Answer key={index} answer={answer} />
        ))}
      </div>
    </div>
  );
}
