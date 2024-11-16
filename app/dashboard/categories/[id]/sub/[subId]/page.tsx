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

import { ContentLayout } from "@/app/dashboard/_components/content-layout";
import { db } from "@/lib/prisma";
import { Header } from "@/app/dashboard/books/_components/header";
import { CustomPagination } from "@/components/custom-pagination";
import { BookList } from "@/app/dashboard/books/_components/book-list";

export const metadata: Metadata = {
    title: "BookGhor | Categories | Sub Categories | Books",
    description: "Sub Categories list.",
};

interface Props {
    params: {
        id: string;
        subId: string;
    },
    searchParams: {
        name?: string;
        author?: string;
        publisher?: string;
        seller?: string;
        sort?: string;
        page?: string;
        perPage?: string;
        status?: BookStatus;
    };
}

const SubSubCategory = async ({ params: { id, subId }, searchParams }: Props) => {
    const { name, sort, page = "1", perPage = "5", status, author, publisher, seller } = searchParams;

    const itemsPerPage = parseInt(perPage, 10);
    const currentPage = parseInt(page, 10);

    const [books, totalBooks] = await Promise.all([
        db.book.findMany({
            where: {
                subCategoryId: subId,
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(author && { author: { name: { contains: author, mode: "insensitive" } } }),
                ...(publisher && { publication: { name: { contains: publisher, mode: "insensitive" } } }),
                ...(seller && { seller: { name: { contains: seller, mode: "insensitive" } } }),
                ...(status && { status: status }),
            },
            include: {
                author: true,
                publication: true,
                seller: true,
                category: true,
            },
            orderBy: {
                createdAt: sort === "newest" ? "desc" : "asc"
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        }),
        db.book.count({
            where: {
                subCategoryId: subId,
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(author && { author: { name: { contains: author, mode: "insensitive" } } }),
                ...(publisher && { publication: { name: { contains: publisher, mode: "insensitive" } } }),
                ...(seller && { seller: { name: { contains: seller, mode: "insensitive" } } }),
                ...(status && { status: status }),
            }
        })
    ])

    const totalPages = Math.ceil(totalBooks / itemsPerPage);

    return (
        <ContentLayout title="Category">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard/categories">Categories</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={`/dashboard/categories/${id}/sub`}>Sub Categories</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Books</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Books</CardTitle>
                    <CardDescription>Sub category books list.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <BookList books={books} />
                    <CustomPagination totalPages={totalPages} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
};

export default SubSubCategory;
