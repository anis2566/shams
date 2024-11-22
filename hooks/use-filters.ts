import { Category, Publication } from "@prisma/client";
import { create } from "zustand";

interface FilterState {
  categories: Category[] | null;
  publications: Publication[] | null;
  languages: string[] | [];
  setCategories: (categories: Category[]) => void;
  setPublications: (publications: Publication[]) => void;
  setLanguages: (languages: string[]) => void;
}

export const useFilters = create<FilterState>()((set) => ({
  categories: null,
  publications: null,
  languages: [],
  setCategories: (categories) => set({ categories }),
  setPublications: (publications) => set({ publications }),
  setLanguages: (languages) => set({ languages }),
}));
