interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
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

export default navItems;