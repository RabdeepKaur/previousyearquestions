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
import { getAnswer } from "@/lib/answer";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Noanswer from "@/components/answer/noanswer";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await currentUser();
  if (!user?.id) return redirect("/sign-in");

  const uploadLimit = 1; // Set your desired limit here
  const answers = await getAnswer(user.id);
  console.log("Fetched answers:", answers);

  // Check if user is trying to upload and has reached the limit
  const isUploadAttempt = searchParams.upload === "true" || searchParams.action === "upload";
  
  // Redirect if user tries to upload AND dashboard is not empty (already has uploads)
  if (isUploadAttempt && answers.length > 0) {
    // Redirect to sign-in page if user tries to upload when they already have content
    return redirect("/sign-in");
  }

  return (
    <div className="flex flex-col min-h-screen bg-[radial-gradient(circle,rgba(161,240,149,1)_0%,rgba(237,223,223,1)_96%)]">
      <p className="flex item-center justify-center text-3xl font-semibold mb-6 mt-10 text-black">
        WELCOME TO DASHBOARD!
      </p>
      
      {/* Show upload limit status */}
      <div className="flex justify-center mb-4">
        <p className="text-sm text-gray-600">
          Uploads: {answers.length}/{uploadLimit}
          {answers.length >= uploadLimit && (
            <span className="text-red-500 ml-2">(Limit Reached)</span>
          )}
        </p>
      </div>

      {answers.length === 0 ? (
        <Noanswer />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-30 py-20 h-[300px]">
          {answers.map((answer: any, index: number) => (
            <Answer key={index} answer={answer} userId={user.id} />
          ))}
        </div>
      )}
    </div>
  );
}