export default function ProductCard({ product }: { product: any }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.mainImage.src} alt={product.mainImage.alt} width={200} height={200} />
      <p>{product.regularPrice}</p>
      <button>Dodaj do koszyka</button>
    </div>
  );
}
