"use client";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useSeller } from "@/hooks/use-seller";
import { useDeleteSellerRequestMutation } from "../../mutation";
import { LoadingButton } from "@/components/loading-button";

export const DeleteSellerRequestModal = () => {
    const { id, onClose, open } = useSeller()

    const { mutate, isPending } = useDeleteSellerRequestMutation({ onClose });

    const handleDelete = () => {
        mutate(id);
    };

    return (
        <AlertDialog open={open && !!id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete seller request
                        and remove the data from your servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose} disabled={isPending}>
                        Cancel
                    </AlertDialogCancel>
                    <LoadingButton
                        onClick={handleDelete}
                        isLoading={isPending}
                        title="Continue"
                        loadingTitle="Deleting..."
                        type="submit"
                    />
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
