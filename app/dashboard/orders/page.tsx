import { Metadata } from "next";
import Link from "next/link";
import { OrderStatus, PaymentStatus } from "@prisma/client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ContentLayout } from "../_components/content-layout";
import { db } from "@/lib/prisma";
import { CustomPagination } from "@/components/custom-pagination";
import { OrderList } from "./_components/order-list";
import { Header } from "./_components/header";

export const metadata: Metadata = {
    title: "Shams Publication | Orders",
    description: "Orders list.",
};

interface Props {
    searchParams: {
        name?: string;
        sort?: string;
        page?: string;
        perPage?: string;
        status?: OrderStatus;
        paymentStatus?: PaymentStatus;
    }; 
}

const Orders = async ({ searchParams }: Props) => {
    const { name, sort, page = "1", perPage = "5", status, paymentStatus } = searchParams;

    const itemsPerPage = parseInt(perPage, 10);
    const currentPage = parseInt(page, 10);

    const [orders, totalOrders] = await Promise.all([
        db.order.findMany({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(status && { status: status }),
                ...(paymentStatus && { paymentStatus: paymentStatus }),
            },
            include: {
                orderItems: {
                    include: {
                        book: true,
                    },
                },
                user: true,
            },
            orderBy: {
                createdAt: sort === "asc" ? "asc" : "desc",
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        }),
        db.order.count({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(status && { status: status }),
                ...(paymentStatus && { paymentStatus: paymentStatus }),
            },
        }),
    ])

    const totalPages = Math.ceil(totalOrders / itemsPerPage);

    return (
        <ContentLayout title="Orders">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Orders</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>Manage and organize orders.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <OrderList orders={orders} />
                    <CustomPagination totalPages={totalPages} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Orders
