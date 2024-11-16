"use client"

import { XIcon } from "lucide-react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import queryString from "query-string"
import Slider from 'rc-slider';
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"


interface FilterDrawerProps {
    children: React.ReactNode
}

export const FilterDrawer = ({ children }: FilterDrawerProps) => {
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [discountRange, setDiscountRange] = useState([0, 100]);

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const inStock = searchParams.get("inStock") || null

    const handleCheckChange = (checked: boolean) => {
        const params = Object.fromEntries(searchParams.entries())
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                ...params,
                inStock: checked
            }
        }, { skipEmptyString: true, skipNull: true })
        router.push(url)
    }

    const onSliderChange = (value: number | number[]) => {
        const params = Object.fromEntries(searchParams.entries());
        if (Array.isArray(value)) {
            setPriceRange(value);
            const url = queryString.stringifyUrl({
                url: pathname,
                query: {
                    ...params,
                    minPrice: value[0],
                    maxPrice: value[1],
                }
            }, { skipEmptyString: true, skipNull: true });
            router.push(url);
        }
    };

    const hanldePriceRangeReset = () => {
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                ...params,
                minPrice: "",
                maxPrice: ""
            }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
        setPriceRange([0, 500])
    }

    const onDiscountSliderChange = (value: number | number[]) => {
        const params = Object.fromEntries(searchParams.entries());
        if (Array.isArray(value)) {
            setDiscountRange(value);
            const url = queryString.stringifyUrl({
                url: pathname,
                query: {
                    ...params,
                    minDiscount: value[0],
                    maxDiscount: value[1],
                }
            }, { skipEmptyString: true, skipNull: true });
            router.push(url);
        }
    };

    const hanldeDiscountRangeReset = () => {
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                ...params,
                minDiscount: "",
                maxDiscount: ""
            }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
        setDiscountRange([0, 100])
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="flex justify-center items-center relative">
                        <span>Filter</span>
                        <DrawerClose asChild>
                            <Button variant="secondary" size="icon" className="absolute right-0">
                                <XIcon className="w-4 h-4 text-rose-500" />
                            </Button>
                        </DrawerClose>
                    </DrawerTitle>
                </DrawerHeader>
                <div className="px-4 space-y-4">
                    <Card>
                        <CardContent className="p-4">
                            <DrawerClose asChild>
                                <div className="flex items-center space-x-2">
                                    <Switch id="in-stock" checked={inStock === "true"} onCheckedChange={handleCheckChange} />
                                    <Label htmlFor="in-stock">In Stock</Label>
                                </div>
                            </DrawerClose>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="py-3">
                            <CardTitle>Price Range</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 py-0">
                            <DrawerClose asChild>
                                <div className="grid px-2">
                                    <div className="grid">
                                        <Slider
                                            range
                                            min={0}
                                            max={500}
                                            value={priceRange}
                                            onChange={onSliderChange}
                                        />
                                        <div className='flex items-center justify-between gap-x-3'>
                                            <p>
                                                {priceRange[0]} - {priceRange[1]}
                                            </p>
                                            <Button variant="ghost" className='text-rose-500' onClick={hanldePriceRangeReset}>Reset</Button>
                                        </div>
                                    </div>
                                </div>
                            </DrawerClose>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="py-3">
                            <CardTitle>Discount Range</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 py-0">
                            <DrawerClose asChild>
                                <div className="grid px-2">
                                    <div className="grid">
                                        <Slider
                                            range
                                            min={0}
                                            max={100}
                                            value={discountRange}
                                            onChange={onDiscountSliderChange}
                                        />
                                        <div className='flex items-center justify-between gap-x-3'>
                                            <p>
                                                {discountRange[0]} - {discountRange[1]}
                                            </p>
                                            <Button variant="ghost" className='text-rose-500' onClick={hanldeDiscountRangeReset}>Reset</Button>
                                        </div>
                                    </div>
                                </div>
                            </DrawerClose>
                        </CardContent>
                    </Card>
                </div>
                <DrawerFooter>

                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}