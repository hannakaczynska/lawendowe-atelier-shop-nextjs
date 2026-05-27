"use client";
import styles from "./SidePanel.module.css";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { CheckboxTreeNode } from "@/lib/utils/createCheckboxTreeNodes";
import CheckboxTree from "react-checkbox-tree";
import { PiCheckCircleFill, PiMinusCircleFill, PiCircle } from "react-icons/pi";
import {
  convertToCheckboxTreeNodes,
  normalizeChecked,
  expandCategoriesForTree,
  slugsFromPathname,
} from "@/lib/utils/createCheckboxTreeNodes";
import { useShopCategory } from "@/context/ShopCategoryContext";

export default function SidePanel() {
  const { categoryTree, firstLevelSlugs } = useShopCategory();
  const router = useRouter();
  const pathname = usePathname();

  const [checked, setChecked] = useState(() =>
    expandCategoriesForTree(slugsFromPathname(pathname), categoryTree),
  );

  // Update checked state when URL or category tree changes
  useEffect(() => {
    setChecked(
      expandCategoriesForTree(slugsFromPathname(pathname), categoryTree),
    );
  }, [pathname, categoryTree]);

  // Get nodes with 'All' node at root
  const nodes = convertToCheckboxTreeNodes(categoryTree, true);

  // Get currently applied checked values from URL
  const appliedChecked = expandCategoriesForTree(
    slugsFromPathname(pathname),
    categoryTree,
  );

  // Determine if there are changes compared to URL state
  const hasChanges =
    checked.length > 0 &&
    (checked.length !== appliedChecked.length ||
      checked.some((v) => !appliedChecked.includes(v)));

  //Change state when checkbox is checked/unchecked
  function handleCheck(newChecked: string[]) {
    setChecked(newChecked);
  }

  // Apply changes and navigate to new URL
  function handleApply() {
    const normalized = normalizeChecked(checked, categoryTree, firstLevelSlugs);
    if (normalized.includes("all") || normalized.length === 0) {
      router.push("/shop");
    } else {
      router.push(`/shop/${normalized.join(",")}`);
    }
  }

  // Expand all nodes by default
  function getAllValuesForExpand(nodes: CheckboxTreeNode[]): string[] {
    return nodes.flatMap((node) => [
      node.value,
      ...(node.children ? getAllValuesForExpand(node.children) : []),
    ]);
  }
  const expanded = getAllValuesForExpand(nodes);

  return (
    <div className="sticky top-[150px]">
      <h3 className="font-bold">Kategorie</h3>
      <div className={styles.checkboxTree}>
        <CheckboxTree
          nodes={nodes}
          checked={checked}
          expanded={expanded}
          onCheck={handleCheck}
          onExpand={() => {}}
          icons={{
            check: <PiCheckCircleFill color="var(--third-color)" />,
            uncheck: <PiCircle color="var(--third-color)" />,
            halfCheck: <PiMinusCircleFill color="var(--third-color)" />,
            expandClose: <></>,
            expandOpen: <></>,
            expandAll: <></>,
            collapseAll: <></>,
            parentClose: <></>,
            parentOpen: <></>,
            leaf: <></>,
          }}
        />
      </div>
      <div className="mt-10 w-full">
        <button
          type="button"
          onClick={handleApply}
          disabled={!hasChanges}
          className={`block mx-auto px-4 py-2 rounded-full border font-bold transition-colors ${
            hasChanges
              ? "bg-[var(--third-color)] border-[var(--third-color)] text-white cursor-pointer"
              : "bg-white border-[var(--grey)] text-[var(--grey)] opacity-40 cursor-not-allowed"
          }`}
        >
          Zastosuj
        </button>
      </div>
    </div>
  );
}
