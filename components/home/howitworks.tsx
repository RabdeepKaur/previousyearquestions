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
lable:"upload your pdf",
description:"Simply drag and drop your pdf  document or click to upload"
},
{
     icon:<BrainCircuit size={64} strokeWidth={1.5}/>,
lable:"AI magic",
description:"Our advanced AI processes  and procided propaiton length to marks answer"
},
{
         icon:<FileOutput size={64} strokeWidth={1.5}/>,
lable:"Get currate answer",
description:"Get the magic portion to revsise , study last mina and ace the exam "
}
]

export default function Howitworkssection(){
    return(
    <section className="relative overflow-hidden ">
        <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lf:pt-12">

        </div> 
        <div className="text-center mb-16">
            <h2 className="font-bold text-xl uppercase mb-4  text-primary"> HOW IT WORKS</h2>
            <h3 className="font-bold text-3xl max-w-2xl mx-auto"> Trandform any pdf into  length :: marks answer  in three simple steps </h3>
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