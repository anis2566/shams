"use client"

import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { useGetCategoriesHome } from "../../query"

export const Category = () => {
    const { data, isLoading } = useGetCategoriesHome()

    return (
        <div className="w-full px-2 md:px-0">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full relative"
            >
                <CarouselContent>
                    {
                        isLoading ? (
                            Array.from({ length: 4 }).map((_, index) => (
                                <CategorySkeleton key={index} />
                            ))
                        ) : (
                            data?.map((category) => (
                                <CarouselItem key={category.id} className="pl-4 md:basis-1/4 lg:basis-1/4">
                                    <Card className="p-0 min-h-[410px] flex flex-col justify-between">
                                        <CardHeader className="py-3 pl-6">
                                            <CardTitle>{category.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-2 gap-2 p-0 flex-1">
                                            {category.subCategories.map((subCategory) => (
                                                <Link key={subCategory.id} href={`/books?subcategory=${subCategory.id}`} className="space-y-1 border border-muted rounded-md p-2 w-full group">
                                                    <div className="h-[120px] w-full flex items-center justify-center">
                                                        <Image src={subCategory.imageUrl ?? ""} alt={subCategory.name} width={100} height={100} className="w-full h-full object-contain group-hover:scale-105 group-hover:rotate-12 transition-all duration-300" />
                                                    </div>
                                                    <p className="truncate text-sm text-center group-hover:text-primary">{subCategory.name}</p>
                                                </Link>
                                            ))}
                                        </CardContent>
                                        <CardFooter className="flex justify-end p-0">
                                            <Button variant="link" className="text-sm" asChild>
                                                <Link href={`/books/category/${category.id}`}>View All</Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </CarouselItem>
                            ))
                        )
                    }
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 z-40" />
                <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 z-40" />
            </Carousel>
        </div>
    )
}

const CategorySkeleton = () => {
    return (
        <CarouselItem className="pl-4 md:basis-1/4 lg:basis-1/4">
            <Card className="p-0 min-h-[410px]">
                <CardHeader className="py-3 pl-6">
                    <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2 p-0">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="space-y-1 border border-muted rounded-md p-2 w-full">
                            <Skeleton className="h-[120px] w-full" />
                            <Skeleton className="h-4 w-3/4 mx-auto" />
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="flex justify-end p-0">
                    <Skeleton className="h-8 w-20" />
                </CardFooter>
            </Card>
        </CarouselItem>
    )
}