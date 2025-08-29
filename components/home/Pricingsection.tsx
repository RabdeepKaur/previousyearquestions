import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";

interface PriceProps {
  id: string;
  name: string;
  price: number;
  items: string[];
  description: string;
  paymentLink: string;
}

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
    <div className=" relative w-full max-w-lg py-6 hover:scale-105 transition-transform duration-300 group">
      <div
        className={cn(
          "relative flex flex-col h-full gap-6 z-10 p-8 border rounded-2xl shadow-md bg-gradient-to-b from-[#89d989] to-[#eddfdf]",
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
              <CheckIcon size={18} className="text-green-600" />
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

        <div className="w-full">
          <Link
            href={paymentLink || "#"}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-secondary text-white px-6 py-3 font-semibold transition"
          >
            BUY NOW <ArrowRight size={16} />
          </Link>
        </div>
      </div>
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
