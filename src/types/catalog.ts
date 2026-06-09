import type {SanityImageSource} from '@/lib/sanityImage';

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageSource?: SanityImageSource;
  subcategories?: Category[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  details?: string;
  imageSources: SanityImageSource[];
  category: string;
  categorySlug: string;
  /** URL видео (YouTube, Vimeo и т.д.) */
  video?: string;
  /** Изображение или PDF чертежа */
  drawingSource?: SanityImageSource;
  /** URL PDF инструкции или текст */
  instructions?: string;
}
