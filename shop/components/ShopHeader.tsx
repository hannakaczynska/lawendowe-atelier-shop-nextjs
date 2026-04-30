"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ShopHeader() {
  const pathname = usePathname();

  return (
    <header className=" w-screen flex flex-col">
      <div className="w-full text-sm py-2 text-center bg-[var(--third-color)]">
        Zamówienia tylko z odbiorem osobistym
      </div>
      <div className="w-full max-w-[1500px] mx-auto px-4 flex  items-center justify-between">
        <img className="w-[100px] h-auto" src="/logo.svg" alt="Logo" />
        <nav className="hidden lg:flex gap-6">
          <Link
            className={`text-xl ${pathname === "/" ? "font-bold" : ""} hover:text-[var(--grey)]`}
            href="/"
          >
            Strona główna
          </Link>
          <Link
            className={`text-xl ${pathname === "/about" ? "font-bold" : ""} hover:text-[var(--grey)]`}
            href="/about"
          >
            O nas
          </Link>
          <Link
            className={`text-xl ${pathname === "/shop" ? "font-bold" : ""} hover:text-[var(--grey)]`}
            href="/shop"
          >
            Sklep
          </Link>
          <Link
            className={`text-xl ${pathname === "/contact" ? "font-bold" : ""} hover:text-[var(--grey)]`}
            href="/contact"
          >
            Kontakt
          </Link>
        </nav>
        <div className="flex gap-4">
          <nav className="flex gap-4 ml-[20px]">
            <Link href="/">
              <img
                className="h-[32px] hidden lg:block"
                src="/user.svg"
                alt="User"
              />
            </Link>
            <Link href="/shop/cart">
              <img className="h-[32px]" src="/grey-cart.svg" alt="Cart" />
            </Link>
          </nav>
          <button className="lg:hidden h-[32px] pt-[1px]">
            <img
              className="h-full text-[var(--third-color)] fill-gray-500"
              src="/menu.svg"
              alt="Menu"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
