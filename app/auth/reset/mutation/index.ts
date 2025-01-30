import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { CHANGE_PASSWORD, RESET_PASSWORD, VERIFY_FORGOT_PASSWORD } from "../action";
import { useForgotPassword } from "@/hooks/use-user";

export const useResetPasswordMutation = () => {
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: RESET_PASSWORD,
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.success);
                router.push(`/auth/reset/${data.id}`);
            }
            if (data.error) {
                toast.error(data.error);
            }
        },
    });

    return mutation;
};

export const useVerifyForgotPasswordMutation = () => {
    const { onOpen } = useForgotPassword();

    const mutation = useMutation({
        mutationFn: VERIFY_FORGOT_PASSWORD,
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.success);
                onOpen(data.id);
            }
            if (data.error) {
                toast.error(data.error);
            }
        },
    });

    return mutation;
};


export const useChangePasswordMutation = () => {
    const router = useRouter();
    const { onClose } = useForgotPassword();

    const mutation = useMutation({
        mutationFn: CHANGE_PASSWORD,
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.success);
                onClose();
                router.push("/auth/sign-in");
            }
            if (data.error) {
                toast.error(data.error);
            }
        },
    });

    return mutation;
};
