import UploadHeader from "@/components/uploads/upload-header";
import UploadForm from "@/components/uploads/upload-form";
import DashboardPage from "../dashboard/page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    return (
        <section className="min-h-screen">
            <div className="mc-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <UploadHeader />
       <UploadForm/>
   <Button >  <Link href="/dashboard">DashboardPage</Link></Button>   
       </div>
       </section>
    );
}