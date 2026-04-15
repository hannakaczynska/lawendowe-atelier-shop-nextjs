export default function ProductCard({ product }: { product: any }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.images[0].src} alt={product.name} width={200} height={200} />
      <p>{product.prices.regular_price}</p>
      <button>Dodaj do koszyka</button>
    </div>
  );
}
