"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { sellerSidebarNavs } from "@/constant";

interface Props {
    sellerId: string;
}

export const SidebarNavs = ({ sellerId }: Props) => {
    const pathname = usePathname();
    return (
        <div className="space-y-2">
            {sellerSidebarNavs.map((nav) => {
                const isActive = nav.isHome
                    ? pathname === `/dashboard/seller/${sellerId}`
                    : pathname.includes(nav.href);
                return (
                    <Link
                        href={`/dashboard/seller/${sellerId}${nav.href}`}
                        key={`/dashboard/seller/${sellerId}${nav.href}`}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "flex w-full justify-start gap-x-3",
                            isActive && "bg-accent text-accent-foreground",
                        )}
                    >
                        <nav.icon className="h-4 w-4" />
                        {nav.label}
                    </Link>
                );
            })}
        </div>
    );
};