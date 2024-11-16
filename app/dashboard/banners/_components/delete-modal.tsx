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

import { useBanner } from "@/hooks/use-banner";
import { useDeleteBannerMutation } from "../mutation";
import { LoadingButton } from "@/components/loading-button";


export const DeleteBannerModal = () => {
    const { open, id, onClose } = useBanner();

    const { mutate, isPending } = useDeleteBannerMutation({ onClose });

    const handleDelete = () => {
        if (id) {
            mutate(id);
        }
    };

    return (
        <AlertDialog open={open && !!id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete banner
                        and remove the data from your servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose} disabled={isPending}>
                        Cancel
                    </AlertDialogCancel>
                    <LoadingButton
                        isLoading={isPending}
                        onClick={handleDelete}
                        variant="destructive"
                        title="Continue"
                        loadingTitle="Deleting..."
                        type="submit"
                    />
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
