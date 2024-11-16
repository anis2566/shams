"use client"

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { useGetSimilarCategoryBooks } from "../../query";
import { useCart } from "@/hooks/use-cart";

export const SimilarCategoryBooks = ({ categoryId }: { categoryId: string }) => {
    const { books, isFetching } = useGetSimilarCategoryBooks({ categoryId });
    const { addToCart } = useCart();

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold text-gray-700 dark:text-accent-foreground">Similar Category Books</h1>

            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full "
            >
                <CarouselContent className="h-[400px] z-40">
                    {
                        isFetching ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <CarouselItem key={index} className="basis-1/2 md:basis-1/5 border p-2">
                                    <CardSkeleton />
                                </CarouselItem>
                            ))
                        ) : (
                            books?.map((book) => (
                                <CarouselItem key={book.id} className="basis-1/2 md:basis-1/5">
                                    <Card className="w-full space-y-2">
                                        <CardContent className="pt-4">
                                            <Link href={`/books/${book.id}`} className="w-full space-y-2">
                                                <div className="relative aspect-square w-full">
                                                    <Image src={book.imageUrl} alt={book.name} fill className="mx-auto object-contain" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold">{book.name}</p>
                                                    <Link href={`/authors/${book.author.id}`} className="text-xs text-muted-foreground hover:underline">{book.author.name}</Link>
                                                </div>
                                            </Link>
                                        </CardContent>
                                        <CardFooter className="flex justify-between items-center">
                                            <div className="flex items-center gap-x-2">
                                                <p className="tracking-wider text-rose-500 line-through text-sm">৳{book?.price}</p>
                                                <p className="tracking-wider text-sm">৳{book.discountPrice}</p>
                                            </div>
                                            <TooltipProvider delayDuration={0}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="default" size="icon" onClick={() => addToCart({ book, price: book.discountPrice ?? book.price, quantity: 1 })}>
                                                            <ShoppingCart className="w-4 h-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Add to cart</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </CardFooter>
                                    </Card>
                                </CarouselItem>
                            ))
                        )
                    }
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-100 bg-background" />
                <CarouselNext className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-100 bg-background" />
            </Carousel>
        </div>
    )
}


const CardSkeleton = () => {
    return (
        <div className="w-full space-y-3">
            <Skeleton className="w-full aspect-square min-h-[200px]" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-1/2 h-4" />
            <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                    <Skeleton className="tracking-wider text-rose-500 line-through text-sm w-1/4" />
                    <Skeleton className="tracking-wider text-sm w-1/4" />
                </div>
                <Skeleton className="w-8 h-8" />
            </div>
        </div>
    )
}
