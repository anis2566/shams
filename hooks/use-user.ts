import { Role } from "@prisma/client";
import { create } from "zustand";

interface UserState {
    open: boolean;
    id: string;
    onOpen: (id: string) => void;
    onClose: () => void;
}

export const useUser = create<UserState>()((set) => ({
    open: false,
    id: "",
    onOpen: (id) => set({ open: true, id }),
    onClose: () => set({ open: false, id: "" }),
}));

interface UserRoleState {
    open: boolean;
    role: Role;
    id: string;
    onOpen: (id: string, role: Role) => void;
    onClose: () => void;
}

export const useUserRole = create<UserRoleState>()((set) => ({
    open: false,
    id: "",
    role: Role.User,
    onOpen: (id, role) => set({ open: true, id, role }),
    onClose: () => set({ open: false, id: "", role: Role.User }),
}));


interface ForgotPasswordState {
    open: boolean;
    id: string;
    onOpen: (id: string) => void;
    onClose: () => void;
}

export const useForgotPassword = create<ForgotPasswordState>()((set) => ({
    open: false,
    id: "",
    onOpen: (id) => set({ open: true, id }),
    onClose: () => set({ open: false, id: "" }),
}));
