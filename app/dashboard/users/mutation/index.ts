import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { DELETE_USER_ACTION, updateUserRole } from "../action";

interface UpdateUserRoleMutationProps {
    onClose: () => void;
}

export const useUpdateUserRoleMutation = ({
    onClose,
}: UpdateUserRoleMutationProps) => {
    return useMutation({
        mutationFn: updateUserRole,
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.success);
                onClose();
            }

            if (data.error) {
                toast.error(data.error);
            }
        },
    });
};

interface DeleteUserMutationProps {
    onClose: () => void;
}

export const useDeleteUserMutation = ({
    onClose,
}: DeleteUserMutationProps) => {
    const mutation = useMutation({
        mutationFn: DELETE_USER_ACTION,
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.success);
                onClose();
            }
            if (data.error) {
                toast.error(data.error);
            }
        },
    });

    return mutation;
};