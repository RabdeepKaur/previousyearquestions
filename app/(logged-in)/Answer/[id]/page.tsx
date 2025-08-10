// app/answer/[id]/page.tsx
import { getAnswer } from "@/lib/answer";
import { notFound } from "next/navigation";

export default async function AnswerPage({ params}) {
  const answer = await getAnswer(params.id);

  if (!answer) return notFound();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold">{answer.subject}</h1>
      <p className="text-gray-500 mb-4">
        {new Date(answer.createdAt).toLocaleDateString()}
      </p>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <pre className="whitespace-pre-wrap">{answer.content}</pre>
      </div>
    </div>
  );
}
