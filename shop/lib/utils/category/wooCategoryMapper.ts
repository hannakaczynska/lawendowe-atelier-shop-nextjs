import type { CategoryNode } from "@/types/category";
import { getCategories } from "@/lib/woo/getCategories";
let categoryMap: Record<string, number> | null = null;
let categoryTree: CategoryNode[]= [];
let firstLevelSlugs: string[] = [];

export async function getCategoryMap(): Promise<{
  categoryMap: Record<string, number>;
  categoryTree: CategoryNode[];
  firstLevelSlugs: string[];
}> {
  // Return cached map if available
if (categoryMap && categoryTree.length > 0 && firstLevelSlugs.length > 0) {
    return { categoryMap, categoryTree, firstLevelSlugs };
  }

  const categories = await getCategories();

  if (categories.length === 0) {
    console.warn("No categories found, using fallback...");

    categoryMap = {};
    categoryTree = [];
    firstLevelSlugs = [];

    return { categoryMap, categoryTree, firstLevelSlugs };
  }

  const filteredCategories = categories.filter(
    (cat: CategoryNode) => cat.slug !== "bez-kategorii",
  );

  categoryMap = {};
  const map: Record<number, CategoryNode> = {};
  categoryTree = [];

  // Build the map and tree structure
  filteredCategories.forEach((cat: CategoryNode) => {
    categoryMap![cat.slug] = cat.id;
    map[cat.id] = {
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      parent: cat.parent,
      children: [],
    };
  });

  filteredCategories.forEach((cat: CategoryNode) => {
    if (cat.parent && map[cat.parent]) {
      map[cat.parent].children.push(map[cat.id]);
    } else {
      categoryTree!.push(map[cat.id]);
    }
  });

  // Get slugs for first-level categories (parents with or without children)
  firstLevelSlugs = categoryTree!.map((cat) => cat.slug);

  return { categoryMap, categoryTree, firstLevelSlugs };
}
