"use client";

import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay"
import { Rating } from "@smastrom/react-rating";

import { Skeleton } from "@/components/ui/skeleton";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

import { useGetRelatedBooks } from "@/app/(home)/query";

interface Props {
    categoryId: string;
    subCategoryId: string | null;
}

export default function RelatedBooks({ categoryId, subCategoryId }: Props) {
    const { data: relatedBooks, isLoading } = useGetRelatedBooks(categoryId, subCategoryId);

    if (isLoading) {
        return <RelatedBookSkeleton />;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-lg font-semibold text-gray-700 dark:text-accent-foreground">Related Books</h1>

            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 5000,
                        stopOnMouseEnter: true,
                    }),
                ]}
                orientation="vertical"
                className="block md:hidden w-full max-w-xs"
            >
                <CarouselContent className="h-auto md:h-[400px]">
                    {relatedBooks?.slice(0, 3).map((book) => (
                        <CarouselItem key={book.id}>
                            <Link key={book.id} href={`/books/${book.id}`} className="flex gap-x-3 hover:shadow-md">
                                <Image src={book.imageUrl} alt={book.name} width={80} height={80} />
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-accent-foreground">{book.name}</p>
                                    <p className="text-sm text-muted-foreground">{book.author.name}</p>
                                    <div className="flex items-center gap-x-2">
                                        <Rating style={{ maxWidth: 70 }} value={4.5} readOnly />
                                        <p className="text-sm text-muted-foreground">({book.totalReview})</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <p className="tracking-wider text-rose-500 line-through text-md">৳{book?.price}</p>
                                        <p className="tracking-wider text-lg">৳{book.discountPrice}</p>
                                    </div>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 5000,
                        stopOnMouseEnter: true,
                    }),
                ]}
                orientation="vertical"
                className="hidden md:block w-full max-w-xs"
            >
                <CarouselContent className="h-[400px]">
                    {relatedBooks?.map((book) => (
                        <CarouselItem key={book.id} className="basis-1/3">
                            <Link key={book.id} href={`/books/${book.id}`} className="flex gap-x-3 hover:shadow-md">
                                <Image src={book.imageUrl} alt={book.name} width={80} height={80} />
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-accent-foreground">{book.name}</p>
                                    <p className="text-sm text-muted-foreground">{book.author.name}</p>
                                    <div className="flex items-center gap-x-2">
                                        <Rating style={{ maxWidth: 70 }} value={4.5} readOnly />
                                        <p className="text-sm text-muted-foreground">({book.totalReview})</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <p className="tracking-wider text-rose-500 line-through text-md">৳{book?.price}</p>
                                        <p className="tracking-wider text-lg">৳{book.discountPrice}</p>
                                    </div>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}

const RelatedBookSkeleton = () => {
    return (
        <div className="space-y-4">
            <h1 className="text-lg font-semibold text-gray-700 dark:text-accent-foreground">Related Books</h1>
            <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div className="flex gap-x-3 hover:shadow-md" key={index}>
                        <Skeleton className="w-[80px] h-[80px]" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                            <div className="flex items-center gap-x-2">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-3 w-8" />
                            </div>
                            <div className="flex items-center gap-x-2">
                                <Skeleton className="h-4 w-12" />
                                <Skeleton className="h-4 w-12" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
