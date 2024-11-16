import { Metadata } from 'next';

import { PersonalInfoForm } from './_components/personal-info-form';
import { GET_USER } from '@/services/user.service';
import { AccountForm } from './_components/account-form';
import { AvatarForm } from './_components/avatar-form';
import { PasswordForm } from './_components/password-form';

export const metadata: Metadata = {
  title: "BookGhor | Profile",
  description: "Profile page.",
};


const Profile = async () => {
  const { user } = await GET_USER();

  return (
    <div className="space-y-5">
      <PersonalInfoForm user={user} />
      <AccountForm user={user} />
      <AvatarForm user={user} />
      <PasswordForm userId={user.id} />
    </div>
  )
}

export default Profile
