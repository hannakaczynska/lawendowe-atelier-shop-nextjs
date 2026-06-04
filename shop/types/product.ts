export type Product = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;

  price: number;
  regularPrice: number;
  salePrice?: number;

  mainImage: {
    src: string;
    alt: string;
  };

  images: {
    src: string;
    alt: string;
  }[];

  inStock: string;

  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
};