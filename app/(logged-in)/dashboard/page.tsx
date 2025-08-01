import { Answer } from "@/components/answer/answer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const uploadLimit = 6; // Set your desired limit here
const answer=[
    {
        id:1,
        title: "Answer 1",
        desciprtion: "This is the description for answer 1",
        createdAt: new Date(),
        answer_text:"desciption"
    }
]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg">Welcome to your dashboard!</p>
      <div>
        <Button variant ={'link'} className="border border-gray-300 bg-primary text-white hover:bg-gray-100 hover:text-primary rounded-md shadow-sm px-4 py-2">
            <Link href="/uploads">
            <Plus className=" w-5 h-5 mr-2"></Plus>
                New Answers</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:px-0 gap-4 mt-8">
{answer.map((answer, index) => (
        <Answer key={index} answer={answer} />
        ))}
      </div>
    </div>
  );
}