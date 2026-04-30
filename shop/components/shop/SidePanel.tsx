"use client";
import type { CategoryNode } from "@/lib/wooCategoryMapper";
import { useCategoryStore } from "@/store/category";

export default function SidePanel({
  categoryTree,
}: {
  categoryTree: CategoryNode[];
}) {
  const { selectedCategories, setSelectedCategories } = useCategoryStore();

  console.log(selectedCategories);

  const renderCategories = (categories: CategoryNode[]) =>
    categories.map((cat) => (
      <div key={cat.id} style={{ marginLeft: cat.parent ? 30 : 0 }}>
        <label>
          <input
            type="checkbox"
            name="category"
            value={cat.slug}
            checked={selectedCategories.includes(cat.slug)}
            onChange={() => {
              setSelectedCategories(
                selectedCategories.includes(cat.slug)
                  ? selectedCategories.filter((s) => s !== cat.slug)
                  : [...selectedCategories, cat.slug],
              );
            }}
          />
          {cat.name}
        </label>
        {cat.children &&
          cat.children.length > 0 &&
          renderCategories(cat.children)}
      </div>
    ));

  return (
<form>
  <fieldset>
    <legend className="font-bold mb-2">Kategorie</legend>
    {renderCategories(categoryTree)}
  </fieldset>
</form>
  );
}
