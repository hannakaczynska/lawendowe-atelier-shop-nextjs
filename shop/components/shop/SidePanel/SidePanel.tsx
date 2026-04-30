"use client";
import styles from "./SidePanel.module.css";
import type { CategoryNode } from "@/types/category";
import { useCategoryStore } from "@/store/category";
import CheckboxTree from "react-checkbox-tree";
import { convertToCheckboxTreeNodes } from "@/lib/utils/createCheckboxTreeNodes";

export default function SidePanel({
  categoryTree,
}: {
  categoryTree: CategoryNode[];
}) {
  const { selectedCategories, setSelectedCategories } = useCategoryStore();
  console.log("Selected categories in SidePanel:", selectedCategories);
  const nodes = convertToCheckboxTreeNodes(categoryTree);

  return (
    <>
      <h3 className="font-bold">Kategorie</h3>
      <div className={styles.checkboxTree}>
        <CheckboxTree
          nodes={nodes}
          checked={selectedCategories}
          expanded={nodes.map((node) => node.value)}
          onCheck={setSelectedCategories}
          onExpand={() => {}}
        />
      </div>
    </>
  );
}
