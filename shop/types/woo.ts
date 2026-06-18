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

export type ACFProductFields = {
  description?: string;
  recipe?: string;
  usage?: string;
  ingredients?: string;
};

export type WooStoreProduct = {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description?: string;

  acf_fields?: ACFProductFields;

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

export type WooAccountDetails = {
  firstName?: string;
  lastName?: string;
  email?: string;

  billing?: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    postcode?: string;
  };

  shippingSameAsBilling?: boolean;

  shipping?: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    postcode?: string;
  };
};
