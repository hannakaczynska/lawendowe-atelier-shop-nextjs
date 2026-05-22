"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import MobileMenu from "@/components/MobileMenu";
import { setupHeaderVisibility } from "@/lib/utils/scrollHelpers";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function SiteHeader() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);

  // Setup scroll listener for header visibility — re-runs when isMobile changes
  useEffect(() => {
    if (!isMobile) {
      setHeaderVisible(true);
      return;
    }

    const handleScroll = setupHeaderVisibility(({ headerVisible }) => {
      setHeaderVisible(headerVisible);
    });

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Close mobile menu when resizing to md and up
  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleResize() {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`${headerVisible ? "translate-y-0" : "-translate-y-full"} fixed top-0 w-screen flex flex-col z-60 border-b border-[var(--light-grey)] md:border-b-0 transition-transform duration-300`}
        onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
      >
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
            <MobileMenu closeMenu={() => setMobileMenuOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}
