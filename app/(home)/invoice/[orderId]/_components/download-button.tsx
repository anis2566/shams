"use client";

import { Book, Order, OrderItem } from "@prisma/client";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";

interface OrderItemWithBook extends OrderItem {
    book: Book;
}

interface OrderWithRelations extends Order {
    orderItems: OrderItemWithBook[];
}

interface OrderInvoiceProps {
    order: OrderWithRelations;
}

export const DownloadButton = ({ order }: OrderInvoiceProps) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleDownloadPDF = async () => {
        if (elementRef.current === null) return;
        setIsLoading(true);

        try {
            const image = await toPng(elementRef.current, {
                quality: 1,
                pixelRatio: 2,
            });

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: [794, 1123],
            });

            pdf.addImage(image, "PNG", 0, 0, 794, 1123);
            pdf.save("invoice.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
            // You might want to add some error handling UI here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center">
            <div className="absolute -left-[1000%]">
                <div
                    ref={elementRef}
                    style={{ padding: "20px" }}
                >
                    <Card className="max-w-3xl mx-auto w-[794px] h-[1123px]">
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
                </div>
            </div>
            <div className="flex items-center gap-x-3 mt-6">
                <Button variant="outline" asChild>
                    <Link href="/">Explore More</Link>
                </Button>
                <Button onClick={handleDownloadPDF} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating PDF...
                        </>
                    ) : (
                        "Download"
                    )}
                </Button>
            </div>
        </div>
    );
};
