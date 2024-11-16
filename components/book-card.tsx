"use client"

import { Book, Author } from "@prisma/client";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";

import { cn, savingsPercentage } from "@/lib/utils";
import { useCart, useOpenCartModal } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";


interface BookWithRelations extends Book {
    author: Author;
}

interface Props {
    book: BookWithRelations;
}

export const BookCard = ({ book }: Props) => {
    const { addToCart } = useCart();
    const { addToWishlist } = useWishlist();

    const { onOpen } = useOpenCartModal();

    const handleAddToCart = () => {
        addToCart({ book, price: book.discountPrice ?? book.price, quantity: 1 });
        toast.success("Added to cart");
        onOpen();
    }

    const handleAddToWishlist = () => {
        addToWishlist(book);
        toast.success("Added to wishlist");
    }

    return (
        <div className="w-full space-y-2 min-h-[400px] flex flex-col justify-between border">
            <Link href={`/books/${book.id}`} className="px-2 py-3 group relative h-full">
                <div className="w-full space-y-2">
                    <div className="relative aspect-square w-full max-h-[150px]">
                        <Image src={book.imageUrl} alt={book.name} fill className="mx-auto object-contain group-hover:scale-105 transition-all duration-300 group-hover:rotate-3" />
                    </div>
                    <div className="overflow-hidden space-y-1.5">
                        <p className="text-sm font-semibold">{book.name.length > 40 ? `${book.name.slice(0, 40)}...` : book.name}</p>
                        <Link href={`/authors/${book.author.id}`} className="text-xs text-muted-foreground hover:underline flex leading-0">
                            {book.author.name.length > 50 ? `${book.author.name.slice(0, 50)}...` : book.author.name}
                        </Link>
                        <div className="flex items-center gap-x-2">
                            <Rating style={{ maxWidth: 70 }} value={4.5} readOnly />
                            <p className="text-sm text-muted-foreground">({book.totalReview})</p>
                        </div>
                        {
                            book.stock > 0 ? (
                                <p className="text-sm text-green-500">In Stock</p>
                            ) : (
                                <p className="text-sm text-red-500">Out of Stock</p>
                            )
                        }
                        <div className="flex items-center gap-x-1">
                            <p className={cn("tracking-wider text-xs", book.discountPrice && "text-rose-500 line-through")}>৳{book.price}</p>
                            <p className={cn("tracking-wider text-sm", !book.discountPrice && "hidden")}>৳{book.discountPrice}</p>
                            <p className={cn("text-[12px] md:text-xs text-green-500", !book.discountPrice && "hidden")}>({book.discountPercent}% off)</p>
                        </div>
                    </div>
                </div>
                {
                    book.discountPrice && (
                        <Badge className="absolute top-2 -left-2 -rotate-45 text-secondary-foreground" variant="secondary">
                            {savingsPercentage(book.price, book.discountPrice)}% off
                        </Badge>
                    )
                }
            </Link>
            <div className="flex justify-between items-center p-2 w-full gap-x-3">
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="default" onClick={handleAddToCart} className="flex-1 flex items-center gap-x-3">
                                <ShoppingCart className="w-4 h-4 hidden md:block" />
                                <p>Add to cart</p>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add to cart</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={handleAddToWishlist}>
                                <Heart className="w-4 h-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add to wishlist</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}


export const BookCardSkeleton = () => {
    return (
        <Card className="w-full space-y-2 relative">
            <CardContent className="px-2 py-3 group">
                <div className="relative aspect-square w-full max-h-[150px]">
                    <Skeleton className="w-full h-full" />
                </div>
                <div className="space-y-1">
                    <Skeleton className="h-4" />
                    <Skeleton className="h-3 w-1/2" />
                    <div className="flex items-center gap-x-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-10" />
                    </div>
                    <Skeleton className="h-4 w-1/4" />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-2">
                <div className="flex items-center gap-x-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-10" />
                </div>
                <Skeleton className="h-8 w-8" />
            </CardFooter>
        </Card>
    )
}

