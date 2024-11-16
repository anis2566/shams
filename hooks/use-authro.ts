import { create } from "zustand";

interface AuthorState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useAuthor = create<AuthorState>()((set) => ({
  open: false,
  id: "",
  onOpen: (id) => set({ open: true, id }),
  onClose: () => set({ open: false, id: "" }),
}));

interface NewAuthorState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useNewAuthor = create<NewAuthorState>()((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));
