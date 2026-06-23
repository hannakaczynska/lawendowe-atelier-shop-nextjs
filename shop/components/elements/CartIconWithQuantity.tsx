"use client";

import { useCartCount } from "@/store/cart";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import {  useRef } from "react";
import MiniCart from "@/components/shop/MiniCart";

export default function CartIconWithQuantity({
  miniCartOpen,
  setMiniCartOpen,
}: {
  miniCartOpen: boolean;
  setMiniCartOpen: (open: boolean) => void;
}) {
  const quantity = useCartCount();
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isDesktopOnly = !isMobile && isDesktop;
  const isTablet = !isMobile && !isDesktop;

  const openDesktop = () => {
    if (!isDesktopOnly) return;
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setMiniCartOpen(true);
  };

  const closeDesktop = () => {
    if (!isDesktopOnly) return;
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setMiniCartOpen(false);
    }, 200);
  };

  const toggleTablet = () => {
    if (!isTablet) return;
    setMiniCartOpen(!miniCartOpen);
  };

  const toggleMobile = () => {
    if (!isMobile) return;
    setMiniCartOpen(!miniCartOpen);
  };

  const handleClick = () => {
    if (isMobile) {
      toggleMobile();
    } else if (isTablet) {
      toggleTablet();
    }
  };

  return (
    <div className="relative inline-block">
      {/* ICON */}
      <div
        className="relative cursor-pointer"
        onMouseEnter={openDesktop}
        onMouseLeave={closeDesktop}
        onClick={handleClick}
      >
        <img className="h-[32px] w-[32px]" src="/grey-cart.svg" alt="Cart" />

        {quantity > 0 && (
          <span className="absolute top-[-2px] right-[-2px] md:top-[-4px] md:right-[-4px] inline-flex text-xs md:text-sm leading-none h-4 w-4 md:h-5 md:w-5 justify-center items-center rounded-full bg-[var(--primary-color)] font-bold text-white">
            {quantity}
          </span>
        )}
      </div>

      {/* DESKTOP + TABLET DROPDOWN */}
      {!isMobile && (isDesktopOnly || isTablet) && miniCartOpen && (
        <div
          className="absolute right-0 mt-3 w-[400px] bg-white shadow-lg rounded-lg border border-[var(--light-grey)] z-50"
          onMouseEnter={openDesktop}
          onMouseLeave={closeDesktop}
        >
          <MiniCart closeMiniCart={() => setMiniCartOpen(false)} />
        </div>
      )}

      {/* MOBILE BOTTOM SHEET */}
      {isMobile && miniCartOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-40 md:hidden h-screen top-[107px]"
          onClick={() => setMiniCartOpen(false)}
        >
          <div
            className="fixed top-[107px] right-0 w-1/3 min-w-[320px] z-50 md:hidden bg-white rounded-bl-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <MiniCart closeMiniCart={() => setMiniCartOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
