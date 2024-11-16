import { WebPushProvider } from "@/providers/web-push-provider";
import { DashboardLayout } from "./_components/dashboard-layout";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <WebPushProvider>
            <DashboardLayout>{children}</DashboardLayout>
        </WebPushProvider>
    );
}
