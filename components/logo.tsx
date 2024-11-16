import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
    callbackUrl: string;
    className?: string;
}

export const Logo = ({ callbackUrl, className }: LogoProps) => {
    return (
        <Link href={callbackUrl || "/"} className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <span className={cn("text-lg font-bold text-primary", className)}>
                Shams Publication
            </span>
        </Link>
    );
};
