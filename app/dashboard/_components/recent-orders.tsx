import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Order, OrderItem, User, Book, OrderStatus } from "@prisma/client";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OrderWithRelations extends Order {
    user: User;
    orderItems: OrderItem[];
}

interface Props {
    orders: OrderWithRelations[];
}

export const RecentOrders = ({ orders }: Props) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Recepient</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>No of Item</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.user.name}</TableCell>
                                    <TableCell>{order.phone}</TableCell>
                                    <TableCell>{order.orderItems.length}</TableCell>
                                    <TableCell>{order.totalPaidAmount}</TableCell>
                                    <TableCell>
                                        <Badge variant="default" className="rounded-full">
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button asChild variant="ghost" size="icon">
                                            <Link href={`/dashboard/orders/${order.id}`}>
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}