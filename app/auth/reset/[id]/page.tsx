import { Metadata } from "next";
import { VerifyForm } from "./_components/verify-form";

export const metadata: Metadata = {
    title: "Shams Publication | Verify",
    description: "Start up Project",
};

interface Props {
    params: {
        id: string;
    }
}

const Verify = ({ params }: Props) => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center py-4">
            <VerifyForm id={params.id} />
        </div>
    )
}

export default Verify;