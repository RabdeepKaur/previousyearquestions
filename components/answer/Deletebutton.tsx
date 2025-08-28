"use client"
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { startTransition, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteAnswer } from "@/actions/answeraction";

export default function DeleteButton({userId, answerId}:{userId:string, answerId:string}) {
  // state for opning an dclosing of dialong
  const[open, setOpen] = useState(false);
  const[isPending, setIsPending] = useTransition();

  const handleDelete =async()=>{
    startTransition(async()=>{
// props pased to create the delete request
 const result=await deleteAnswer(userId, answerId);
 if(!result.success) {
    alert("Failed to delete the answer. Please try again.");
 }
setOpen(false);
  });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button  variant={'ghost'} size="icon"
    className="text-white bg-primary border  border-gray-300 hover:bg-gray-100 hover:text-primary rounded-md shadow-sm p-2">
      <Trash2 className="w-4 h-4" />
    </  Button>
    </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete answer</DialogTitle>
      <DialogDescription>
       Are you sure you want to delete this answer? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
       <Button  variant={'ghost'}  
    className=" w-20 bg-gray-50  border  border-gray-300 hover:bg-gray-100 hover:text-primary rounded-md shadow-sm p-4"
    onClick={()=>setOpen(false)}
    >
      Cancel 
    </  Button>
    <Button  variant={'destructive'}
    className="  w-20 bg-red-400  border  border-gray-300 hover:bg-gray-100 hover:text-primary rounded-md shadow-sm p-4"
    onClick={()=>handleDelete()}
    >
    {isPending? 'Deleting...':'Delete'}  
    </  Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
    
  );
}