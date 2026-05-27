"use client";
import { useState } from "react";
import MobileCategoryChoice from "./MobileCategoryChoice";
import { CategoryNode } from "@/types/category";
import { useDisableScroll } from "@/hooks/useDisableScroll";

export default function MobilePanel({
  categoryTree,
  firstLevelSlugs,
}: {
  categoryTree: CategoryNode[];
    firstLevelSlugs: string[];
}) {
  const [isCategoryChoiceOpen, setIsCategoryChoiceOpen] = useState(false);

  useDisableScroll(isCategoryChoiceOpen);

  return (
    <>
      <div className="flex md:hidden items-center justify-end gap-6 px-4 py-2">
        <button
          type="button"
          className="text-sm font-bold cursor-pointer py-2 px-4 rounded-4xl border border-[var(--primary-color)]"
          onClick={() => setIsCategoryChoiceOpen(!isCategoryChoiceOpen)}
        >
          Kategorie
        </button>
        <button
          type="button"
          className="text-sm font-bold cursor-pointer py-2 px-4 rounded-4xl border border-[var(--grey)]"
        >
          Sortuj
        </button>
      </div>
      {isCategoryChoiceOpen && (
        <MobileCategoryChoice
          categoryTree={categoryTree}
          closeCategoryChoice={() => setIsCategoryChoiceOpen(false)}
          firstLevelSlugs={firstLevelSlugs}
        />
      )}
    </>
  );
}
