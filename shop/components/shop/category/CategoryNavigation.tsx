"use client";
import Link from "next/link";
import { useEffect } from "react";
import type { CategoryNode } from "@/types/category";
import { findNodesBySlug } from "@/lib/utils/createCheckboxTreeNodes";

export default function CategoryNavigation({
  slugs,
  categoryTree,
}: {
  slugs: string[];
  categoryTree: CategoryNode[];
}) {
  const selectedNodes = slugs.length
    ? findNodesBySlug(slugs, categoryTree)
    : [];

  useEffect(() => {
    console.log("selectedNodes in CategoryNavigation:", selectedNodes);
  }, [selectedNodes]);

  return (
    <nav className="md:hidden w-full px-4 py-3">
      <ul className="flex flex-wrap gap-2 text-sm">
        <li>
          <Link href="/shop" className="font-bold text-md text-[var(--grey)]">
            Sklep:
          </Link>
        </li>
        {selectedNodes.length === 0 ? (
          <li className="text-[var(--grey)]">Wszystkie kategorie</li>
        ) : (
          selectedNodes.map((node, index) => (
            <li key={node.slug}>
              <Link href={`/shop/${node.slug}`} className="text-[var(--grey)]">
                {node.name}
                {index < selectedNodes.length - 1 ? "," : ""}
              </Link>
            </li>
          ))
        )}
      </ul>
    </nav>
  );
}
