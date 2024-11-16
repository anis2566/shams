import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  CREATE_CATEGORY_ACTION,
  CREATE_SUB_CATEGORY_ACTION,
  DELETE_CATEGORY_ACTION,
  DELETE_SUB_CATEGORY_ACTION,
  EDIT_CATEGORY_ACTION,
  EDIT_SUB_CATEGORY_ACTION,
} from "../action";

export const useCreateCategoryMutation = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: CREATE_CATEGORY_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        router.push("/dashboard/categories");
      }
      if (data.error) {
        toast.error(data.error);
      }
    },
  });

  return mutation;
};

export const useEditCategoryMutation = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: EDIT_CATEGORY_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        router.push("/dashboard/categories");
      }
      if (data.error) {
        toast.error(data.error);
      }
    },
  });

  return mutation;
};

interface DeleteCategoryMutationProps {
  onClose: () => void;
}

export const useDeleteCategoryMutation = ({
  onClose,
}: DeleteCategoryMutationProps) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: DELETE_CATEGORY_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        onClose();
        router.push("/dashboard/categories");
      }
      if (data.error) {
        toast.error(data.error);
      }
    },
  });

  return mutation;
};

export const useCreateSubCategoryMutation = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: CREATE_SUB_CATEGORY_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        router.push(`/dashboard/categories/${data.categoryId}/sub`);
      }
      if (data.error) {
        toast.error(data.error);
      }
    },
  });

  return mutation;
};

export const useEditSubCategoryMutation = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: EDIT_SUB_CATEGORY_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        router.push(`/dashboard/categories/${data.categoryId}/sub`);
      }
      if (data.error) {
        toast.error(data.error);
      }
    },
  });

  return mutation;
};

interface DeleteSubCategoryMutationProps {
  onClose: () => void;
}

export const useDeleteSubCategoryMutation = ({
  onClose,
}: DeleteSubCategoryMutationProps) => {
  const mutation = useMutation({
    mutationFn: DELETE_SUB_CATEGORY_ACTION,
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

  return mutation;
};
