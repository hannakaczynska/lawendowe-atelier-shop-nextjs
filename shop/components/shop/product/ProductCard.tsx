import AddToCartButton from "../../elements/AddToCartButton";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils/formatPrice";
import ProductGallery from "../../elements/carousel/Carousel";

export default function ProductCard({ product }: { product: Product }) {
  function handleQuantity(quantity: number) {
    if (quantity === 0) {
      return (
        <span className="text-[var(--out-of-stock)] font-semibold flex items-center gap-[5px]">
          <img src="/out-of-stock-icon.svg" alt="" className="w-5 h-5" />
          Brak w magazynie
        </span>
      );
    }
    if (quantity < 10) {
      return (
        <span className="text-[var(--last-items)] font-semibold flex items-center gap-[5px]">
          <img src="/last-items-icon.svg" alt="" className="w-5 h-5" />
          Ostatnie sztuki
        </span>
      );
    }
    return (
      <span className="text-[var(--in-stock)] font-semibold flex items-center gap-[5px]">
        <img src="/in-stock-icon.svg" alt="" className="w-5 h-5" />
        Na stanie
      </span>
    );
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 px-4 lg:px-10 gap-10">
      <section className="lg:col-start-1 lg:row-start-1">
        <ProductGallery images={product.images} />
      </section>
      <section className="lg:col-start-2 lg:row-start-1 flex flex-col gap-6 px-4 md:pl-10 lg:px-0">
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <p className="text-2xl mt-8 mb-4 font-semibold text-[var(--secondary-color)]">{formatPrice(product.regularPrice)}</p>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
        {handleQuantity(product.quantity)}
        {product.quantity > 0 && (
          <div className="flex gap-4">
            <input
              type="number"
              step="1"
              min="1"
              max={product.quantity}
              defaultValue="1"
              className="w-20 p-2 border border-[var(--light-grey)] rounded-md"
            />
            <AddToCartButton product={product} />{" "}
          </div>
        )}
      </section>
      <section className="lg:col-span-2 lg:row-start-2">
        <h2>Opis</h2>
      </section>
    </div>
  );
}
