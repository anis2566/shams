import { redirect } from "next/navigation";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";

import { db } from "@/lib/prisma";
import { DownloadButton } from "./_components/download-button";

interface Props {
    params: {
        orderId: string;
    }
}

const OrderInvoice = async ({ params }: Props) => {
    const order = await db.order.findUnique({
        where: {
            id: params.orderId,
        },
        include: {
            orderItems: {
                include: {
                    book: true,
                }
            }
        },
    });

    if (!order) return redirect("/");

    return (
        <div className="px-3 md:px-0 mt-4 gap-y-4">
            <Card className="w-full max-w-3xl mx-auto max-h-fit">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Invoice</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Invoice Details</h2>
                            <p><span className="font-medium">Invoice Number:</span> {order.id.slice(-6).toUpperCase()}</p>
                            <p><span className="font-medium">Date:</span> {order.createdAt.toLocaleDateString()}</p>
                            <p><span className="font-medium">Due Date:</span> {order.createdAt.toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Customer</h2>
                            <p>{order.name}</p>
                            <p>{order.address}</p>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Book</TableHead>
                                <TableHead className="text-right">Quantity</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-right font-medium">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.orderItems.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.book.name}</TableCell>
                                    <TableCell className="text-right">{item.quantity}</TableCell>
                                    <TableCell className="text-right">৳{item.price.toFixed(2)}</TableCell>
                                    <TableCell className="text-right font-medium">৳{(item.quantity * item.price).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell>Shipping Charge</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell className="text-right font-medium">৳{order.shippingCharge}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <div className="mt-6 text-right">
                        <p className="text-lg font-semibold">Total: ৳{order.totalPaidAmount}</p>
                    </div>
                </CardContent>
            </Card>
            <DownloadButton order={order} />
        </div>
    )
}

export default OrderInvoice
