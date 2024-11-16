import { Metadata } from "next";
import Link from "next/link";
import { SellerStatus } from "@prisma/client";

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
import { SellerList } from "./_components/seller-list";
import { Header } from "./_components/header";

export const metadata: Metadata = {
    title: "BookGhor | Sellers",
    description: "Sellers list.",
};

interface Props {
    searchParams: {
        name?: string;
        sort?: string;
        page?: string;
        perPage?: string;
        status?: SellerStatus;
    };
}

const Sellers = async ({ searchParams }: Props) => {
    const { name, sort, page = "1", perPage = "5", status } = searchParams;

    const itemsPerPage = parseInt(perPage, 10);
    const currentPage = parseInt(page, 10);

    const [sellers, totalSellers] = await Promise.all([
        db.seller.findMany({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(status && {
                    status: {
                        not: SellerStatus.Pending,
                        equals: status
                    }
                }),
            },
            include: {
                books: {
                    select: {
                        id: true,
                    }
                }
            },
            orderBy: {
                createdAt: sort === "asc" ? "asc" : "desc",
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        }),
        db.seller.count({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(status && { status: status }),
            },
        }),
    ]);

    const totalPages = Math.ceil(totalSellers / itemsPerPage);

    return (
        <ContentLayout title="Sellers">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Sellers</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Sellers</CardTitle>
                    <CardDescription>Manage and organize sellers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <SellerList sellers={sellers} />
                    <CustomPagination totalPages={totalPages} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Sellers
