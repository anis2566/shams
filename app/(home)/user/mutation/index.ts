import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  CREATE_REVIEW_ACTION,
  UPDATE_USER_ACCOUNT_ACTION,
  UPDATE_USER_AVATAR_ACTION,
  UPDATE_USER_INFO_ACTION,
  UPDATE_USER_PASSWORD_ACTION,
} from "../action";

interface UpdateUserInfoMutationProps {
  toggleEditing: () => void;
}

export const useUpdateUserInfoMutation = ({
  toggleEditing,
}: UpdateUserInfoMutationProps) => {
  return useMutation({
    mutationFn: UPDATE_USER_INFO_ACTION,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        toggleEditing();
      }
    },
  });
};

interface UpdateUserAccountMutationProps {
  toggleEditing: () => void;
}

export const useUpdateUserAccountMutation = ({
  toggleEditing,
}: UpdateUserAccountMutationProps) => {
  return useMutation({
    mutationFn: UPDATE_USER_ACCOUNT_ACTION,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        toggleEditing();
      }
    },
  });
};

interface UpdateUserAvatarMutationProps {
  toggleEditing: () => void;
}

export const useUpdateUserAvatarMutation = ({
  toggleEditing,
}: UpdateUserAvatarMutationProps) => {
  return useMutation({
    mutationFn: UPDATE_USER_AVATAR_ACTION,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        toggleEditing();
      }
    },
  });
};

interface UpdateUserPasswordMutationProps {
  toggleEditing: () => void;
}

export const useUpdateUserPasswordMutation = ({
  toggleEditing,
}: UpdateUserPasswordMutationProps) => {
  return useMutation({
    mutationFn: UPDATE_USER_PASSWORD_ACTION,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        toggleEditing();
      }
    },
  });
};

interface CreateReviewMutationProps {
  onClose: () => void;
}

export const useCreateReviewMutation = ({
  onClose,
}: CreateReviewMutationProps) => {
  return useMutation({
    mutationFn: CREATE_REVIEW_ACTION,
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
