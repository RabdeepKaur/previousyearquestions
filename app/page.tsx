
import CTAsection from "@/components/home/CTAsection";
//import DemoSection from "@/components/home/DemoSection";
import Herosection from "@/components/home/Herosection";
import Howitworkssection from "@/components/home/howitworks";
import Pricingsection from "@/components/home/Pricingsection";



export default function Home() {
  return (
    <div className="relative w-full">
      <div className="felx flex-col">
  <div className=" "> <Herosection/>  
   
    
      </div>
        {/* I need animation over here <DemoSection/>*/}
        <Howitworkssection/>
           <Pricingsection/>
           <CTAsection/>
          
     </div>
  
    </div>
  );
}
