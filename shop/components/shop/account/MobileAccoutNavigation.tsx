"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import navItems from "@/config/accountNav";

export default function MobileAccountNavigation({
  closeMenu,
}: {
  closeMenu: () => void;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { authenticated } = useUser();
  const authFetch = useAuthFetch();

  if (!authenticated) {
    return (
      <Link href="/shop/login" onClick={closeMenu}>
        <img className="h-[32px]" src="/user.svg" alt="User" />
      </Link>
    );
  }

  async function handleLogout() {
    await authFetch("/api/logout", { method: "POST" });
    window.location.href = "/shop/login";
  }

  return (
    <div className="flex flex-col">
      {/* Main button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between text-xl"
      >
        Moje konto
        <img
          src="/caret-down-black.svg"
          className={`w-6 h-6 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="mt-3 flex flex-col gap-3 pl-4">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`flex items-center gap-3 text-lg ${
                  active
                    ? "font-semibold"
                    : "text-[var(--grey)]"
                }`}
              >
                <img src={item.icon} className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 text-lg text-[var(--primary-color)] mt-4"
      >
        <img src="/sign-out.svg" className="w-5 h-5" />
        Wyloguj się
      </button>
    </div>
  );
}
