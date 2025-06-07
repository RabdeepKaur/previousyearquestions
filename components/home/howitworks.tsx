import { BrainCircuit, FileOutput, FileText, MoveRight } from 'lucide-react';
import {JSX, ReactNode} from 'react';

type Steps={
    icon:ReactNode;
    lable:string;
    description:string
}
const steps:Steps[]=[
{
    icon:<FileText size={64} strokeWidth={1.5}/>,
lable:"Notes turned into perfect answer ",
description:"Generate answer to your previous year question paepr from your own notes "
},
{
     icon:<BrainCircuit size={64} strokeWidth={1.5}/>,
lable:" marks and length base answer ",
description:"so the question is of 10 marks get a 2 page answer from your notes  "
},
{
         icon:<FileOutput size={64} strokeWidth={1.5}/>,
lable:"Stroage for all the ans generate ",
description:"Want to revisit and revise all the answer check out your previous uploads "
}
]

export default function Howitworkssection(){
    return(
    <section className="relative overflow-hidden ">
        <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lf:pt-12">

        </div> 
        <div className="text-center mb-16">
            <h2 className="font-bold text-xl uppercase mb-4  text-primary"> What's special about us ?</h2>
            <h3 className="font-bold text-3xl max-w-2xl mx-auto"> We have every thing you need to revise and ace your exam  </h3>
            </div>   
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
{steps.map((step, idx) => (
    <div className='relative flex items-stretch'>
   <StepItem key={idx} {...step} />
   {idx <steps.length -1 &&(
   <div className='hidden md:block absolute top-1/2 -right-4 transform -translate-y1/2 z-10 '>
    <MoveRight
    size={32}
    strokeWidth={1}
    className='text-primary'></MoveRight>
   </div>
   )}
   </div>
))}
            </div>
    </section>
)}

function StepItem({ icon, lable, description }: Steps): JSX.Element {
   return ( 
      <div className='relative h-80 p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 transition-colors group w-full bg-gray-400'>
        <div className="flex flex-col gap-4 h-full group-hover:bg-white transition bg-gray-100">
        <div className="flex item-center justify-center h-40 w-40 mx-auto rounded-2xl ">
            <div className='text-black py-15'>{icon}</div>
            </div>
            <div className='flex flex-col flex-1 gap-1 justify-between '>
            <h4 className="text-lg font-semibold px-5 justify-center items-center">{lable}</h4>
         <p className="text-sm text-gray-700 px-5 mb-7">{description}</p>
         </div>
            </div> 
      </div>
       
)}