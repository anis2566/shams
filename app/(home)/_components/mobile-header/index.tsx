import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import { CartButton } from "../header/cart-button"
import { UserButton } from "../header/user-button"
import { Notification } from "@/components/notification"
import { Search } from "../header/search"
import { Drawer } from "../drawer"
import { auth } from "@/auth"
import { SignInButton } from "../header/sign-in-button"

export const MobileHeader = async () => {
    const session = await auth();

    return (
        <div className="md:hidden w-full py-2 z-50 bg-background px-3 md:px-0 space-y-3 fixed top-0 left-0 right-0">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Drawer>
                        <Button variant="ghost" size="icon">
                            <Menu />
                        </Button>
                    </Drawer>
                    <Link href="/">
                        <Image src="/logo.svg" alt="logo" width={30} height={30} />
                    </Link>
                </div>
                <div className="flex items-center gap-x-2">
                    {
                        session?.userId ? (
                            <Notification />
                        ) : null
                    }
                    <CartButton />
                    {
                        session?.userId ? (
                            <UserButton />
                        ) : <SignInButton />
                    }
                </div>
            </div>
            <Search />
        </div>
    )
}