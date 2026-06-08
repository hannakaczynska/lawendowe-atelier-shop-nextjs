"use client";
import Link from "next/link";
import { findNodesBySlug } from "@/lib/utils/category/categoryHelpers";
import { useShopCategory } from "@/context/ShopCategoryContext";

export default function CategoryNavigation({
  slugs,
  productCard = false,
  productName,
  categories,
}: {
  slugs: string[];
  productCard?: boolean;
  productName?: string;
  categories?: { name: string; slug: string }[];
}) {
  const { categoryTree } = useShopCategory();
  const selectedNodes = slugs.length
    ? findNodesBySlug(slugs, categoryTree)
    : [];

  if (productCard) {
    return (
      <nav className="w-full px-4 py-3">
        <ul className="flex flex-wrap gap-2 text-sm text-[var(--grey)]">
          <li>
            <Link href="/shop">
              Sklep
            </Link>
          </li>
          {(categories ?? selectedNodes).map((node) => (
            <li
              key={node.slug}
              className="before:content-['>'] before:mr-2"
            >
              <Link href={`/shop/${node.slug}`}>{node.name}</Link>
            </li>
          ))}
          {productName && (
            <li className="before:content-['>'] before:mr-2">
              <span className="font-bold">{productName}</span>
            </li>
          )}
        </ul>
      </nav>
    );
  }

  return (
    <nav className="md:hidden w-full px-4 py-3">
      <ul className="flex flex-wrap gap-2 text-sm">
        <li>
          <Link href="/shop" className="font-bold text-md text-[var(--grey)]">
            Sklep :
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

