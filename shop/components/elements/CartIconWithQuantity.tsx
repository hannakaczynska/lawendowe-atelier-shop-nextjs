import Link from "next/link";
import { useCartCount } from "@/store/cart";

export default function CartIconWithQuantity() {
  const quantity = useCartCount();

  return (
    <Link href="/shop/cart">
      <div className="relative inline-block">
        <img className="h-[32px] w-[32px]" src="/grey-cart.svg" alt="Cart" />
        {quantity > 0 && (
          <span className="absolute top-[-2px] right-[-2px] md:top-[-4px] md:right-[-4px] inline-flex text-xs md:text-sm leading-none h-4 w-4 md:h-5 md:w-5 justify-center items-center rounded-full bg-[var(--primary-color)] font-bold text-white">
            {quantity}
          </span>
        )}
      </div>
    </Link>
  );
}
