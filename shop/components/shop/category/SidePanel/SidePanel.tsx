"use client";
import styles from "./SidePanel.module.css";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { CategoryNode } from "@/types/category";
import type { CheckboxTreeNode } from "@/lib/utils/createCheckboxTreeNodes";
import CheckboxTree from "react-checkbox-tree";
import { PiCheckCircleFill, PiMinusCircleFill, PiCircle } from "react-icons/pi";
import {
  convertToCheckboxTreeNodes,
  normalizeChecked,
  expandCategoriesForTree,
  slugsFromPathname,
} from "@/lib/utils/createCheckboxTreeNodes";

export default function SidePanel({
  categoryTree,
  firstLevelSlugs,
}: {
  categoryTree: CategoryNode[];
  firstLevelSlugs: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [checked, setChecked] = useState(() =>
    expandCategoriesForTree(slugsFromPathname(pathname), categoryTree)
  );

  useEffect(() => {
    setChecked(expandCategoriesForTree(slugsFromPathname(pathname), categoryTree));
  }, [pathname, categoryTree]);

  // Get nodes with 'All' node at root
  const nodes = convertToCheckboxTreeNodes(categoryTree, true);

  function handleCheck(newChecked: string[]) {
    setChecked(newChecked);
    const normalized = normalizeChecked(newChecked, categoryTree, firstLevelSlugs);

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
    <>
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
    </>
  );
}
