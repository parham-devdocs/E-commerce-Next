import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export function Nav({children}:{children:ReactNode}) {
    return <div className=" bg-primary text-primary-foreground flex justify-center px-4">{ children }</div>
}

export function Navlink(props: Omit<ComponentProps<typeof Link>, "className">) {
    return (
      <Link
        {...props}
        className={cn(
          " p-4 hover:bg-black hover:text-white transition-colors duration-300 focus-visible:bg-secondary focus-visible::text-secondary-foreground"
 ) }
      ></Link>
    );
}
