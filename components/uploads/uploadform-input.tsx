"use client";
import React, { forwardRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader2, Upload } from "lucide-react";
import { Card } from "../ui/card";



interface UploadFormInputProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}

const UploadFromInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
    ({ onSubmit, isLoading }, ref) => {
        return (
            <div className="flex flex-col items-center justify-center gap-8 py-8">
                <form 
                    ref={ref} 
                    className="flex flex-col gap-8 w-full max-w-5xl" 
                    onSubmit={onSubmit}
                >
                    {/* Cards Container - Side by Side */}
                    <div className="flex flex-col md:flex-row gap-8 justify-center">
                        {/* Question Paper Upload Card */}
                        <div className="flex-1 ">
                            <Card className="relative border-2 border-dashed p-12 text-cente bg-white ">
                                <Upload className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
                                <h3 className="text-xl font-semibold mb-4">
                                    Upload Question Papers
                                </h3>
                                <Input 
                                    id="questionPaper"
                                    type="file"
                                    name="questionPaper"
                                    accept="application/pdf"
                                    required
                                    disabled={isLoading}
                                    placeholder="Upload your question paper"
                                    className={cn(isLoading && 'opacity-50 cursor-not-allowed')}
                                />
                            </Card>
                        </div>

                        {/* Study Notes Upload Card */}
                        <div className="flex-1">
                            <Card className="relative border-2 border-dashed p-12 text-center bg-white">
                                <Upload className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
                                <h3 className="text-xl font-semibold mb-4">
                                    Upload Study Notes
                                </h3>
                                <Input 
                                    id="notes"
                                    type="file"
                                    name="notes"
                                    accept="application/pdf"
                                    required
                                    disabled={isLoading}
                                    placeholder="Upload your notes"
                                    className={cn(isLoading && 'opacity-50 cursor-not-allowed')}
                                />
                            </Card>
                        </div>
                    </div>

                    {/* Upload Button - Below Cards */}
                    <div className="flex justify-center">
                        <Button 
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                'Upload Files'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
);

UploadFromInput.displayName = "UploadFromInput";

export default UploadFromInput;