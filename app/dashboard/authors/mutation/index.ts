import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  CREATE_AUTHOR_ACTION,
  DELETE_AUTHOR_ACTION,
  EDIT_AUTHOR_ACTION,
} from "../action";

export const useCreateAuthorMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: CREATE_AUTHOR_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        router.push("/dashboard/authors");
      }

      if (data.error) {
        toast.error(data.error);
      }
    },
  });
};

export const useEditAuthorMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: EDIT_AUTHOR_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        router.push("/dashboard/authors");
      }

      if (data.error) {
        toast.error(data.error);
      }
    },
  });
};

type DeleteAuthorMutationProps = {
  onClose: () => void;
};

export const useDeleteAuthorMutation = ({
  onClose,
}: DeleteAuthorMutationProps) => {
  const router = useRouter();

  return useMutation({
    mutationFn: DELETE_AUTHOR_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        router.push("/dashboard/authors");
        onClose();
      }

      if (data.error) {
        toast.error(data.error);
      }
    },
  });
};
