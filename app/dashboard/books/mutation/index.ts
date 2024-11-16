import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  CHANGE_BOOK_STATUS_ACTION,
  CREATE_BOOK_ACTION,
  DELETE_BOOK_ACTION,
  EDIT_BOOK_ACTION,
} from "../action";

export const useCreateBookMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: CREATE_BOOK_ACTION,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        router.push("/dashboard/books");
      }
    },
  });
};

export const useEditBookMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: EDIT_BOOK_ACTION,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        router.push("/dashboard/books");
      }
    },
  });
};

interface DeleteBookProps {
  onClose: () => void;
}

export const useDeleteBookMutation = ({ onClose }: DeleteBookProps) => {
  return useMutation({
    mutationFn: DELETE_BOOK_ACTION,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        onClose();
      }
    },
  });
};

interface ChangeBookStatusProps {
  onClose: () => void;
}

export const useChangeBookStatusMutation = ({
  onClose,
}: ChangeBookStatusProps) => {
  return useMutation({
    mutationFn: CHANGE_BOOK_STATUS_ACTION,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        onClose();
      }
    },
  });
};
