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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { db } from "@/lib/prisma";
import { ContentLayout } from "../../_components/content-layout";
import { Header } from "../../books/_components/header";
import { CustomPagination } from "@/components/custom-pagination";
import { BookList } from "../../books/_components/book-list";

export const metadata: Metadata = {
    title: "BookGhor | Authors | Books",
    description: "Books list.",
};

interface Props {
    params: {
        id: string;
    },
    searchParams: {
        name?: string;
        author?: string;
        publisher?: string;
        category?: string;
        seller?: string;
        sort?: string;
        page?: string;
        perPage?: string;
        status?: BookStatus;
    };
}

const AuthorBooks = async ({ params: { id }, searchParams }: Props) => {
    const { name, sort, page = "1", perPage = "5", status, author, publisher, category, seller } = searchParams;

    const itemsPerPage = parseInt(perPage, 10);
    const currentPage = parseInt(page, 10);

    const [books, totalBooks] = await Promise.all([
        db.book.findMany({
            where: {
                authorId: id,
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(category && { category: { name: { contains: category, mode: "insensitive" } } }),
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
                createdAt: sort === "asc" ? "asc" : "desc",
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        }),
        db.book.count({
            where: {
                authorId: id,
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(category && { category: { name: { contains: category, mode: "insensitive" } } }),
                ...(seller && { seller: { name: { contains: seller, mode: "insensitive" } } }),
                ...(status && { status: status }),
            },
        }),
    ]);

    const totalPages = Math.ceil(totalBooks / itemsPerPage);

    return (
        <ContentLayout title="Author">
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
                            <Link href="/dashboard/authors">Authors</Link>
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
                    <CardDescription>
                        Books in this author.
                    </CardDescription>
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

export default AuthorBooks
