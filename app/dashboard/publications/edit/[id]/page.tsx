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
import { EditPublicationForm } from "./_components/edit-publication";

export const metadata: Metadata = {
    title: "BookGhor | Publications | Edit",
    description: "Edit publication."
};

interface Props {
    params: {
        id: string;
    };
}

const EditPublication = async ({ params: { id } }: Props) => {
    const publication = await db.publication.findUnique({
        where: {
            id,
        },
    });

    if (!publication) redirect("/dashboard/publications");

    return (
        <ContentLayout title="Publication">
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
                            <Link href="/dashboard/publications">Publications</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditPublicationForm publication={publication} />
        </ContentLayout>
    );
};

export default EditPublication;
