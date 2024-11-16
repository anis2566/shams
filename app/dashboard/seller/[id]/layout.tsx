import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";
import { ContentLayout } from "../../_components/content-layout";
import { Sidebar } from "./_components/sidebar";


interface SellerLayoutProps {
    children: React.ReactNode;
    params: {
        id: string;
    }
}

const SellerLayout = async ({ children, params: { id } }: SellerLayoutProps) => {
    const seller = await db.seller.findUnique({
        where: {
            id
        }
    })

    if (!seller) return redirect("/dashboard/seller")

    return (
        <ContentLayout title="Patient">
            <div className="flex gap-x-4">
                <div className="flex-shrink-0 md:w-[280px]">
                    <Sidebar seller={seller} />
                </div>
                <div className="flex-1">{children}</div>
            </div>
        </ContentLayout>
    )
}

export default SellerLayout
