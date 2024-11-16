import { Answer, Book } from "@prisma/client";
import { Question } from "@prisma/client";
import { create } from "zustand";

interface QuestionState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useQuestion = create<QuestionState>()((set) => ({
  open: false,
  id: "",
  onOpen: (id) => set({ open: true, id }),
  onClose: () => set({ open: false, id: "" }),
}));

interface QuestionWithRelations extends Question {
  answers: Answer[];
  book: Book;
}

interface QuestionViewState {
  open: boolean;
  question: QuestionWithRelations | null;
  onOpen: (question: QuestionWithRelations) => void;
  onClose: () => void;
}

export const useQuestionView = create<QuestionViewState>()((set) => ({
  open: false,
  question: null,
  onOpen: (question) => set({ open: true, question }),
  onClose: () => set({ open: false, question: null }),
}));

interface QuestionReplyState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useQuestionReply = create<QuestionReplyState>()((set) => ({
  open: false,
  id: "",
  onOpen: (id) => set({ open: true, id }),
  onClose: () => set({ open: false, id: "" }),
}));

interface QuestionDeleteState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useQuestionDelete = create<QuestionDeleteState>()((set) => ({
  open: false,
  id: "",
  onOpen: (id) => set({ open: true, id }),
  onClose: () => set({ open: false, id: "" }),
}));
