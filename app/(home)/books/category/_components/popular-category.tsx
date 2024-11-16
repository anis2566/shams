"use client"

import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface PopularCategoryProps {
    categories: Category[]
}

export const PopularCategory = ({ categories }: PopularCategoryProps) => {
    return (
        <div className="px-3 md:px-0 space-y-3">
            <h2 className="text-xl font-bold text-gray-600">Popular Category</h2>
            <div>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full relative"
                >
                    <CarouselContent>
                        {
                            categories?.map((category) => (
                                <CarouselItem key={category.id} className="basis-1/2 md:basis-1/6">
                                    <Link href={`/books?category=${category.id}`} className="block space-y-2 border p-2 rounded-lg group">
                                        <div className="relative aspect-square max-h-12 mx-auto">
                                            <Image src={category.imageUrl} alt={category.name} fill className="object-cover rounded-full mx-auto" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-600 text-center group-hover:text-primary">{category.name}</p>
                                    </Link>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 z-40" />
                    <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 z-40" />
                </Carousel>
            </div>
        </div>
    )
}