export type Product = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;

  price: number;
  regularPrice: number;
  salePrice?: number;

  currency: string;

  mainImage: {
    src: string;
    alt: string;
  };

  images: {
    src: string;
    alt: string;
  }[];

  inStock: boolean;

  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
};