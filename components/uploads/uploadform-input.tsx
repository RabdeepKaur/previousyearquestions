"use client";
import React, { forwardRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";


interface UploadFormInputProps {
    onSubmit: (e:React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}
const UploadFromInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
    ({ onSubmit,isLoading }, ref) => {
        return (
            <div className="flex  items-center justify-center">
                <form ref={ref} className="flex flex-col gap-4 py-10" onSubmit={onSubmit} >
                <div className="flex jusitfy-end items-center gap-1">
        <Input 
        id="file"
        type="file"
        name="questionPaper"
        accept="application/pdf"
        required
        disabled={isLoading}
        placeholder="Upload your question paper"
        className={cn(isLoading && 'opacity-50 cursor-not-allowed')}/>
        </div>
        <div className="flex items-center justify-center "> 
        <Input 
        id="file"
        type="file"
        name="notes"
        accept="application/pdf"
        required
        disabled={isLoading}
        placeholder="Upload your notes"
        className={cn(isLoading && 'opacity-50 cursor-not-allowed')}/>
        </div>
        <div>
        <Button disabled={isLoading}>{isLoading ?(<> <Loader2 className="mr-2 h-4 w-4 aniamte-spin"/></>):('Upload your  question paper')}</Button>
</div>
</form>
        </div>
    );
    }
);
UploadFromInput.displayName=" UploadFromInput";
export default UploadFromInput;