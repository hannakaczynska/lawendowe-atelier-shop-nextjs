"use client";
import { createContext, useContext } from "react";
import type { CategoryNode } from "@/types/category";

type ShopCategoryContextValue = {
  categoryTree: CategoryNode[];
  firstLevelSlugs: string[];
};

const ShopCategoryContext = createContext<ShopCategoryContextValue | null>(null);

export function ShopCategoryProvider({
  categoryTree,
  firstLevelSlugs,
  children,
}: ShopCategoryContextValue & { children: React.ReactNode }) {
  return (
    <ShopCategoryContext.Provider value={{ categoryTree, firstLevelSlugs }}>
      {children}
    </ShopCategoryContext.Provider>
  );
}

export function useShopCategory(): ShopCategoryContextValue {
  const context = useContext(ShopCategoryContext);
  if (!context) {
   console.error("useShopCategory must be used within ShopCategoryProvider");
   return { categoryTree: [], firstLevelSlugs: [] };
  }
  return context;
}
