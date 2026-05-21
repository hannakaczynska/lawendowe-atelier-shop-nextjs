"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ShopMobileMenu from "@/components/MobileMenu";

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleResize() {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="md:fixed w-screen flex flex-col z-60 relative border-b border-[var(--light-grey)] md:border-b-0" onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}>
  <div className="bg-white w-full">
        <div className="relative max-w-[500px] w-full md:max-w-[1500px] mx-auto px-4 flex items-center justify-between">
          <img className="w-[100px] h-auto" src="/logo.svg" alt="Logo" />
          <nav className="hidden md:flex gap-6">
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
          <div className="flex gap-4 md:ml-[68px]">
            <Link href="/" title="Konto">
              <img
                className="h-[32px] hidden md:block"
                src="/user.svg"
                alt="User"
              />
            </Link>
            <button
              className="md:hidden h-[32px] pt-[1px]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <img
                className="h-full text-[var(--third-color)] fill-gray-500"
                src="/menu.svg"
                alt="Menu"
              />
            </button>
          </div>
        </div>
        </div>
      </header>
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/10 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-[64px] right-0 w-1/3 min-w-[250px] z-50 md:hidden">
            <ShopMobileMenu closeMenu={() => setMobileMenuOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}
