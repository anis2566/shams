import { WebPushProvider } from '@/providers/web-push-provider';
import { Sidebar } from './_components/sidebar';
import { GET_USER } from '@/services/user.service';
import { MobileSidebar } from './_components/sidebar/mobile-sidebar';

interface UserLayoutProps {
    children: React.ReactNode;
}

const UserLayout = async ({ children }: UserLayoutProps) => {
    const { user } = await GET_USER();

    return (
        <WebPushProvider>
            <div className="flex flex-col md:flex-row gap-x-4 px-3 md:px-0 mt-4 w-full relative">
                <div className="hidden md:block flex-shrink-0 md:w-[280px] border-r border-gray-200 h-[70vh] pr-4">
                    <Sidebar user={user} />
                </div>
                <MobileSidebar />
                <div className="flex-1">{children}</div>
            </div>
        </WebPushProvider>
    )
}

export default UserLayout
