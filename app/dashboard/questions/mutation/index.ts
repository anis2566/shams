import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { DELETE_QUESTION_ACTION, REPLY_QUESTION_ACTION } from "../action";

interface ReplyQuestionMutationProps {
  onClose: () => void;
}

export const useReplyQuestionMutation = ({
  onClose,
}: ReplyQuestionMutationProps) => {
  return useMutation({
    mutationFn: REPLY_QUESTION_ACTION,
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

interface DeleteQuestionMutationProps {
  onClose: () => void;
}

export const useDeleteQuestionMutation = ({
  onClose,
}: DeleteQuestionMutationProps) => {
  return useMutation({
    mutationFn: DELETE_QUESTION_ACTION,
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
