"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Moje dane",
    href: "/shop/account",
    icon: "/user.svg",
  },
  {
    label: "Moje zamówienia",
    href: "/shop/account/orders",
    icon: "/shopping-bag.svg",
  },
  {
    label: "System bonusowy",
    href: "/shop/account/bonus",
    icon: "/star.svg",
  },
  {
    label: "Moje opinie",
    href: "/shop/account/reviews",
    icon: "/reviews.svg",
  },
  {
    label: "Zmień hasło",
    href: "/shop/account/password",
    icon: "/key.svg",
  },
];

export default function AccountSideNav() {
  const pathname = usePathname();

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
        >
          <img src="/sign-out.svg" alt="Wyloguj się" className="w-5 h-5" />
          Wyloguj się
        </button>
      </nav>
    </aside>
  );
}
