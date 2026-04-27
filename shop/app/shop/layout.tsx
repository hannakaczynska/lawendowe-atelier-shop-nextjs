export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        🛍️ Shop Navbar
        <nav>
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/shop/cart">Cart</a>
        </nav>
      </header>

      {children}
    </>
  );
}