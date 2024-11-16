import { create } from "zustand";

interface ReviewState {
    open: boolean;
    id: string;
    onOpen: (id: string) => void;
    onClose: () => void;
}

export const useReview = create<ReviewState>()((set) => ({
    open: false,
    id: "",
    onOpen: (id) => set({ open: true, id }),
    onClose: () => set({ open: false, id: "" }),
}));


interface CreateReviewState {
    id: string;
    open: boolean;
    onOpen: (id: string) => void;
    onClose: () => void;
}

export const useCreateReview = create<CreateReviewState>()((set) => ({
    id: "",
    open: false,
    onOpen: (id) => set({ open: true, id }),
    onClose: () => set({ open: false, id: "" }),
}));


interface DeleteReviewState {
    id: string;
    open: boolean;
    onOpen: (id: string) => void;
    onClose: () => void;
}

export const useDeleteReview = create<DeleteReviewState>()((set) => ({
    id: "",
    open: false,
    onOpen: (id) => set({ open: true, id }),
    onClose: () => set({ open: false, id: "" }),
}));

