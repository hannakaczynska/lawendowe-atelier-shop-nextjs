import Link from "next/link";

export default function CategoryNavigation({
}) {
  return (
    <div className="block md:hidden w-full h-full">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <nav>
        <ul className="flex gap-4 px-4 py-2 text-sm text-[var(--grey)]">
          <li>
            <Link href="/shop">Sklep</Link>
            <Link href="/shop">Wszystkie Produkty</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}