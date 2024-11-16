import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  CREATE_AUTHOR_ACTION,
  CREATE_BOOK_ACTION,
  CREATE_CATEGORY_ACTION,
  CREATE_PUBLICATION_ACTION,
  CREATE_SUB_CATEGORY_ACTION,
  DELETE_BOOK_ACTION,
  EDIT_BOOK_ACTION,
} from "../action";
import { useRouter } from "next/navigation";

export const useCreateBookMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: CREATE_BOOK_ACTION,
    onSuccess: async (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        router.push("/seller/books");
      }
    },
  });
};

interface CreateAuthorMutation {
  onClose: () => void;
}

export const useCreateAuthorMutation = ({ onClose }: CreateAuthorMutation) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CREATE_AUTHOR_ACTION,
    onSuccess: async (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        onClose();
        await queryClient.invalidateQueries({
          queryKey: ["authors-for-books"],
        });
      }
    },
  });
};

interface CreateCategoryMutation {
  onClose: () => void;
}

export const useCreateCategoryMutation = ({
  onClose,
}: CreateCategoryMutation) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CREATE_CATEGORY_ACTION,
    onSuccess: async (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        onClose();
        await queryClient.invalidateQueries({
          queryKey: ["categories-for-books"],
        });
      }
    },
  });
};

interface CreateSubCategoryMutation {
  onClose: () => void;
}

export const useCreateSubCategoryMutation = ({
  onClose,
}: CreateSubCategoryMutation) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CREATE_SUB_CATEGORY_ACTION,
    onSuccess: async (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        onClose();
        await queryClient.invalidateQueries({
          queryKey: ["sub-categories-for-books"],
        });
      }
    },
  });
};

interface CreatePublicationMutation {
  onClose: () => void;
}

export const useCreatePublicationMutation = ({
  onClose,
}: CreatePublicationMutation) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CREATE_PUBLICATION_ACTION,
    onSuccess: async (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        onClose();
        await queryClient.invalidateQueries({
          queryKey: ["publishers-for-books"],
        });
      }
    },
  });
};

export const useEditBookMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: EDIT_BOOK_ACTION,
    onSuccess: async (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        router.push("/seller/books");
      }
    },
  });
};

interface DeleteBookMutation {
  onClose: () => void;
}

export const useDeleteBookMutation = ({ onClose }: DeleteBookMutation) => {
  return useMutation({
    mutationFn: DELETE_BOOK_ACTION,
    onSuccess: async (data) => {
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
