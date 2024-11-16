"use client";

import queryString from "query-string";
import Slider from 'rc-slider';
import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface Props {
    categoryId: string
}

export const PriceFilter = ({ categoryId }: Props) => {
    const [priceRange, setPriceRange] = useState([0, 500]);

    const router = useRouter();
    const searchParams = useSearchParams();


    const onSliderChange = (value: number | number[]) => {
        const params = Object.fromEntries(searchParams.entries());
        if (Array.isArray(value)) {
            setPriceRange(value);
            const url = queryString.stringifyUrl({
                url: `/books?category=${categoryId}`,
                query: {
                    ...params,
                    minPrice: value[0],
                    maxPrice: value[1],
                }
            }, { skipEmptyString: true, skipNull: true });
            router.push(url);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Price Range</CardTitle>
            </CardHeader>
            <CardContent>
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
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

}