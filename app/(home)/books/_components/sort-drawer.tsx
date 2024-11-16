"use client"

import { XIcon } from "lucide-react"
import queryString from "query-string"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface SortDrawerProps {
    children: React.ReactNode
}

export const SortDrawer = ({ children }: SortDrawerProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const sort = searchParams.get("sort") || null

    const handleSortChange = (value: string) => {
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl({
            url: "/books",
            query: {
                ...params,
                sort: value,
            },
        }, { skipNull: true, skipEmptyString: true });
        router.push(url);
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="flex justify-center items-center relative">
                        <span>Sort</span>
                        <DrawerClose asChild>
                            <Button variant="secondary" size="icon" className="absolute right-0">
                                <XIcon className="w-4 h-4 text-rose-500" />
                            </Button>
                        </DrawerClose>
                    </DrawerTitle>
                </DrawerHeader>
                <Separator />
                <div className="p-4">
                    <RadioGroup onValueChange={handleSortChange}>
                        <DrawerClose asChild>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem checked={sort === "total_sell_asc"} value="total_sell_asc" id="total_sell_asc" />
                                <Label htmlFor="total_sell_asc" className="text-sm text-gray-500">Best Sellers</Label>
                            </div>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem checked={sort === "b_desc"} value="b_desc" id="b_desc" />
                                <Label htmlFor="b_desc" className="text-sm text-gray-500">Newest</Label>
                            </div>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem checked={sort === "price_desc"} value="price_desc" id="price_desc" />
                                <Label htmlFor="price_desc" className="text-sm text-gray-500">Price High to Low</Label>
                            </div>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem checked={sort === "price_asc"} value="price_asc" id="price_asc" />
                                <Label htmlFor="price_asc" className="text-sm text-gray-500">Price Low to High</Label>
                            </div>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem checked={sort === "discount_desc"} value="discount_desc" id="discount_desc" />
                                <Label htmlFor="discount_desc" className="text-sm text-gray-500">Discount High to Low</Label>
                            </div>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem checked={sort === "discount_asc"} value="discount_asc" id="discount_asc" />
                                <Label htmlFor="discount_asc" className="text-sm text-gray-500">Discount Low to High</Label>
                            </div>
                        </DrawerClose>
                    </RadioGroup>
                </div>
            </DrawerContent>
        </Drawer>
    )
}