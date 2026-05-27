import type { CategoryNode } from "@/types/category";

type ButtonNode = {
  value: string;
  label: string;
  parent: string | null;
};

export type ButtonTreeNode = ButtonNode & {
  children?: ButtonTreeNode[];
};

export function convertToButtonTreeNodes(
  categories: CategoryNode[],
  withAllNode = false,
  parentSlug: string = "all",
): ButtonTreeNode[] {
  const nodes = categories.map((cat) => ({
    value: cat.slug,
    label: cat.name,
    parent: parentSlug,
    children: convertToButtonTreeNodes(cat.children || [], false, cat.slug),
  }));
  if (withAllNode) {
    return [{ value: "all", label: "Wszystkie", parent: null, children: nodes }];
  }
  return nodes;
}

export function flattenForCategoryButtons(
  nodes: ButtonTreeNode[],
): ButtonTreeNode[] {
  return nodes.flatMap((node) => [
    node,
    ...flattenForCategoryButtons(node.children ?? []),
  ]);
}

export function getLeafSlugs(node: ButtonTreeNode): string[] {
  if (!node.children || node.children.length === 0) return [node.value];
  return node.children.flatMap(getLeafSlugs);
}
