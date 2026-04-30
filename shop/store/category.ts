import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CategoryStore } from "@/types/category";

export const useCategoryStore = create<CategoryStore>(
  persist(
    (set) => ({
      selectedCategories: [],

      setSelectedCategories: (cats: string[]) => set({ selectedCategories: cats }),
    }),
    { name: "selected-categories" } // localStorage key
));