"use client";

import { useAuthFetch } from "@/hooks/useAuthFetch";
import Link from "next/link";
import { usePathname } from "next/navigation";
import navItems from "@/config/accountNav";

export default function AccountSideNav() {
  const pathname = usePathname();

  const authFetch = useAuthFetch();

  async function handleLogout() {
    await authFetch("/api/logout", { method: "POST" });
    window.location.href = "/shop/login";
  }

  return (
    <aside className="fixed top-[100px] md:w-[250px] lg:w-[350px] h-full shrink-0 border-r border-[var(--light-grey)] py-8 pt-10 px-4 hidden md:block">
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition
                ${
                  active
                    ? "bg-[var(--secondary-color-light)] text-[var(--foreground)] font-medium"
                    : "text-[var(--grey)] hover:bg-[var(--secondary-color-light)] hover:text-[var(--foreground)]"
                }
              `}
            >
              <img src={item.icon} alt={item.label} className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}

        {/* Logout button */}
        <button
          className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm text-[var(--primary-color)] mt-6"
          onClick={handleLogout}
        >
          <img src="/sign-out.svg" alt="Wyloguj się" className="w-5 h-5" />
          Wyloguj się
        </button>
      </nav>
    </aside>
  );
}
