"use client";
import React, { forwardRef, useState } from "react";
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
        // Check if user has already used their free upload (persisted in localStorage)
        const [userHasUploaded, setUserHasUploaded] = useState(() => {
            if (typeof window !== 'undefined') {
                return localStorage.getItem('hasUsedFreeUpload') === 'true';
            }
            return false;
        });
        
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!userHasUploaded) {
                setUserHasUploaded(true);
                // Permanently store that user has used their free upload
                localStorage.setItem('hasUsedFreeUpload', 'true');
                onSubmit(e);
            }
        };

        const handleUpgradeClick = () => {
            // You can redirect to your pricing page or open a modal
            alert('Upgrade to Pro to upload unlimited files!');
            // window.open('/pricing', '_blank'); // Uncomment to redirect
        };

        return (
            <div className="flex flex-col items-center justify-center gap-8 py-8">
                <form 
                    ref={ref} 
                    className="flex flex-col gap-8 w-full max-w-5xl" 
                    onSubmit={handleSubmit}
                >
                    {/* Cards Container - Side by Side */}
                    <div className="flex flex-col md:flex-row gap-8 justify-center">
                        {/* Question Paper Upload Card */}
                        <div className="flex-1">
                            <Card className="relative border-2 border-dashed p-12 text-center bg-white">
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
                                    disabled={isLoading || userHasUploaded}
                                    placeholder="Upload your question paper"
                                    className={cn((isLoading || userHasUploaded) && 'opacity-50 cursor-not-allowed')}
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
                                    disabled={isLoading || userHasUploaded}
                                    placeholder="Upload your notes"
                                    className={cn((isLoading || userHasUploaded) && 'opacity-50 cursor-not-allowed')}
                                />
                            </Card>
                        </div>
                    </div>

                    {/* Upload Button - Below Cards */}
                    {userHasUploaded ? (
                        <div className="text-center space-y-4">
                            <p className="text-amber-600 font-medium">
                                You've used your free upload limit!
                            </p>
                            <Button 
                                onClick={handleUpgradeClick}
                                variant="default"
                                className="px-8 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                            >
                                🚀 Upgrade to Pro
                            </Button>
                        </div>
                    ) : (
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
                                    'Upload Files (Free)'
                                )}
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        );
    }
);

UploadFromInput.displayName = "UploadFromInput";

export default UploadFromInput;