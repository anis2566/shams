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

import { ContentLayout } from "../_components/content-layout";
import { PersonalInfoForm } from "@/app/(home)/user/profile/_components/personal-info-form";
import { GET_USER } from "@/services/user.service";
import { AccountForm } from "@/app/(home)/user/profile/_components/account-form";
import { PasswordForm } from "@/app/(home)/user/profile/_components/password-form";
import { AvatarForm } from "@/app/(home)/user/profile/_components/avatar-form";

export const metadata: Metadata = {
    title: "Shams Publication | Profile",
    description: "Profile page.",
};

const ProfilePage = async () => {
    const { user } = await GET_USER();

    return (
        <ContentLayout title="Profile">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Profile</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="space-y-5">
                <PersonalInfoForm user={user} />
                <AccountForm user={user} />
                <AvatarForm user={user} />
                <PasswordForm userId={user.id} />
            </div>
        </ContentLayout>
    )
}

export default ProfilePage;