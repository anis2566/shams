"use client";

import queryString from "query-string";
import Slider from 'rc-slider';
import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface Props {
    categoryId: string
}

export const DiscountFilter = ({ categoryId }: Props) => {
    const [discountRange, setDiscountRange] = useState([0, 100]);

    const router = useRouter();
    const searchParams = useSearchParams();


    const onSliderChange = (value: number | number[]) => {
        const params = Object.fromEntries(searchParams.entries());
        if (Array.isArray(value)) {
            setDiscountRange(value);
            const url = queryString.stringifyUrl({
                url: `/books?category=${categoryId}`,
                query: {
                    ...params,
                    minDiscount: value[0],
                    maxDiscount: value[1],
                }
            }, { skipEmptyString: true, skipNull: true });
            router.push(url);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Discount Range</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid px-2">
                    <div className="grid">
                        <Slider
                            range
                            min={0}
                            max={100}
                            value={discountRange}
                            onChange={onSliderChange}
                        />
                        <div className='flex items-center justify-between gap-x-3'>
                            <p>
                                {discountRange[0]} - {discountRange[1]}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

}