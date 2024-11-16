"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useDeleteAuthorMutation } from "../mutation";
import { useAuthor } from "@/hooks/use-authro";
import { LoadingButton } from "@/components/loading-button";

export const DeleteAuthorModal = () => {
    const { id, open, onClose } = useAuthor();

    const { mutate, isPending } = useDeleteAuthorMutation({ onClose });


    const handleDelete = () => {
        mutate(id);
    };

    return (
        <AlertDialog open={open && !!id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete author
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
