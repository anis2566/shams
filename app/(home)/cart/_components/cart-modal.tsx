"use client";

import { Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { useCart, useOpenCartModal } from "@/hooks/use-cart";

export const CartModal = () => {
    const { cart, removeFromCart, decrementQuantity, incrementQuantity } = useCart();
    const { open, onClose } = useOpenCartModal();

    const handleRemoveFromCart = (bookId: string) => {
        removeFromCart(bookId);
        toast.success("Book removed from cart");
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Your Cart</DialogTitle>
                    <DialogDescription>
                        {cart.length} items in your cart
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="h-[50vh]">
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div key={item.book.id} className="flex justify-between">
                                <div className="flex gap-x-3">
                                    <Image src={item.book.imageUrl} alt={item.book.name} width={100} height={100} />
                                    <div className="flex flex-col gap-y-1">
                                        <Link href={`/books/${item.book.id}`} className="text-sm md:text-lg font-semibold hover:underline">{item.book.name}</Link>
                                        <Link href={`/authors/${item.book.author.id}`} className="text-sm text-muted-foreground hover:underline">{item.book.author.name}</Link>
                                        <div className="flex items-center gap-x-2">
                                            <p className="text-sm font-semibold">৳{item.book.discountPrice ? item.book.discountPrice : item.book.price}</p>
                                            {item.book.discountPrice && (
                                                <p className="text-sm text-rose-500 line-through">৳{item.book.price}</p>
                                            )}
                                        </div>
                                        <p className="text-sm">
                                            {item.quantity} * {item.price} = ৳{(item.price * item.quantity).toFixed(2)}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-x-2">
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">Total: ৳{cart.reduce((acc, item) => acc + (item.book.discountPrice ? item.book.discountPrice : item.book.price) * item.quantity, 0).toFixed(2)}</p>
                    <Button asChild onClick={onClose}>
                        <Link href="/checkout">Checkout</Link>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
