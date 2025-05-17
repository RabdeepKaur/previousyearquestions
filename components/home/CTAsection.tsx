import Link from "next/link";
import { Button } from "../ui/button";

export default function CTAsection() {
    return(
<section className="bg-gray-50 py-12"> 
    <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
<h2>Ready to top any exam?</h2>
<p> Get marked based length answer to ace and exam </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center ">
            <Button variant={'link'} className="w-full min-[400px] :w-auto bg-linear-t-r from slate-900 to -primary hover:toslate-900 hover:text-white bg-primary text-secondary" size="lg">
            <Link href={"#/pricing"} className="flex items-center justify-center px-6 py-4"> GETSTARTED </Link>
            </Button>
        </div>
    </div>
        </section>
    )
}