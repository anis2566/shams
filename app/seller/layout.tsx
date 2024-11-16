import { DashboardLayout } from "./_components/dashboard-layout";
import { GET_USER } from "@/services/user.service";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = await GET_USER();

    return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
