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

import { useSellerDelete } from "@/hooks/use-seller";
import { useDeleteSellerMutation } from "../mutation";
import { LoadingButton } from "@/components/loading-button";

export const DeleteSellerModal = () => {
    const { id, onClose, open } = useSellerDelete()

    const { mutate, isPending } = useDeleteSellerMutation({ onClose });

    const handleDelete = () => {
        mutate(id);
    };

    return (
        <AlertDialog open={open && !!id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete seller
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
                        variant="destructive"
                    />
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
