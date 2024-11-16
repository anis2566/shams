import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
  DELETE_SELLER_ACTION,
  DELETE_SELLER_REQUEST_ACTION,
  SELLER_REGISTER_ADMIN_ACTION,
  UPDATE_SELLER_STATUS_ACTION,
} from "../action";

type UpdateSellerStatusMutationProps = {
  onClose: () => void;
};

export const useUpdateSellerStatusMutation = ({
  onClose,
}: UpdateSellerStatusMutationProps) => {
  return useMutation({
    mutationFn: UPDATE_SELLER_STATUS_ACTION,
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

type DeleteSellerRequestMutationProps = {
  onClose: () => void;
};

export const useDeleteSellerRequestMutation = ({
  onClose,
}: DeleteSellerRequestMutationProps) => {
  return useMutation({
    mutationFn: DELETE_SELLER_REQUEST_ACTION,
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

export const useSellerRegisterAdminMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: SELLER_REGISTER_ADMIN_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        router.push("/dashboard/seller");
      }

      if (data.error) {
        toast.error(data.error);
      }
    },
  });
};

type DeleteSellerMutationProps = {
  onClose: () => void;
};

export const useDeleteSellerMutation = ({
  onClose,
}: DeleteSellerMutationProps) => {
  return useMutation({
    mutationFn: DELETE_SELLER_ACTION,
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
