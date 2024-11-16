import { Metadata } from "next";
import Link from "next/link";

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
import { ReviewList } from "./_components/reveiw-list";
import { db } from "@/lib/prisma";
import { CustomPagination } from "@/components/custom-pagination";
import { Header } from "./_components/header";

export const metadata: Metadata = {
    title: "BookGhor | Reviews",
    description: "Reviews list.",
};

interface Props {
    searchParams: {
        name?: string;
        sort?: string;
        page?: string;
        perPage?: string;
    };
}


const Reviews = async ({ searchParams }: Props) => {
    const { name, sort, page = "1", perPage = "5", } = searchParams;

    const itemsPerPage = parseInt(perPage, 10);
    const currentPage = parseInt(page, 10);

    const [reviews, totalReviews] = await Promise.all([
        db.review.findMany({
            where: {
                ...(name && {
                    user: {
                        name: {
                            contains: name,
                            mode: "insensitive",
                        },
                    },
                }),
            },
            orderBy: {
                createdAt: sort === "asc" ? "asc" : "desc",
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
            include: {
                book: true,
                user: true,
            },
        }),
        db.review.count({
            where: {
                ...(name && {
                    user: {
                        name: { contains: name, mode: "insensitive" },
                    },
                }),
            },
        }),
    ]);

    const totalPages = Math.ceil(totalReviews / itemsPerPage);

    return (
        <ContentLayout title="Reviews">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Reviews</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Reviews</CardTitle>
                    <CardDescription>Manage and organize reviews.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <ReviewList reviews={reviews} />
                    <CustomPagination totalPages={totalPages} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Reviews
