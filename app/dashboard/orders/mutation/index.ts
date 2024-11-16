import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { DELETE_ORDER_ACTION, UPDATE_ORDER_STATUS_ACTION } from "../action";

interface UpdateOrderStatusMutationProps {
  onClose: () => void;
}

export const useUpdateOrderStatusMutation = ({
  onClose,
}: UpdateOrderStatusMutationProps) => {
  return useMutation({
    mutationFn: UPDATE_ORDER_STATUS_ACTION,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
      }
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

interface DeleteOrderMutationProps {
  onClose: () => void;
}

export const useDeleteOrderMutation = ({
  onClose,
}: DeleteOrderMutationProps) => {
  return useMutation({
    mutationFn: DELETE_ORDER_ACTION,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        onClose();
      }

      if (data?.error) {
        toast.error(data.error);
      }
    },
  });
};
