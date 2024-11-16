import { User } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"

interface Props {
    className?: string
}

export const SignInButton = ({ className }: Props) => {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link href="/auth/sign-in" className={cn(buttonVariants({ variant: "secondary" }), className)} >
                        <span className="mr-2">
                            <User className="w-5 h-5" />
                        </span>
                        Sign In
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Login to your account</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}
