import type { CategoryNode } from "@/types/category";

type CheckboxNode = {
  value: string;
  label: string;
};

export type CheckboxTreeNode = CheckboxNode & {
  children?: CheckboxTreeNode[];
};

export function convertToCheckboxTreeNodes(
  categories: CategoryNode[],
  withAllNode = false,
): CheckboxTreeNode[] {
  const nodes = categories.map((cat) => ({
    value: cat.slug,
    label: cat.name,
    children: convertToCheckboxTreeNodes(cat.children || []),
  }));
  if (withAllNode) {
    return [{ value: "all", label: "Wszystkie", children: nodes }];
  }
  return nodes;
}
