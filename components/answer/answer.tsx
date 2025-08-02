
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
        <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
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
}