"use client"
import {cn} from "@/lib/utils";
import Link from 'next/link';
import {usePathname} from 'next/navigation'

export default function NavLink({
    href,
    children,
    className,
}:{
    href:string;
    children:React.ReactNode;
    className?:string;
     onClick?: () => void; 
}){
    const pathname=usePathname();
    const isActive= pathname === href || (href !== "/" && pathname.startsWith(href));
    return(
        <Link 
        href={href}
        className={cn("transitio-colors text-sm duration-200 text-gray-900 hover:text-primary",
            className,
            isActive && 'text-primary'

        )}>
            {children}
        </Link>
    )
 
}
