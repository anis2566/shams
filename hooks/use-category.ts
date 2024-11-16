import { create } from "zustand";

interface CategoryState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useCategory = create<CategoryState>()((set) => ({
  open: false,
  id: "",
  onOpen: (id) => set({ open: true, id }),
  onClose: () => set({ open: false, id: "" }),
}));

interface NewCategoryState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useNewCategory = create<NewCategoryState>()((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));
