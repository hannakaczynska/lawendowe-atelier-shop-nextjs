'use client';
import type { CategoryNode } from "@/lib/wooCategoryMapper";
import { useCategoryStore } from "@/store/category";

export default function SidePanel({ categoryTree }: { categoryTree: CategoryNode[] }) {
  const { selectedCategories, setSelectedCategories } = useCategoryStore();

  const renderCategories = (categories: CategoryNode[]) =>
    categories.map((cat) => (
      <div key={cat.id} style={{ marginLeft: cat.parent ? 20 : 0 }}>
        <label>
          <input
            type="radio"
            name="category"
            value={cat.slug}
            checked={selectedCategories.includes(cat.slug)}
            onChange={() => setSelectedCategories([cat.slug])}
          />
          {cat.name}
        </label>
        {cat.children &&
          cat.children.length > 0 &&
          renderCategories(cat.children)}
      </div>
    ));

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Kategorie</h3>
      {renderCategories(categoryTree)}
    </div>
  );
}
