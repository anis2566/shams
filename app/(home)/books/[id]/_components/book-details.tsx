"use client"

import { Author, Book, Category, SubCategory, Publication } from "@prisma/client";
import Link from "next/link";
import { Layers3, UserRoundPen, Eye, ShoppingCart, Files, BookOpen, FilePenLine, CornerDownLeft, Loader2, Heart, Share2 } from "lucide-react";
import { Rating } from "@smastrom/react-rating";
import { toast } from "sonner";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"


import { cn, savingsPercentage } from "@/lib/utils";
import { useCart, useOpenCartModal } from "@/hooks/use-cart";
import { useGetTopReviews } from "../../query";
import { useWishlist } from "@/hooks/use-wishlist";


interface BookWithRelations extends Book {
    category: Category;
    subCategory: SubCategory | null;
    author: Author;
    publication: Publication;
}

export default function BookDetails({ book }: { book: BookWithRelations }) {
    const { addToCart } = useCart();
    const { addToWishlist } = useWishlist();
    const { reviews, isFetching } = useGetTopReviews({ bookId: book.id });
    const { onOpen } = useOpenCartModal();

    const handleAddToCart = (book: BookWithRelations) => {
        addToCart({ book, price: book.discountPrice ?? book.price, quantity: 1 });
        toast.success("Added to cart");
        onOpen();
    }

    const handleAddToWishlist = () => {
        addToWishlist(book);
        toast.success("Added to wishlist");
    }

    return (
        <div className="md:col-span-2 space-y-4">
            <h1 className="text-xl font-semibold text-gray-700 dark:text-accent-foreground">{book.name}</h1>
            <p className="text-sm text-muted-foreground truncate">{book?.shortDescription}</p>

            <div className="flex items-center gap-2">
                <UserRoundPen className="w-4 h-4 text-muted-foreground" />
                <Link href={`/authors/${book.author.id}`} className="text-sm text-primary hover:underline">{book.author.name}</Link>
            </div>
            <div className="flex items-center gap-2">
                <Layers3 className="w-4 h-4 text-muted-foreground" />
                <div className="flex items-center gap-x-2">
                    {
                        book.subCategoryId && (
                            <Badge variant="outline" className="rounded-full">{book.subCategory?.name}</Badge>
                        )
                    }
                    <p>in</p>
                    <Link href={`/categories/${book.category.id}`} className="text-sm text-muted-foreground hover:underline">{book.category.name}</Link>
                </div>
            </div>
            <div className="flex items-center gap-x-2">
                <Rating style={{ maxWidth: 70 }} value={4.5} readOnly />
                <Separator orientation="vertical" className="h-4" />
                <p className="text-sm text-muted-foreground">({book.totalReview} reviews)</p>
            </div>
            <div className="flex items-center gap-x-2">
                <p className="tracking-wider text-rose-500 line-through text-xl">৳{book?.price}</p>
                <p className="tracking-wider text-2xl">৳{book.discountPrice}</p>
                <p className="tracking-wider text-sm text-green-500">
                    {
                        book.discountPrice && (
                            <>
                                ({savingsPercentage(book.price, book.discountPrice)}% off)
                            </>
                        )
                    }
                </p>
            </div>
            {
                book.stock > 0 ? (
                    <div className="flex items-center gap-x-2">
                        <Badge variant="default" className="rounded-full">In Stock</Badge>
                        <p className="text-sm text-muted-foreground">({book.stock} copy left)</p>
                    </div>
                ) : (
                    <div className="flex items-center gap-x-2">
                        <Badge variant="destructive" className="rounded-full">Out of Stock</Badge>
                    </div>
                )
            }

            <div className="p-2 w-full flex gap-x-6">
                <div className="flex flex-col gap-y-1 justify-center items-center">
                    <p className="text-xs text-muted-foreground">Total Pages</p>
                    <Files className="w-6 h-6 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{book.length} Pages</p>
                </div>
                <div className="flex flex-col gap-y-1 justify-center items-center">
                    <p className="text-xs text-muted-foreground">Edition</p>
                    <FilePenLine className="w-6 h-6 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{book.edition} Edition</p>
                </div>
                <div className="flex flex-col gap-y-1 justify-center items-center">
                    <p className="text-xs text-muted-foreground">Publication</p>
                    <BookOpen className="w-6 h-6 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground truncate">{book.publication.name.split(" ").slice(0, 2).join(" ")}</p>
                </div>
            </div>

            <div className="flex md:hidden">
                <Dialog>
                    <DialogTrigger asChild>
                        {
                            book.demoPdfUrl && (
                                <Button variant="outline" size="lg" className="px-5 w-full">
                                    <Eye className="w-4 h-4 mr-2" />
                                    <span>একটু পড়ুন</span>
                                </Button>
                            )
                        }
                    </DialogTrigger>
                    <DialogContent className="max-w-[800px] h-[80%]">
                        <div className="h-[100%] w-[100%] overflow-hidden">
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                <Viewer
                                    fileUrl={book.demoPdfUrl ?? ""}
                                    defaultScale={1}
                                    enableSmoothScroll
                                />
                            </Worker>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="hidden md:flex items-center gap-x-6">
                <div className="flex items-center gap-x-2">
                    <Image src="/cod.jpg" alt="cod" width={25} height={25} />
                    <p className="text-sm text-muted-foreground">Cash on Delivery</p>
                </div>
                <div className="flex items-center gap-x-2">
                    <CornerDownLeft className="w-6 h-6" />
                    <p className="text-sm text-muted-foreground">7 Days Return</p>
                </div>
            </div>
            <div className="hidden md:flex items-center gap-x-2">
                <Dialog>
                    <DialogTrigger asChild>
                        {
                            book.demoPdfUrl && (
                                <Button variant="outline" size="lg" className="px-5">
                                    <Eye className="w-4 h-4 mr-2" />
                                    <span>একটু পড়ুন</span>
                                </Button>
                            )
                        }
                    </DialogTrigger>
                    <DialogContent className="max-w-[800px] h-[80%]">
                        <div className="h-[100%] w-full overflow-hidden">
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                <Viewer
                                    fileUrl={book.demoPdfUrl ?? ""}
                                    defaultScale={1.2}
                                    enableSmoothScroll
                                />
                            </Worker>
                        </div>
                    </DialogContent>
                </Dialog>
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="default" size="lg" className="px-5" onClick={() => handleAddToCart(book)}>
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                <span>Add to Cart</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add to cart</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div className="flex items-center gap-x-2">
                <Button variant="secondary" onClick={handleAddToWishlist} className="flex items-center gap-x-2">
                    <Heart className="w-4 h-4" />
                    <span className="hidden md:block">Add to Wishlist</span>
                </Button>
                <Button variant="secondary" className="flex items-center gap-x-2">
                    <Share2 className="w-4 h-4" />
                    <span className="hidden md:block">Share</span>
                </Button>
            </div>

            <div className={cn("flex md:hidden flex-col fixed bottom-0 left-0 right-0 z-50 px-3")}>
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
                    className={cn("w-full bg-background", reviews?.length === 0 && "hidden")}
                >
                    <CarouselContent className="h-[80px]">
                        {
                            isFetching ? (
                                <div className="flex items-center justify-center h-full">
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                </div>
                            ) : (
                                reviews?.map((review) => (
                                    <CarouselItem key={review.id}>
                                        <div className="flex items-center gap-x-2 px-3 py-2">
                                            <Image src={review.user.image || ""} alt={review.user.name || ""} width={20} height={20} className="rounded-full" />
                                            <div className="w-full">
                                                <div className="flex items-center gap-x-2">
                                                    <p className="text-sm font-semibold">{review.user.name}</p>
                                                    <Rating style={{ maxWidth: 50 }} value={review.rating} readOnly />
                                                </div>
                                                <p className="text-xs text-muted-foreground truncate">{review.content}</p>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))
                            )
                        }
                    </CarouselContent>
                </Carousel>
                <Button variant="default" size="lg" className="w-full" onClick={() => handleAddToCart(book)}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    <span>Add to Cart</span>
                </Button>
            </div>
        </div>
    )
}
