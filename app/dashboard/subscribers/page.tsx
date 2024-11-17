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
import { db } from "@/lib/prisma";
import { SubscriberList } from "./_components/subscriber-list";

export const metadata: Metadata = {
    title: "Shams Publications | Subscribers",
    description: "Subscribers list.",
};

const Subscribers = async () => {
    const subscribers = await db.subscriber.findMany();

    return (
        <ContentLayout title="Subscribers">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Subscribers</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Subscribers</CardTitle>
                    <CardDescription>Manage and organize subscribers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <SubscriberList subscribers={subscribers} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
};

export default Subscribers;
