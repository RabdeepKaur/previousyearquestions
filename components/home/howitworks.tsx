import { BrainCircuit, FileOutput, FileText, MoveRight } from 'lucide-react';
import { JSX, ReactNode } from 'react';
import { MotionDiv } from '../common/motion-wrapper';

type Steps = {
    icon: ReactNode;
    lable: string;
    description: string;
}

const steps: Steps[] = [
    {
        icon: <FileText size={64} strokeWidth={1.5} />,
        lable: "Notes turned into perfect answer",
        description: "Generate answer to your previous year question paper from your own notes"
    },
    {
        icon: <BrainCircuit size={64} strokeWidth={1.5} />,
        lable: "Marks and length base answer",
        description: "So the question is of 10 marks get a 2 page answer from your notes"
    },
    {
        icon: <FileOutput size={64} strokeWidth={1.5} />,
        lable: "Storage for all the ans generate",
        description: "Want to revisit and revise all the answer check out your previous uploads"
    }
]
 const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };


export default function Howitworkssection() {
    return (
        <section className=" py-20 px-6 relative overflow-hidden  ">
             <div className='absolute -top-30 -left-20 w-[400px] h-[400px] rounded-full 
        bg-[radial-gradient(circle,rgba(161,240,149,0.8)_0%,rgba(237,223,223,0)_70%)] z-0'>
            </div>
            <div className='absolute top-20 -right-20 w-[400px] h-[400px] rounded-full 
        bg-[radial-gradient(circle,rgba(161,240,149,0.8)_0%,rgba(237,223,223,0)_70%)] z-0'>
            </div>
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12 ">
               
                <MotionDiv className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
                >
                    <h2 className="font-bold text-3xlmd:text-4xl lg:text-5xl  uppercase mb-4 text-primary">What's special about us?</h2>
                    <h3 className="font text-xl max-w-2xl mx-auto">We have everything you need to revise and ace your exam</h3>
                </MotionDiv>
                
                <MotionDiv 
                 variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto relative">
                    {steps.map((step, idx) => (
                        <div key={idx} className='relative flex items-stretch border-4 border-[#A1F095] bg-[#EDDFDF]'>
                            <StepItem {...step} />
                            {idx < steps.length - 1 && (
                                <div className='hidden md:block absolute top-1/2 -right-9 transform -translate-y-1/2 z-10 '>
                                    <MoveRight
                                        size={32}
                                        strokeWidth={4}
                                        className='text-primary'
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </MotionDiv>
                </div>

        </section>
    )
}

function StepItem({ icon, lable, description }: Steps): JSX.Element {
    return (
        <div className='relative h-90 p-6 rounded-2xl backdrop-blur-xs border border-white/10 transition-colors group w-full bg-white '>
            <div className="flex flex-col gap-4 ">
                <div className="flex items-center justify-center h-40 w-40 mx-auto rounded-2xl">
                    <div className='text-black py-15'>{icon}</div>
                </div>
                <div className='flex flex-col flex-1 gap-1 justify-between'>
                    <h4 className="text-lg font-semibold px-5 text-center">{lable}</h4>
                    <p className="text-sm text-gray-700 px-5 mb-7 text-center">{description}</p>
                </div>
            </div>
        </div>
    )
}