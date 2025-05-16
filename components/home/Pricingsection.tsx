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
const Pricingcard=({name,price ,items, description,paymentLink})=>{
    return(
        <>
    <div className="relative w-full max-w-lg">
    <div>
        <p > {name}</p>
        <p>{description}</p>
    </div>
    <div>
     {items.map
     ((items,idx)=>(
        <li key={idx}>{items}</li>
   ) )}
    </div>
    <div>
        <p>{price}</p>
    </div>
    <div>
        <Link href={paymentLink}></Link>
    </div>
    </div>
    </>
    )
}
export default function Pricingsection(){
    return(
        <>
        <section>
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg-pt-12">
<div>
    <h2> Pricing</h2>
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