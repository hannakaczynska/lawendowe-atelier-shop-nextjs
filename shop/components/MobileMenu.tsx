import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu({ closeMenu }: { closeMenu: () => void }) {
  const pathname = usePathname();
  return (
    <div className="w-full p-6 bg-white rounded-bl-2xl">
      <nav className="flex flex-col gap-4">
        <Link
          onClick={closeMenu}
          className={`text-xl ${pathname === "/" ? "font-bold" : ""}`}
          href="/"
        >
          Strona główna
        </Link>
        <Link
          onClick={closeMenu}
          className={`text-xl ${pathname === "/about" ? "font-bold" : ""}`}
          href="/about"
        >
          O nas
        </Link>
        <Link
          onClick={closeMenu}
          className={`text-xl ${pathname.startsWith("/shop") ? "font-bold" : ""}`}
          href="/shop"
        >
          Sklep
        </Link>
        <Link
          onClick={closeMenu}
          className={`text-xl ${pathname === "/contact" ? "font-bold" : ""}`}
          href="/contact"
        >
          Kontakt
        </Link>
        <div className="border-t border-[var(--light-grey)] mb-4"></div>
        <Link href="/" onClick={closeMenu}>
          {" "}
          <img className="h-[32px]" src="/user.svg" alt="User" />
        </Link>
      </nav>
    </div>
  );
}
