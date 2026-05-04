"use client";
import styles from "./SidePanel.module.css";
import type { CategoryNode } from "@/types/category";
import { useCategoryStore } from "@/store/category";
import CheckboxTree from "react-checkbox-tree";
import { PiCheckCircleFill, PiMinusCircleFill, PiCircle } from "react-icons/pi";
import { convertToCheckboxTreeNodes } from "@/lib/utils/createCheckboxTreeNodes";

export default function SidePanel({
  categoryTree,
}: {
  categoryTree: CategoryNode[];
}) {
  const { selectedCategories, setSelectedCategories } = useCategoryStore();
  console.log("Selected categories in SidePanel:", selectedCategories);
  // Get nodes with 'All' node at root
  const nodes = convertToCheckboxTreeNodes(categoryTree, true);

  // Helper to get all category values (excluding 'all')
  function getAllCategoryValues(nodes: any[]): string[] {
    return nodes.flatMap(node =>
      node.value === "all"
        ? node.children ? getAllCategoryValues(node.children) : []
        : [node.value, ...(node.children ? getAllCategoryValues(node.children) : [])]
    );
  }
  const allCategoryValues = getAllCategoryValues(nodes);

  // Custom onCheck handler for select-all logic
  function handleCheck(checked: string[]) {
    if (checked.includes("all")) {
      setSelectedCategories(["all", ...allCategoryValues]);
    } else {
      setSelectedCategories(checked.filter(v => v !== "all"));
    }
  }

  // Expand all nodes by default
  function getAllValuesForExpand(nodes: any[]): string[] {
    return nodes.flatMap(node => [node.value, ...(node.children ? getAllValuesForExpand(node.children) : [])]);
  }
  const expanded = getAllValuesForExpand(nodes);

  return (
    <>
      <h3 className="font-bold">Kategorie</h3>
      <div className={styles.checkboxTree}>
        <CheckboxTree
          nodes={nodes}
          checked={selectedCategories}
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
    </>
  );
}
