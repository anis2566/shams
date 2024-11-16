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
import { AuthorStatus } from "@prisma/client";
import { db } from "@/lib/prisma";
import { AuthorList } from "./_components/author-list";
import { Header } from "./_components/header";
import { CustomPagination } from "@/components/custom-pagination";

export const metadata: Metadata = {
    title: "BookGhor | Authors",
    description: "Authors list.",
};

interface Props {
    searchParams: {
        name?: string;
        sort?: string;
        page?: string;
        perPage?: string;
        status?: AuthorStatus;
    };
}

const Authors = async ({ searchParams }: Props) => {
    const { name, sort, page = "1", perPage = "5", status } = searchParams;

    const itemsPerPage = parseInt(perPage, 10);
    const currentPage = parseInt(page, 10);

    const [authors, totalAuthor] = await Promise.all([
        db.author.findMany({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(status && { status: status }),
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
        db.author.count({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(status && { status: status }),
            },
        }),
    ]);

    const totalPages = Math.ceil(totalAuthor / itemsPerPage);

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
                        <BreadcrumbPage>Authors</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Authors</CardTitle>
                    <CardDescription>Manage and organize authors.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <AuthorList authors={authors} />
                    <CustomPagination totalPages={totalPages} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Authors
