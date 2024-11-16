"use client"

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Author, Book } from "@prisma/client";
import { useSession } from "next-auth/react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";

interface BookWithAuthor extends Book {
    author: Author;
}

const Cart = () => {
    const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useCart();
    const { addToWishlist } = useWishlist();
    const { data: session } = useSession()

    const handleRemoveFromCart = (bookId: string) => {
        removeFromCart(bookId);
        toast.success("Book removed from cart");
    }

    const handleAddToWishlist = (book: BookWithAuthor) => {
        addToWishlist(book);
        toast.success("Book added to wishlist");
        removeFromCart(book.id);
    }

    if (cart.length === 0) {
        return (
            <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-y-4">
                <Image src="/empty-cart.png" alt="empty cart" width={200} height={200} />
                <h1 className="text-2xl font-semibold text-muted-foreground">Your cart is empty!</h1>
                <Link href="/">
                    <Button>Continue shopping</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="mt-4 px-3 md:px-0">
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>{cart.length} items in cart</CardTitle>
                        <CardDescription>
                            Total ৳{cart.reduce((acc, item) => acc + (item.quantity * item.price), 0)}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {cart.map((item) => (
                            <div key={item.book.id} className="flex justify-between">
                                <div className="flex gap-x-3">
                                    <Image src={item.book.imageUrl} alt={item.book.name} width={100} height={100} />
                                    <div className="flex flex-col gap-y-1">
                                        <Link href={`/books/${item.book.id}`} className="text-sm md:text-lg font-semibold hover:underline">{item.book.name}</Link>
                                        <Link href={`/authors/${item.book.author.id}`} className="text-sm text-muted-foreground hover:underline">{item.book.author.name}</Link>
                                        <div className="flex md:hidden items-center gap-x-2">
                                            <p className="text-sm md:text-lg font-semibold">৳{item.price * item.quantity}</p>
                                            <p className="text-sm text-rose-500 line-through">৳{item.book.price * item.quantity}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{item.book.stock} copy left</p>
                                        <div className="flex items-center">
                                            <TooltipProvider delayDuration={0}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveFromCart(item.book.id)}>
                                                            <Trash2 className="w-4 h-4 text-red-500" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        Remove from cart
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                            <TooltipProvider delayDuration={0}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="ghost" size="icon" onClick={() => handleAddToWishlist(item.book)}>
                                                            <Heart className="w-4 h-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        Add to wishlist
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-y-1">
                                    <p className="hidden md:block text-sm md:text-lg font-semibold">৳{item.price * item.quantity}</p>
                                    {item.book.discountPrice && (
                                        <p className="hidden md:block text-sm text-rose-500 line-through">৳{item.book.price * item.quantity}</p>
                                    )}
                                    <div className="flex flex-col md:flex-row items-center gap-x-2">
                                        <TooltipProvider delayDuration={0}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="outline" size="icon" onClick={() => decrementQuantity(item.book.id)}>
                                                        <Minus className="w-4 h-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    Decrease quantity
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <p className="text-lg">{item.quantity}</p>
                                        <TooltipProvider delayDuration={0}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="outline" size="icon" onClick={() => incrementQuantity(item.book.id)}>
                                                        <Plus className="w-4 h-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    Increase quantity
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Checkout Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between border-b p-2">
                            <p>Subtotal</p>
                            <p>৳{cart.reduce((acc, item) => acc + (item.quantity * item.price), 0)}</p>
                        </div>
                        <div className="flex justify-between border-b p-2">
                            <p>Shipping <span className="text-xs text-muted-foreground">(changeable)</span></p>
                            <p>৳100</p>
                        </div>
                        <div className="flex justify-between border-b p-2">
                            <p>Total</p>
                            <p>৳{cart.reduce((acc, item) => acc + (item.quantity * item.price), 100).toFixed(2)}</p>
                        </div>
                        {
                            session && session.userId ? (

                                <Button className="w-full" asChild>
                                    <Link href="/checkout">
                                        Checkout
                                        <ArrowRight className="w-4 h-4 ml-2 animate-pulse" />
                                    </Link>
                                </Button>
                            ) : (
                                <Button className="w-full" asChild>
                                    <Link href={`/auth/sign-in?callbackUrl=/cart`}>
                                        Login to checkout
                                        <ArrowRight className="w-4 h-4 ml-2 animate-pulse" />
                                    </Link>
                                </Button>
                            )
                        }
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Cart
