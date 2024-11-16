import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DELETE_REVIEW_ACTION } from "../action";

interface DeleteReviewMutationProps {
  onClose: () => void;
}

export const useDeleteReviewMutation = ({
  onClose,
}: DeleteReviewMutationProps) => {
  const router = useRouter();

  return useMutation({
    mutationFn: DELETE_REVIEW_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        router.push("/dashboard/reviews");
        onClose();
      }

      if (data.error) {
        toast.error(data.error);
      }
    },
  });
};
