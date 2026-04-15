import ProductList from '@/components/shop/ProductList';
import { getProducts } from '@/lib/woo';

export default async function Shop() {
  const products = await getProducts();
  return (
    <div>
      <h1>Lista produktów</h1>
      <ProductList products={products} />
    </div>
  );
}