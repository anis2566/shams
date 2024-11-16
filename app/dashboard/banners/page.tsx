import { Metadata } from "next";
import Link from "next/link";
import { BannerStatus } from "@prisma/client";

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
import { BannerList } from "./_components/banner-list";
import { Header } from "./_components/header";


export const metadata: Metadata = {
    title: "BookGhor | Banners",
    description: "Banners list.",
};

interface Props {
    searchParams: {
        sort?: string;
        page?: string;
        perPage?: string;
        status?: BannerStatus;
    };
}

const Banners = async ({ searchParams }: Props) => {
    const { sort, page = "1", perPage = "5", status } = searchParams;

    const itemsPerPage = parseInt(perPage, 10);
    const currentPage = parseInt(page, 10);

    const [banners, totalBanners] = await Promise.all([
        db.banner.findMany({
            where: {
                ...(status && { status: status }),
            },
            orderBy: {
                createdAt: sort === "asc" ? "asc" : "desc",
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        }),
        db.banner.count({
            where: {
                ...(status && { status: status }),
            },
        }),
    ]);

    const totalPages = Math.ceil(totalBanners / itemsPerPage);

    return (
        <ContentLayout title="Banner">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Banners</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Banners</CardTitle>
                    <CardDescription>Manage and organize banners.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <BannerList banners={banners} />
                    <CustomPagination totalPages={totalPages} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Banners
