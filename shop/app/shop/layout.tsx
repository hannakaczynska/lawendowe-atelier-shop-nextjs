import Link from "next/link";
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        🛍️ Shop Navbar
        <nav>
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/shop/cart">Cart</Link>
        </nav>
      </header>

      {children}
    </>
  );
}