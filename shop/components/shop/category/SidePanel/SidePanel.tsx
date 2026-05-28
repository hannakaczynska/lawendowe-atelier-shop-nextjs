"use client";
import styles from "./SidePanel.module.css";
import type { CheckboxTreeNode } from "@/lib/utils/category/checkboxTreeNodes";
import CheckboxTree from "react-checkbox-tree";
import { PiCheckCircleFill, PiMinusCircleFill, PiCircle } from "react-icons/pi";
import { convertToCheckboxTreeNodes } from "@/lib/utils/category/checkboxTreeNodes";
import { useShopCategory } from "@/context/ShopCategoryContext";
import { useCategoryFilter } from "@/hooks/useCategoryFilter";

export default function SidePanel() {
  const { categoryTree } = useShopCategory();
  const { checked, setChecked, hasChanges, handleApply } = useCategoryFilter();

  const nodes = convertToCheckboxTreeNodes(categoryTree, true);

  function handleCheck(newChecked: string[]) {
    setChecked(newChecked);
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
          className={`block mx-auto px-4 py-2 rounded-full border font-bold transition-colors duration-300 ${
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
