import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { DELETE_SUBSCRIBER_ACTION } from "../action";

interface DeleteSubscriberMutationProps {
  onClose: () => void;
}

export const useDeleteSubscriberMutation = ({
  onClose,
}: DeleteSubscriberMutationProps) => {
  return useMutation({
    mutationFn: DELETE_SUBSCRIBER_ACTION,
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
