import { Metadata } from "next";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { CategoryStatus } from "@prisma/client";

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
import { Button } from "@/components/ui/button";

import { ContentLayout } from "@/app/dashboard/_components/content-layout";
import { db } from "@/lib/prisma";
import { SubCategoryList } from "./_components/sub-category-list";
import { CustomPagination } from "@/components/custom-pagination";
import { Header } from "../../_components/header";

export const metadata: Metadata = {
    title: "BookGhor | Categories | Sub Categories",
    description: "Sub Categories list.",
};

interface Props {
    params: {
        id: string;
    },
    searchParams: {
        name?: string;
        sort?: string;
        page?: string;
        perPage?: string;
        status?: CategoryStatus;
    };
}

const SubCategory = async ({ params: { id }, searchParams }: Props) => {
    const { name, sort, page = "1", perPage = "5", status } = searchParams;

    const itemsPerPage = parseInt(perPage, 10);
    const currentPage = parseInt(page, 10);

    const [subCategories, totalSubCategories] = await Promise.all([
        db.subCategory.findMany({
            where: {
                categoryId: id,
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(status && { status: status }),
            },
            include: {
                books: {
                    select: {
                        id: true
                    }
                }
            },
            orderBy: {
                createdAt: sort === "asc" ? "asc" : "desc",
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        }),
        db.subCategory.count({
            where: {
                categoryId: id,
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(status && { status: status }),
            }
        })
    ])

    const totalPages = Math.ceil(totalSubCategories / itemsPerPage);

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
                        <BreadcrumbPage>Sub Categories</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Button asChild>
                <Link href={`/dashboard/categories/${id}/sub/new`} className="flex items-center gap-x-3">
                    <PlusCircle />
                    <span>New</span>
                </Link>
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle>Sub Categories</CardTitle>
                    <CardDescription>Manage and organize your sub categories.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <SubCategoryList categoryId={id} subCategories={subCategories} />
                    <CustomPagination totalPages={totalPages} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default SubCategory
