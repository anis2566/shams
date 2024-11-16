import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { db } from "@/lib/prisma";
import { ContentLayout } from "@/app/dashboard/_components/content-layout";
import { EditSubCategoryForm } from "./_components/edit-sub-category-form";

export const metadata: Metadata = {
    title: "BookGhor | Categories | Sub | Edit",
    description: "Edit sub category."
};

interface Props {
    params: {
        id: string;
        subId: string;
    };
}

const EditSubCategory = async ({ params: { subId, id } }: Props) => {
    const subCategory = await db.subCategory.findUnique({
        where: {
            id: subId,
        },
    });

    if (!subCategory) redirect(`/dashboard/categories/${id}/sub`);

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
                        <BreadcrumbPage>Edit Sub Category</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditSubCategoryForm subCategory={subCategory} />
        </ContentLayout>
    );
};

export default EditSubCategory;
