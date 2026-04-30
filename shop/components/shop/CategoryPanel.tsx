import Link from "next/link";

export default async function CategoryPage() {
  return (
    <div className="w-screen h-[100px] bg-[url('/shop-header.jpg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <nav className="relative z-10 w-full h-full max-w-[1400px] mx-auto flex items-center justify-start text-xl">
        <Link className="cursor-pointer" href="/shop">
          <img className="h-[30px]" src="/home.svg" alt="Shop" />
        </Link>
        <p className="relative before:content-['<'] before:absolute before:inset-0 before:bg-black/40">
          Kategorie
        </p>
        <p>Wszystkie</p>
      </nav>
    </div>
  );
}
