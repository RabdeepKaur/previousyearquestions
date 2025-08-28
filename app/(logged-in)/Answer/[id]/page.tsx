// app/answer/[id]/page.tsx
import { notFound } from "next/navigation";
import { getanswerById } from "@/components/answer/anwer";


export default async function AnswerPage(props:{params:Promise<{id:string}>}) {
  const params=await props.params;
  const id=params.id;
  const answer = await getanswerById(id);

  if (!answer) {
  console.log("not found ")
    return notFound();
  }
const{title, content}=answer;
  return (
    <div className= " relative isolate min-h-screen px-4 sm:px-6 px-8 sm:py-12">
      <div className="conatiner mx-auto flex flex-col gap-4">
        <div className="flex flex-col">{answer.title}</div>
      <h1 className="text-2xl font-bold">{answer.subject}</h1>
      <p className="text-gray-500 mb-4">
        {new Date(answer.createdAt).toLocaleDateString()}
        helloe
      </p>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <pre className="whitespace-pre-wrap">{answer.content}</pre>
      </div>
    </div>
    </div>
  );
}
