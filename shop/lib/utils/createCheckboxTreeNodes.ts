
import type { CategoryNode } from "@/types/category";   

type CheckboxNode = {
  value: string;
  label: string;
};

type CheckboxTreeNode = CheckboxNode & {
  children?: CheckboxTreeNode[];
};

export function convertToCheckboxTreeNodes(categories: CategoryNode[]): CheckboxTreeNode[] {
  return categories.map(cat => ({
    value: cat.slug,
    label: cat.name,
    children: convertToCheckboxTreeNodes(cat.children || [])
  }));
}