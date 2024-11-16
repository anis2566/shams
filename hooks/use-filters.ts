import { Category, Language, Publication } from "@prisma/client";
import { create } from "zustand";

interface FilterState {
  categories: Category[] | null;
  publications: Publication[] | null;
  languages: Language[] | null;
  setCategories: (categories: Category[]) => void;
  setPublications: (publications: Publication[]) => void;
  setLanguages: (languages: Language[]) => void;
}

export const useFilters = create<FilterState>()((set) => ({
  categories: null,
  publications: null,
  languages: null,
  setCategories: (categories) => set({ categories }),
  setPublications: (publications) => set({ publications }),
  setLanguages: (languages) => set({ languages }),
}));
