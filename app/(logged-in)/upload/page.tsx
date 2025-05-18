import UploadHeader from "@/components/uploads/upload-header";
import UploadForm from "@/components/uploads/upload-form";

export default function Page() {
    return (
        <section className="min-h-screen">
            <div className="mc-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <UploadHeader />
       <UploadForm/>
       </div>
       </section>
    );
}