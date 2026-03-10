export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  details?: string;
  images: string[];
  category: string;
  categorySlug: string;
  characteristics: { key: string; value: string }[];
}
