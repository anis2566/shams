"use client"

import * as React from "react"
import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { Authors } from "./authors"
import { Categories } from "./categories"
import { Publications } from "./publications"
import { AdmissionPreparation } from "./admission-preparation"
import { LawVariant } from "./law-variant"

export function Navbar() {
    return (
        <div className="hidden md:block border-b py-2">
            <NavigationMenu>
                <NavigationMenuList className="z-50">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>লেখক</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <Authors />
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>বিষয়</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <Categories />
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>প্রকাশনী</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <Publications />
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>ভর্তি প্রস্তুতি</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <AdmissionPreparation />
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>আইন বিষয়ক</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <LawVariant />
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/books?category=6713adf83d27b3f508d0c44e" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                ইসলামি ভাষার বই
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/books?category=6713ae6e3d27b3f508d0c44f" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                ই-বুক
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/books?category=6713ae9c3d27b3f508d0c450" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                IELTS বই
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/books?discount=true" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                ডিসকাউন্ট বই
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}