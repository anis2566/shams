"use client"

import { Logo } from "@/components/logo"
import { Button, buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface DrawerProps {
    children: React.ReactNode
}

export const Drawer = ({ children }: DrawerProps) => {
    const pathname = usePathname()
    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-x-2 -mt-4">
                        <SheetClose asChild>
                            <Logo callbackUrl="/" />
                        </SheetClose>
                    </SheetTitle>
                </SheetHeader>
                <div className="space-y-3">
                    <div className="space-y-1 mt-5">
                        <SheetClose asChild>
                            <Link href="/books/authors" className={cn(buttonVariants({ variant: "ghost" }), "w-full flex justify-start text-md", pathname === "/books/author" && "bg-muted-foreground text-white")}>লেখক</Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link href="/books/category" className={cn(buttonVariants({ variant: "ghost" }), "w-full flex justify-start text-md", pathname === "/books/category" && "bg-slate-400 text-white")}>বিষয়</Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link href="/books/publications" className={cn(buttonVariants({ variant: "ghost" }), "w-full flex justify-start text-md", pathname === "/books/publications" && "bg-slate-400 text-white")}>প্রকাশনী</Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link href="/books?category=6713adf83d27b3f508d0c44e" className={cn(buttonVariants({ variant: "ghost" }), "w-full flex justify-start text-md", pathname === "/books?category=6713adf83d27b3f508d0c44e" && "bg-slate-400 text-white")}>ভর্তি প্রস্তুতি</Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link href="/books?category=6713ac1b3d27b3f508d0c44c" className={cn(buttonVariants({ variant: "ghost" }), "w-full flex justify-start text-md", pathname === "/books?category=6713ac1b3d27b3f508d0c44c" && "bg-slate-400 text-white")}>আইন বিষয়ক বই</Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link href="/books?category=6713adf83d27b3f508d0c44e" className={cn(buttonVariants({ variant: "ghost" }), "w-full flex justify-start text-md", pathname === "/books?category=6713adf83d27b3f508d0c44e" && "bg-slate-400 text-white")}>ইসলামি ভাষার বই</Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link href="/books?category=6713ae9c3d27b3f508d0c450" className={cn(buttonVariants({ variant: "ghost" }), "w-full flex justify-start text-md", pathname === "/books?category=6713ae9c3d27b3f508d0c450" && "bg-slate-400 text-white")}>IELTS বই</Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link href="/books?discount=true" className={cn(buttonVariants({ variant: "ghost" }), "w-full flex justify-start text-md", pathname === "/books?discount=true" && "bg-slate-400 text-white")}>ডিসকাউন্ট বই</Link>
                        </SheetClose>
                    </div>

                    <SheetClose asChild>
                        <Button asChild variant="ghost" className="w-full flex justify-start">
                            <Link href="/wishlist">Wishlist</Link>
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button asChild variant="link">
                            <Link href="/seller/register">Become A Seller</Link>
                        </Button>
                    </SheetClose>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        {/* <Button type="submit">Save changes</Button> */}
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
