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
import { EditBookForm } from "./_components/edit-book-form";

export const metadata: Metadata = {
    title: "BookGhor | Books | Edit",
    description: "Edit book."
};

interface Props {
    params: {
        id: string;
    };
}

const EditBook = async ({ params: { id } }: Props) => {
    const book = await db.book.findUnique({
        where: {
            id,
        },
        include: {
            author: true,
            category: true,
            publication: true,
            subCategory: true,
        }
    });

    if (!book) redirect("/dashboard/books");

    return (
        <ContentLayout title="Book">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/seller">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/seller/books">Books</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditBookForm book={book} />
        </ContentLayout>
    );
};

export default EditBook;
