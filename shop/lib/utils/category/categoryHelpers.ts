import type { CategoryNode } from "@/types/category";

export function normalizeChecked(
  checked: string[],
  tree: CategoryNode[],
  firstLevelSlugs: string[],
): string[] {
  const result = new Set(checked);

  function traverse(node: CategoryNode) {
    if (!node.children.length) return;

    const childSlugs = node.children.map((c) => c.slug);
    const allChildrenChecked = childSlugs.every((slug) => result.has(slug));

    if (allChildrenChecked) {
      childSlugs.forEach((slug) => result.delete(slug));
      result.add(node.slug);
    }

    node.children.forEach(traverse);
  }

  tree.forEach(traverse);

  const normalized = Array.from(result);
  const isAll =
    normalized.length === firstLevelSlugs.length &&
    normalized.every((slug) => firstLevelSlugs.includes(slug));
  return isAll ? ["all"] : normalized;
}

export function expandCategoriesForTree(
  selected: string[],
  tree: CategoryNode[],
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
    if (selected.includes(node.slug)) {
      collectLeafSlugs(node);
      return;
    }
    node.children.forEach(traverse);
  }

  if (selected.includes("all")) {
    tree.forEach(collectLeafSlugs);
    return Array.from(result);
  }

  tree.forEach(traverse);
  return Array.from(result);
}

export function slugsFromPathname(pathname: string): string[] {
  return pathname.startsWith("/shop/")
    ? pathname.replace("/shop/", "").split(",")
    : ["all"];
}

export function findNodesBySlug(
  slugs: string[],
  tree: CategoryNode[],
): CategoryNode[] {
  function findOne(
    slug: string,
    nodes: CategoryNode[],
  ): CategoryNode | undefined {
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
