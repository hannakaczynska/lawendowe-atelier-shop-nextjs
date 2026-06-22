export enum ProductMoreInfo {
  Description = "description",
  Recipe = "recipe",
  Usage = "usage",
  Ingredients = "ingredients",
}

export const moreInfoLabels: Record<ProductMoreInfo, string> = {
  [ProductMoreInfo.Description]: "Opis",
  [ProductMoreInfo.Recipe]: "Przepisy",
  [ProductMoreInfo.Usage]: "Zastosowanie",
  [ProductMoreInfo.Ingredients]: "Skład",
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  moreInfo: {
    description?: string;
    recipe?: string;
    usage?: string;
    ingredients?: string;
  };

  price: number;
  regularPrice: number;
  salePrice?: number;

  mainImage: {
    src: string;
    alt: string;
    thumbnail: string;
  };

  images: {
    src: string;
    alt: string;
  }[];

  inStock: string;
  quantity: number;

  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
};