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


export function expandCategoriesForTree(
  selected: string[],
  tree: CategoryNode[]
): string[] {
  const result = new Set<string>();

  function collectLeafSlugs(node: CategoryNode) {
    if (!node.children.length) {
      result.add(node.slug);
      return;
    }

    node.children.forEach(collectLeafSlugs);
  }

  function traverse(node: CategoryNode) {
    // if selected contains this parent
    if (selected.includes(node.slug)) {
      collectLeafSlugs(node);
      return;
    }

    node.children.forEach(traverse);
  }

  // special case for all
  if (selected.includes("all")) {
    tree.forEach(collectLeafSlugs);
    return Array.from(result);
  }

  tree.forEach(traverse);

  return Array.from(result);
}

export function findNodesBySlug(slugs: string[], tree: CategoryNode[]): CategoryNode[] {
  function findOne(slug: string, nodes: CategoryNode[]): CategoryNode | undefined {
    for (const node of nodes) {
      if (node.slug === slug) return node;
      const found = findOne(slug, node.children);
      if (found) return found;
    }
  }

  return slugs
    .map((slug) => findOne(slug, tree))
    .filter((node): node is CategoryNode => node !== undefined);
}