import { Metadata } from "next";
import { OrderStatus } from "@prisma/client";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { db } from "@/lib/prisma";

export const metadata: Metadata = {
    title: "BookGhor | Order Details",
    description: "Order details page.",
};

interface Props {
    params: {
        id: string;
    };
}

const OrderDetails = async ({ params: { id } }: Props) => {
    const order = await db.order.findUnique({
        where: {
            id,
        },
        include: {
            orderItems: {
                include: {
                    book: {
                        include: {
                            author: true,
                        },
                    },
                },
            },
        },
    });

    if (!order) return redirect("/user/orders");

    return (
        <div className="w-full grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Books</CardTitle>
                        <CardDescription>List of books in this order.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {
                            order.orderItems.map((item) => (
                                <div key={item.book.id} className="flex justify-between">
                                    <div className="flex gap-x-3">
                                        <Image src={item.book.imageUrl} alt={item.book.name} width={100} height={100} />
                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-sm md:text-lg font-semibold">{item.book.name}</p>
                                            <p className="text-sm text-muted-foreground">{item.book.author.name}</p>
                                            <p className="text-sm font-semibold">{item.quantity}x copy</p>
                                            <p className="text-sm">৳{item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Shipping Info</CardTitle>
                        <CardDescription>Shipping information for this order.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-semibold">Name</p>
                            <p className="text-muted-foreground">{order.name}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Phone</p>
                            <p className="text-muted-foreground">{order.phone}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Alternate Phone</p>
                            <p className="text-muted-foreground">{order?.altPhone}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Country</p>
                            <p className="text-muted-foreground">{order.country}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">City</p>
                            <p className="text-muted-foreground">{order.city}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Thana</p>
                            <p className="text-muted-foreground">{order.thana}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Zone</p>
                            <p className="text-muted-foreground">{order.zone}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Address</p>
                            <p className="text-muted-foreground">{order.address}</p>
                        </div>

                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between border-b p-2">
                            <p>Subtotal</p>
                            <p>৳{order.totalPrice}</p>
                        </div>
                        <div className="flex justify-between border-b p-2">
                            <p>Shipping</p>
                            <p>৳{order.shippingCharge}</p>
                        </div>
                        <div className="flex justify-between p-2">
                            <p>Total</p>
                            <p>৳{order.totalPaidAmount}</p>
                        </div>

                    </CardContent>
                    <CardFooter>
                        <div className="flex justify-between w-full">
                            <Badge className="rounded-full h-6" variant={order.status === OrderStatus.Pending ? "outline" : order.status === OrderStatus.Processing ? "outline" : order.status === OrderStatus.Shipped ? "secondary" : order.status === OrderStatus.Delivered ? "default" : "destructive"}>
                                {order.status}
                            </Badge>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default OrderDetails
