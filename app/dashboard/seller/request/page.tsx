import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ContentLayout } from "../../_components/content-layout";
import { db } from "@/lib/prisma";
import { SellerStatus } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RequestList } from "./_components/request-list";


const SellerRequest = async () => {
    const sellers = await db.seller.findMany({
        where: {
            // status: SellerStatus.Pending
        },
        include: {
            user: true
        }
    })


    return (
        <ContentLayout title="Seller">
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
                            <Link href="/dashboard/seller">Sellers</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Request</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Seller Request</CardTitle>
                    <CardDescription>List of seller request</CardDescription>
                </CardHeader>
                <CardContent>
                    <RequestList sellers={sellers} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default SellerRequest
