export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  subcategories?: Category[];
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
  /** URL видео (YouTube, Vimeo и т.д.) */
  video?: string;
  /** URL изображения или PDF чертежа */
  drawing?: string;
  /** URL PDF инструкции или текст */
  instructions?: string;
}
