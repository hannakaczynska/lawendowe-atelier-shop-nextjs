"use client";
import { useEffect } from "react";
import { useCategoryStore } from "@/store/category";
import { expandCategoriesForTree } from "@/lib/utils/createCheckboxTreeNodes";
import type { CategoryNode } from "@/types/category";

export default function ShopCategoryInitializer({
  categoryTree,
  initialSlugs,
}: {
  categoryTree: CategoryNode[];
  initialSlugs: string[];
}) {
  const { setSelectedTreeCategories } = useCategoryStore();

  useEffect(() => {
    if (!categoryTree.length) return;
    const source = initialSlugs?.length ? initialSlugs : ["all"];
    const expanded = expandCategoriesForTree(source, categoryTree);
    setSelectedTreeCategories(expanded);
  }, [categoryTree, initialSlugs]);

  return null;
}
