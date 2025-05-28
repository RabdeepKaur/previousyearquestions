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
            <div>
                <form ref={ref} className="flex flex-col gap-4 py-1" onSubmit={onSubmit} >
                <div className="flex jusitfy-end items-center gap-1">
        <Input 
        id="file"
        type="file"
        name="file"
        accept="application/pdf"
        required
        disabled={isLoading}
        className={cn(isLoading && 'opacity-50 cursor-not-allowed')}/>
        <Button disabled={isLoading}>{isLoading ?(<> <Loader2 className="mr-2 h-4 w-4 aniamte-spin"/></>):('Upload your  question paper')}</Button>
        </div>
        <div className="flex jusitfy-end items-center gap-1">
        <Input type ="file"/>
<Button>upload your notes</Button>
</div>
</form>
        </div>
    );
    }
);
UploadFromInput.displayName=" UploadFromInput";
export default UploadFromInput;