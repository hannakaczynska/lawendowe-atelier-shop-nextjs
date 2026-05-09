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
    return [
      {
        value: "all",
        label: "Wszystkie",
        children: nodes,
      },
    ];
  }
  return nodes;
}


export function normalizeChecked(
  checked: string[],
  tree: CategoryNode[],
  firstLevelSlugs: string[]
): string[] {
  const result = new Set(checked);

  function traverse(node: CategoryNode) {
    if (!node.children.length) return;

    const childSlugs = node.children.map((c) => c.slug);

    const allChildrenChecked = childSlugs.every((slug) => result.has(slug));

    if (allChildrenChecked) {
      // delete children
      childSlugs.forEach((slug) => result.delete(slug));
      // add parent
      result.add(node.slug);
    }

    node.children.forEach(traverse);
  }

  tree.forEach(traverse);

  const normalized = Array.from(result);
  // If normalized matches firstLevelSlugs return ['all']
  const isAll =
    normalized.length === firstLevelSlugs.length &&
    normalized.every((slug) => firstLevelSlugs.includes(slug));
  return isAll ? ["all"] : normalized;
}
