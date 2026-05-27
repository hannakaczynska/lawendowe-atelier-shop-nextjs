"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useShopCategory } from "@/context/ShopCategoryContext";
import {
  expandCategoriesForTree,
  normalizeChecked,
  slugsFromPathname,
} from "@/lib/utils/createCheckboxTreeNodes";

export function useCategoryFilter(onApply?: () => void) {
  const { categoryTree, firstLevelSlugs } = useShopCategory();
  const router = useRouter();
  const pathname = usePathname();

  const [checked, setChecked] = useState(() =>
    expandCategoriesForTree(slugsFromPathname(pathname), categoryTree),
  );

  useEffect(() => {
    setChecked(
      expandCategoriesForTree(slugsFromPathname(pathname), categoryTree),
    );
  }, [pathname, categoryTree]);

  const appliedChecked = expandCategoriesForTree(
    slugsFromPathname(pathname),
    categoryTree,
  );

  const hasChanges =
    checked.length > 0 &&
    (checked.length !== appliedChecked.length ||
      checked.some((v) => !appliedChecked.includes(v)));

  function handleApply() {
    const normalized = normalizeChecked(checked, categoryTree, firstLevelSlugs);
    if (normalized.includes("all") || normalized.length === 0) {
      router.push("/shop");
    } else {
      router.push(`/shop/${normalized.join(",")}`);
    }
    onApply?.();
  }

  return { checked, setChecked, hasChanges, handleApply };
}
