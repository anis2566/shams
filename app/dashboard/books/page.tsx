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

import { ContentLayout } from "../_components/content-layout";
import { db } from "@/lib/prisma";
import { CustomPagination } from "@/components/custom-pagination";
import { BookList } from "./_components/book-list";
import { Header } from "./_components/header";

export const metadata: Metadata = {
    title: "BookGhor | Books",
    description: "Books list.",
};

interface Props {
    searchParams: {
        name?: string;
        category?: string;
        author?: string;
        publisher?: string;
        seller?: string;
        sort?: string;
        page?: string;
        perPage?: string;
        status?: BookStatus;
    };
}

const Books = async ({ searchParams }: Props) => {
    const { name, sort, page = "1", perPage = "5", status, category, author, publisher, seller } = searchParams;

    const itemsPerPage = parseInt(perPage, 10);
    const currentPage = parseInt(page, 10);

    const [books, totalBooks] = await Promise.all([
        db.book.findMany({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(category && { category: { name: { contains: category, mode: "insensitive" } } }),
                ...(author && { author: { name: { contains: author, mode: "insensitive" } } }),
                ...(publisher && { publication: { name: { contains: publisher, mode: "insensitive" } } }),
                ...(seller && { seller: { name: { contains: seller, mode: "insensitive" } } }),
                ...(status && { status: status }),
            },
            include: {
                category: true,
                author: true,
                publication: true,
                seller: true,
            },
            orderBy: {
                createdAt: sort === "asc" ? "asc" : "desc",
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        }),
        db.book.count({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(category && { category: { name: { contains: category, mode: "insensitive" } } }),
                ...(author && { author: { name: { contains: author, mode: "insensitive" } } }),
                ...(publisher && { publication: { name: { contains: publisher, mode: "insensitive" } } }),
                ...(seller && { seller: { name: { contains: seller, mode: "insensitive" } } }),
                ...(status && { status: status }),
            },
        }),
    ]);

    const totalPages = Math.ceil(totalBooks / itemsPerPage);

    return (
        <ContentLayout title="Books">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
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
                    <CardDescription>Manage and organize books.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <BookList books={books} />
                    <CustomPagination totalPages={totalPages} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Books
