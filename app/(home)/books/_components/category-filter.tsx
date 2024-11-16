"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetCategories } from "../query";
import { cn } from "@/lib/utils";

export const CategoryFilter = () => {
    const { categories, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetCategories();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Category</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-1">
                {
                    categories.map((category) => (
                        <Link key={category.id} href={`/books?category=${category.id}`} className="text-sm text-gray-500 hover:text-gray-900 hover:underline">
                            {category.name}
                        </Link>
                    ))
                }
                <Button variant="link" onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className={cn("max-w-fit", !hasNextPage && "hidden")}>
                    {isFetchingNextPage ? "Loading more..." : "Load more"}
                </Button>
            </CardContent>
        </Card>
    )
}