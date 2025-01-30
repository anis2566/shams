import { Metadata } from "next";

import { ResetForm } from "./_components/reset-form";

export const metadata: Metadata = {
    title: "Shams Publication | Reset Password",
    description: "Start up Project",
  };

const ResetPassword = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center py-4">
            <ResetForm />
        </div>
    )
}

export default ResetPassword;