import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CategoryStore } from "@/types/category";

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set) => ({
      selectedTreeCategories: [],
      selectedCategories: [],

      setSelectedTreeCategories: (cats: string[]) => set({ selectedTreeCategories: cats }),
      setSelectedCategories: (cats: string[]) => set({ selectedCategories: cats }),
    }),
    { name: "selected-categories" }
));