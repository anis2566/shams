import { EllipsisVertical, Eye } from "lucide-react";
import Link from "next/link";
import { Book, Order, OrderStatus, PaymentStatus, OrderItem } from "@prisma/client";

import { TableHeader } from "@/components/ui/table";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface OrderItemWithRelations extends OrderItem {
    book: Book;
}

interface OrderWithRelations extends Order {
    orderItems: OrderItemWithRelations[];
}

export const OrderList = ({ orders }: { orders: OrderWithRelations[] }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Order Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>
                                {
                                    order.orderItems.map((item) => (
                                        <div key={item.id}>
                                            {item.book.name.length > 35 ? `${item.book.name.slice(0, 35)}...` : item.book.name}
                                        </div>
                                    ))
                                }
                            </TableCell>
                            <TableCell>৳{order.totalPaidAmount}</TableCell>
                            <TableCell>
                                <Badge variant="secondary">{order.paymentMethod}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge className="rounded-full" variant={order.paymentStatus === PaymentStatus.Paid ? "default" : order.paymentStatus === PaymentStatus.Failed ? "destructive" : "outline"}>{order.paymentStatus}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge className="rounded-full" variant={order.status === OrderStatus.Delivered ? "default" : order.status === OrderStatus.Cancelled ? "destructive" : order.status === OrderStatus.Returned ? "destructive" : order.status === OrderStatus.Processing ? "secondary" : "outline"}>{order.status}</Badge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <EllipsisVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href={`/user/orders/${order.id}`}
                                                className="flex items-center gap-x-3"
                                            >
                                                <Eye className="h-4 w-4" />
                                                View
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}