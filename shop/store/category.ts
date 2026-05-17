import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CategoryStore } from "@/types/category";

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set) => ({
      selectedTreeCategories: [],

      setSelectedTreeCategories: (cats: string[]) =>
        set({ selectedTreeCategories: cats })
    }),
    {
      name: "selected-categories"
    },
  ),
);
