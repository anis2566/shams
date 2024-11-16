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
import { EditAuthorForm } from "./_components/edit-author-form";

export const metadata: Metadata = {
    title: "BookGhor | Authors | Edit",
    description: "Edit author."
};

interface Props {
    params: {
        id: string;
    };
}

const EditAuthor = async ({ params: { id } }: Props) => {
    const author = await db.author.findUnique({
        where: {
            id,
        },
    });

    if (!author) redirect("/dashboard/authors");

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
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditAuthorForm author={author} />
        </ContentLayout>
    );
};

export default EditAuthor;
