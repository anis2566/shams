import { GET_USER } from '@/services/user.service';
import { Metadata } from 'next';
import { db } from '@/lib/prisma';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderList } from './_components/order-list';
import { Header } from './_components/header';
import { OrderStatus } from '@prisma/client';
import { CustomPagination } from '@/components/custom-pagination';

export const metadata: Metadata = {
    title: "BookGhor | Orders",
    description: "Orders page.",
};

interface Props {
    searchParams: {
        sort?: string;
        page?: string;
        perPage?: string;
        status?: OrderStatus;
    };
}

const Orders = async ({ searchParams }: Props) => {
    const { sort, page = "1", perPage = "5", status } = searchParams;

    const itemsPerPage = parseInt(perPage, 10);
    const currentPage = parseInt(page, 10);

    const { user } = await GET_USER();

    const [orders, totalOrders] = await Promise.all([
        db.order.findMany({
            where: {
                userId: user.id,
                ...(status && { status: status }),
            },
            include: {
                orderItems: {
                    include: {
                        book: true,
                    },
                },
            },
            orderBy: {
                createdAt: sort === "asc" ? "asc" : "desc",
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        }),
        db.order.count({
            where: {
                userId: user.id,
                ...(status && { status: status }),
            },
        }),
    ]);

    const totalPages = Math.ceil(totalOrders / itemsPerPage);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>{orders.length} pending orders.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative pb-20 md:pb-0">
                <Header />
                <OrderList orders={orders} />
                <CustomPagination totalPages={totalPages} />
            </CardContent>
        </Card>
    )
}

export default Orders
