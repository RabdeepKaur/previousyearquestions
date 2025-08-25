
import CTAsection from "@/components/home/CTAsection";
import DemoSection from "@/components/home/DemoSection";
import Herosection from "@/components/home/Herosection";
import Howitworkssection from "@/components/home/howitworks";
import Pricingsection from "@/components/home/Pricingsection";



export default function Home() {
  return (
    <div className="relative w-full">
      <div className="felx flex-col">
  <div className="bg-[radial-gradient(circle,rgba(161,240,149,1)_0%,rgba(237,223,223,1)_96%)] max-w-auto "> <Herosection/>  
   
    
      </div>
        <DemoSection/>
        <Howitworkssection/>
           <Pricingsection/>
           <CTAsection/>
          
     </div>
  
    </div>
  );
}
