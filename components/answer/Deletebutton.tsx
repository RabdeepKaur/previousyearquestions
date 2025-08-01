import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export default function DeleteButton() {
  return (
    <Button  variant={'ghost'} size="icon"
    className="text-white bg-primary border  border-gray-300 hover:bg-gray-100 hover:text-primary rounded-md shadow-sm p-2">
      <Trash2 className="w-4 h-4" />
    </  Button>
  );
}