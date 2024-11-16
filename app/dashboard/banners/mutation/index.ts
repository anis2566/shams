import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import {
  CREATE_BANNER_ACTION,
  DELETE_BANNER_ACTION,
  TOGGLE_BANNER_STATUS_ACTION,
} from "../action";

export const useCreateBannerMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: CREATE_BANNER_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        router.push("/dashboard/banners");
      }

      if (data.error) {
        toast.error(data.error);
      }
    },
  });
};

interface DeleteBannerMutationProps {
  onClose: () => void;
}

export const useDeleteBannerMutation = ({
  onClose,
}: DeleteBannerMutationProps) => {
  return useMutation({
    mutationFn: DELETE_BANNER_ACTION,
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

export const useToggleBannerStatusMutation = () => {
  return useMutation({
    mutationFn: TOGGLE_BANNER_STATUS_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
      }

      if (data.error) {
        toast.error(data.error);
      }
    },
  });
};
