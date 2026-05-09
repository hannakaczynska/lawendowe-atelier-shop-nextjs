"use client";
import styles from "./SidePanel.module.css";
import { useRouter } from "next/navigation";
import type { CategoryNode } from "@/types/category";
import type { CheckboxTreeNode } from "@/lib/utils/createCheckboxTreeNodes";
import { useCategoryStore } from "@/store/category";
import CheckboxTree from "react-checkbox-tree";
import { PiCheckCircleFill, PiMinusCircleFill, PiCircle } from "react-icons/pi";
import {
  convertToCheckboxTreeNodes,
  normalizeChecked,
} from "@/lib/utils/createCheckboxTreeNodes";

export default function SidePanel({
  categoryTree,
  firstLevelSlugs,
}: {
  categoryTree: CategoryNode[];
  firstLevelSlugs: string[];
}) {
  const { selectedTreeCategories, setSelectedTreeCategories } =
    useCategoryStore();
  const { setSelectedCategories } = useCategoryStore();
  const router = useRouter();

  // Get nodes with 'All' node at root
  const nodes = convertToCheckboxTreeNodes(categoryTree, true);

  // Custom onCheck handler for select-all logic
  function handleCheck(checked: string[]) {
    setSelectedTreeCategories(checked);
    const normalized = normalizeChecked(checked, categoryTree, firstLevelSlugs);

    if (normalized.includes("all")) {
      setSelectedCategories(normalized);
      router.push("/shop");
    } else if (normalized.length === 0) {
      setSelectedCategories(["all"]);
      router.push("/shop");
    } else if (normalized.length > 0) {
      setSelectedCategories(normalized);
      const newPath = `/shop/${normalized.join(",")}`;
      router.push(newPath);
    } else {
      setSelectedCategories(["all"]);
      router.push("/shop");
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
    <>
      <h3 className="font-bold">Kategorie</h3>
      <div className={styles.checkboxTree}>
        <CheckboxTree
          nodes={nodes}
          checked={selectedTreeCategories}
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
