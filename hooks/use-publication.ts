import { create } from "zustand";

interface NewPublicationState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useNewPublication = create<NewPublicationState>()((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));

interface PublicationState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const usePublication = create<PublicationState>()((set) => ({
  open: false,
  id: "",
  onOpen: (id: string) => set({ open: true, id }),
  onClose: () => set({ open: false, id: "" }),
}));
