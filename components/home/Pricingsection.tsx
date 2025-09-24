import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import { MotionDiv } from "../common/motion-wrapper";

interface PriceProps {
  id: string;
  name: string;
  price: number;
  items: string[];
  description: string;
  paymentLink: string;
}
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

const plans: PriceProps[] = [
  {
    id: "free",
    name: "FREE PLAN",
    price: 0,
    items: ["1 Answer PDF generated for free"],
    description:
      "You can access this without signing up, but to save and generate more PDFs, please select a pricing plan.",
    paymentLink: "",
  },
  {
    id: "pro",
    name: "PRO PLAN",
    price: 49,
    items: [
      "Unlimited PDF answers",
      "Ability to view previous PDFs",
      "Download PDFs anytime",
    ],
    description:
      "For students who need full access to all features and unlimited PDF generation.",
    paymentLink: "",
  },
];

const PricingCard = ({ id, name, price, items, description, paymentLink }: PriceProps) => {
  return (
    <div className=" relative w-full max-w-lg py-6 hover:scale-105 transition-transform duration-300 group ">
      <div className='absolute -top-5 -left-10 w-[500px] h-[500px] rounded-full 
        bg-[radial-gradient(circle,rgba(161,240,149,0.8)_0%,rgba(237,223,223,0)_70%)] z-0'>
            </div>
      <MotionDiv
      initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        className={cn(
          "relative flex flex-col h-full gap-6 z-10 p-8 border rounded-2xl shadow-md",
          id === "pro" && "border-primary border-2"
        )}
      >
        <div className="flex flex-col gap-2 text-black">
          <p className="text-xl font-bold capitalize">{name}</p>
          <p className="text-sm text-gray-700">{description}</p>
        </div>

        <ul className="space-y-2 text-base text-black">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon size={18} className="text-white" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-baseline gap-2">
          <p className="text-5xl font-extrabold text-black">₹{price}</p>
          <div className="flex flex-col">
            <p className="text-xs uppercase font-semibold text-black">Rupees</p>
            <p className="text-xs">/month</p>
          </div>
        </div>

        <div className="w-full hover:text-2xl">
          <Link
            href={paymentLink || "#"}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-primary text-white px-6 py-3 font-semibold transition"
          >
            Buy Now<ArrowRight size={16} />
          </Link>
        </div>
      </MotionDiv>
     
    </div>
  );
};

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center uppercase font-bold text-5xl mb-12">Pricing</h2>
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
