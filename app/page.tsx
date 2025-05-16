import BgGradient from "@/components/common/BgGradient";
import DemoSection from "@/components/home/DemoSection";
import Herosection from "@/components/home/Herosection";
import Howitworkssection from "@/components/home/howitworks";
import Pricingsection from "@/components/home/Pricingsection";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="relative w-full ">
      <BgGradient/>
      <div className="felx flex-col">
     <Herosection/>
     <DemoSection/>
        <Howitworkssection/>
           <Pricingsection/>
     </div>
     {/*
     <CTAsection/>*/}
    </div>
  );
}
