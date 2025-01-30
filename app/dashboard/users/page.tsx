import Link from "next/link";
import { Role } from "@prisma/client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

import { ContentLayout } from "../_components/content-layout";
import { db } from "@/lib/prisma";
import { UserList } from "./_components/user-list";
import { CustomPagination } from "@/components/custom-pagination";

interface Props {
    searchParams: {
        name?: string;
        sort?: string;
        page?: string;
        perPage?: string;
        role?: Role;
    };
}

const Users = async ({ searchParams }: Props) => {
    const { name, sort, page = "1", perPage = "5", role } = searchParams;

    const itemsPerPage = parseInt(perPage, 10);
    const currentPage = parseInt(page, 10);

    const [users, totalUsers] = await Promise.all([
        db.user.findMany({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(role && { role: role }),
            },
            orderBy: {
                createdAt: sort === "asc" ? "asc" : "desc",
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        }),
        db.user.count({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(role && { role: role }),
            },
        }),
    ]);

    return (
        <ContentLayout title="Users">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Users</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>Manage and organize users.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <UserList users={users} />
                    <CustomPagination totalCount={totalUsers} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
};

export default Users;
