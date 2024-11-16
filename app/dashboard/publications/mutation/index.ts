import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
  CREATE_PUBLICATION_ACTION,
  DELETE_PUBLICATION_ACTION,
  EDIT_PUBLICATION_ACTION,
} from "../action";

export const useCreatePublicationMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: CREATE_PUBLICATION_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        router.push("/dashboard/publications");
      }

      if (data.error) {
        toast.error(data.error);
      }
    },
  });
};

export const useEditPublicationMutation = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: EDIT_PUBLICATION_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        router.push("/dashboard/publications");
      }
      if (data.error) {
        toast.error(data.error);
      }
    },
  });

  return mutation;
};

interface DeletePublicationMutationProps {
  onClose: () => void;
}

export const useDeletePublicationMutation = ({
  onClose,
}: DeletePublicationMutationProps) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: DELETE_PUBLICATION_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        onClose();
        router.push("/dashboard/publications");
      }
      if (data.error) {
        toast.error(data.error);
      }
    },
  });

  return mutation;
};
