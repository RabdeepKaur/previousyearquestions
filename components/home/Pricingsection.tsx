import { cn } from "@/lib/utils"
import { ArrowRight, CheckIcon } from "lucide-react"
import Link from "next/link"

const plan=[
    {
        id:'basic',
        name:'Baisc',
        price:0,
        items:['4 pdf per month'],
        description:'for everyone you can sign in',
        paymentLink:''
    },
    {
        id:'pro',
        name:'Pro',
        price:400,
        items:['Unlimited pdf','24/7 priority support','markdown export'],
        description:'for student in destrate need of help',
        paymentLink:'',
        priceId:''
    }
]
const Pricingcard=({id,name,price ,items, description,paymentLink})=>{
    return(
        <>
    <div className="relative w-full max-w-lg py-6  hover:scale-105 hover:transition-all duration-300">
        <div className={cn("relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500  bg-gray-200 group-hover:white" , id==='pro' && 'border-primary gap-5 border-2')}>
    <div className="flex  text-black justify-between items-center gap-4">
        <p className="text-lg  text-black lg:text-xl font-bold capitalize" > {name}</p>
        <p className="text-based-content/80 mt-2 text-black">{description}</p>
    </div>
    <div className="text-black space-y-2.5 leading-relaxd text-base flex-1">
     {items.map
     ((items,idx)=>(
        <li key={idx} className="flex items-center gap-2">
            <CheckIcon size={18}/>
            <span>{items}</span></li>
   ) )}
    </div>
    <div className="flex gap-2">
        <p className="text-5xl tracking-tight font-extrabold text-black">{price}</p>
    </div>
    <div className="flex flex-col justify-end mb-[4px]">
        <p className="text-xs uppercase font-semibold text-black">Rupee</p>
        <p className="text-xs">/month</p>
    </div>
    <div className="space-y-2 flex justify-center w-full ">
        <Link href={paymentLink} className="w-full rouded-full items-center justify-center gap-2 bg-primary hover:from-primary  hover:to-secondary text-white px-40"> BUY NOW <ArrowRight size={13} className="flex"/></Link>
    </div>
    </div>
    </div>
    </>
    )
}
export default function Pricingsection(){
    return(
        <>
        <section className="relative overflow-hidden" id="pricing">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg-pt-12">
<div>
    <h2 className="flex uppercase font-bold items-center justify-center text-4xl"> PRICING</h2>
</div>
<div className="relative flex justify-center flex-col lg:flex-row item-center lg:items-stretch gap-8">
{plan.map ((plan)=>(
    <Pricingcard key={plan.id}{...plan}/>
))}
</div>
            </div>
        </section>
        </>
    )
}