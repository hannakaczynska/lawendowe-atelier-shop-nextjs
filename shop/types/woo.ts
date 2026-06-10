export type WooImage = {
  id: number;
  src: string;
  thumbnail?: string;
  srcset?: string;
  sizes?: string;
  alt?: string | null;
};

export type WooCategory = {
  id: number;
  name: string;
  slug: string;
  link: string;
};

export type WooTag = {
  id: number;
  name: string;
  slug: string;
};

export type WooStoreProduct = {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description?: string;

  type: "simple" | "variable";

  stock_status: string;
  backordered: boolean;
  stock_quantity: number;

  images?: WooImage[];

  price: string;
  regular_price: string;
  sale_price: string;

  categories?: WooCategory[];

  tags?: WooTag[];

  on_sale: boolean;
  average_rating: string;
  rating_count: number;
};
