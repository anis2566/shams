import { GET_USER } from '@/services/user.service';
import { Metadata } from "next";
import Link from "next/link";
import { BookStatus } from "@prisma/client";

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
import { ContentLayout } from '../_components/content-layout';
import { db } from '@/lib/prisma';
import { OrderList } from './_components/order-list';

export const metadata: Metadata = {
    title: "BookGhor | Orders",
    description: "Orders list.",
};


const Orders = async () => {
    const { userId } = await GET_USER();

    const orders = await db.order.findMany({
        where: {
            orderItems: {
                some: {
                    book: {
                        seller: {
                            userId: userId,
                        }
                    },
                },
            },
        },
        include: {
            orderItems: {
                include: {
                    book: true,
                },
            },
            user: true,
        },
    });

    return (
        <ContentLayout title="Orders">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/seller">Dashboard</Link>
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
                <CardContent>
                    <OrderList orders={orders} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Orders
