/*
import Link from "next/link";
import { Card } from "../ui/card";
import DeleteButton from "./Deletebutton";
import { FileText } from "lucide-react";

const AnswerHeader = ({
    fileUrl,
    title,
    createdAt,
}:{
    fileUrl:string;
    title:string;
    createdAt:Date;
})=>{
    return(
    <div className="flex items-start gap-2 sm:gap-4">
        <FileText className="w-30 h-30 sm:w-8 sm:h-8 text-gray-500" />
        <div className="flex-1 min-w-0">
<h3 className="text-base xl:text-lg font-semibold text-gra truncate w-4/5">
{title}
</h3>
<p className="text-sm text-gray-500">2024</p>
</div>
    </div>)
};
export function Answer({answer}: {answer:any}) {
    return (
        <div>
            <Card className ="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-6xl mx-auto h-50 x-50 ">
                <div className="abouslute top-2 right-2">
                    <DeleteButton/>
                </div>
                <Link href={`answer/${answer.id}`} className="block p-2 sm:p-6">
<h3 className="text-base xl:text-lg font-semibold  text-gray-900 truncate w-4/5">
<div className="flex flex-col gap-3 sm:gap-4">
<AnswerHeader fileUrl={answer.original_file_url} title={answer.title} createdAt={answer.createdAt} />
</div>
</h3>
<p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-2">{answer.answer_text}</p>

                </Link>
            </Card>
        </div>
    )
}*/
import Link from "next/link";
import { Card } from "../ui/card";
import DeleteButton from "./Deletebutton";
import { FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns"
import { formatFileName } from "@/lib/utils";

const AnswerHeader = ({
  title,
  createdAt,
}: {
  title: string;
  createdAt: Date;
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-black truncate">{title}</h3>
      <p className="text-xs text-black">
        {createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
    </div>
  );
}; 

export function Answer({ answer,userId }: { answer: any,userId:string }) {
  return (
   <Card className="relative p-4 sm:p-5 shadow-lg hover:shadow-xl transition rounded-xl bg-white border-2">
  <Link href={`/answer/${answer.id}`} className="block space-y-3">
    
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
      <div className="flex items-center gap-2 sm:gap-3">
        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
        <AnswerHeader
          title={answer.title || formatFileName(answer.original_file_url)}
          createdAt={new Date(answer.createdAt)}
        />
      </div>

      {/* Date → shifts below on mobile */}
      <p className="text-xs text-gray-600 sm:ml-auto mt-1 sm:mt-0">
        {formatDistanceToNow(new Date(answer.createdAt), { addSuffix: true })}
      </p>
    </div>

    {/* Answer Preview */}
    <p className="text-sm sm:text-base text-black line-clamp-3">
      {answer.answer}
    </p>

    {/* Delete button (always aligned bottom-right) */}
    <div className="flex justify-end">
      <DeleteButton answerId={answer.id} userId={userId} />
    </div>
  </Link>
</Card>
  )
}
