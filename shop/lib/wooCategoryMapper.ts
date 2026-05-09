const BASE_URL = "http://lawendowe-atelier-backend.local/wp-json/wc/store";

import type { CategoryNode } from "@/types/category";

let categoryMap: Record<string, number> | null = null;
let categoryTree: CategoryNode[] | null = null;
let firstLevelSlugs: string[] | null = null;

export async function getCategoryMap(): Promise<{ categoryMap: Record<string, number>; categoryTree: CategoryNode[]; firstLevelSlugs: string[] }> {
  // Return cached map if available
  if (categoryMap && categoryTree && firstLevelSlugs) {
    return { categoryMap, categoryTree, firstLevelSlugs };

  }

  // Fetch categories from WooCommerce API
  const res = await fetch(`${BASE_URL}/products/categories?per_page=100`);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories = await res.json();

  categoryMap = {};
  const map: Record<number, CategoryNode> = {};
  categoryTree = [];

  // Build the map and tree structure
  categories.forEach((cat: any) => {
    categoryMap![cat.slug] = cat.id;
    map[cat.id] = { id: cat.id, slug: cat.slug, name: cat.name, parent: cat.parent, children: [] };
  });

  categories.forEach((cat: any) => {
    if (cat.parent && map[cat.parent]) {
      map[cat.parent].children.push(map[cat.id]);
    } else {
      categoryTree!.push(map[cat.id]);
    }
  });

  // Get slugs for first-level categories (parents with or without children)
  firstLevelSlugs = categoryTree!.map(cat => cat.slug);

  return {categoryMap, categoryTree, firstLevelSlugs};
}
