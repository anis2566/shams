import { Sidebar } from './_components/sidebar';
import { GET_USER } from '@/services/user.service';

interface UserLayoutProps {
    children: React.ReactNode;
}

const UserLayout = async ({ children }: UserLayoutProps) => {
    const { user } = await GET_USER();

    return (
        <div className="flex flex-col md:flex-row gap-x-4 px-3 md:px-0 mt-4 w-full">
            <div className="hidden md:block flex-shrink-0 md:w-[280px] border-r border-gray-200 h-[70vh] pr-4">
                <Sidebar user={user} />
            </div>
            <div className="flex-1">{children}</div>
        </div>
    )
}

export default UserLayout
