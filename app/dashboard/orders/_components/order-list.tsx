"use client";
import { Order, OrderItem, Book, User, PaymentStatus, OrderStatus } from "@prisma/client";
import { Eye, RefreshCcw, MoreVerticalIcon, Trash2 } from "lucide-react";
import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useOrder, useOrderStatus } from "@/hooks/use-order";
import { EmptyData } from "@/components/empty-data";

interface OrderItemWithBook extends OrderItem {
    book: Book;
}

interface OrderWithRelations extends Order {
    orderItems: OrderItemWithBook[];
    user: User;
}

interface Props {
    orders: OrderWithRelations[];
}

export const OrderList = ({ orders }: Props) => {
    const { onOpen: onOpenOrderStatus } = useOrderStatus();
    const { onOpen: onOpenDeleteOrder } = useOrder();

    if (orders.length === 0) {
        return <EmptyData title="No orders found" />
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Recepient</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>No of Item</TableHead>
                        <TableHead>Subtotal</TableHead>
                        <TableHead>Shipping</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Payment Status</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>
                                <div className="flex items-center gap-x-3">
                                    <Avatar>
                                        <AvatarImage src={order.user.image || ""} alt={order.user.name || ""} />
                                        <AvatarFallback>
                                            {order.user.name?.[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p>{order.user.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {order.user.email}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{order.name}</TableCell>
                            <TableCell>{order.phone}</TableCell>
                            <TableCell>{order.orderItems.length}</TableCell>
                            <TableCell>৳{order.totalPrice}</TableCell>
                            <TableCell>৳{order.shippingCharge}</TableCell>
                            <TableCell>৳{order.totalPaidAmount}</TableCell>
                            <TableCell>
                                <Badge>{order.paymentMethod}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge className="rounded-full" variant={order.paymentStatus === PaymentStatus.Paid ? "default" : order.paymentStatus === PaymentStatus.Failed ? "destructive" : "outline"}>
                                    {order.paymentStatus}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge className="rounded-full" variant={order.status === OrderStatus.Pending ? "outline" : order.status === OrderStatus.Processing ? "outline" : order.status === OrderStatus.Shipped ? "secondary" : order.status === OrderStatus.Delivered ? "default" : "destructive"}>
                                    {order.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <MoreVerticalIcon className="w-4 h-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent side="right" className="p-2 max-w-[180px]">
                                        <Button asChild variant="ghost" className="flex items-center justify-start gap-x-2 w-full">
                                            <Link href={`/dashboard/orders/${order.id}`} >
                                                <Eye className="w-4 h-4 mr-2" />
                                                View
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" className="flex items-center justify-start gap-x-2 w-full" onClick={() => onOpenOrderStatus(order.id)}>
                                            <RefreshCcw className="w-4 h-4 mr-2" />
                                            Change Status
                                        </Button>
                                        <Button variant="ghost" className="flex items-center justify-start gap-x-2 w-full text-red-500 hover:text-red-400" onClick={() => onOpenDeleteOrder(order.id)}>
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete
                                        </Button>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
