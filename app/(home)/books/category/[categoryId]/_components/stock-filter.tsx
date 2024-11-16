"use client"

import { useSearchParams, useRouter } from "next/navigation"
import queryString from "query-string"

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface Props {
    categoryId: string
}

export const StockFilter = ({ categoryId }: Props) => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const handleCheckChange = (checked: boolean) => {
        const params = Object.fromEntries(searchParams.entries())
        const url = queryString.stringifyUrl({
            url: `/books?category=${categoryId}`,
            query: {
                ...params,
                inStock: checked
            }
        }, { skipEmptyString: true, skipNull: true })
        router.push(url)
    }

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                    <Switch id="in-stock" onCheckedChange={handleCheckChange} />
                    <Label htmlFor="in-stock">In Stock</Label>
                </div>
            </CardContent>
        </Card>
    )
}