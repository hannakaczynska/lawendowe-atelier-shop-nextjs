export type WooImage = {
  id: number;
  src: string;
  thumbnail?: string;
  srcset?: string;
  sizes?: string;
  alt?: string | null;
};

export type WooPrices = {
  price: string;
  regular_price: string;
  sale_price?: string | null;
  currency_symbol: string;
  currency_code: string;
  price_range?: unknown;
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

  is_in_stock: boolean;
  is_on_backorder: boolean;

  images?: WooImage[];

  prices: WooPrices;

  categories?: WooCategory[];

  tags?: WooTag[];

  add_to_cart?: {
    url: string;
    text: string;
    description: string;
  };

  on_sale: boolean;
  average_rating: string;
  review_count: number;
};