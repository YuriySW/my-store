import {createClient} from '@sanity/client';
import type {Product, Category} from '@/types/catalog';
import type {SanityImageSource} from './sanityImage';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i6jto0ep';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2023-05-03',
});

const IMAGE_ASSET = `{
  "_id": _id,
  "url": url
}`;

const PRODUCTS_QUERY = `*[_type == "product"] | order(orderRank asc, name asc) {
  "id": _id,
  name,
  "slug": slug.current,
  price,
  description,
  details,
  "imageSources": images[].asset->${IMAGE_ASSET},
  "category": category->name,
  "categorySlug": category->slug.current,
}`;

export async function fetchAllProducts(): Promise<Product[]> {
  return sanityClient.fetch(PRODUCTS_QUERY);
}

const PRODUCTS_BY_CATEGORY_QUERY = `*[_type == "product" && category->slug.current == $slug] | order(orderRank asc, name asc) {
  "id": _id,
  name,
  "slug": slug.current,
  price,
  description,
  details,
  "imageSources": images[].asset->${IMAGE_ASSET},
  "category": category->name,
  "categorySlug": category->slug.current,
}`;

const PRODUCTS_BY_CATEGORY_SLUGS_QUERY = `*[_type == "product" && category->slug.current in $slugs] | order(orderRank asc, name asc) {
  "id": _id,
  name,
  "slug": slug.current,
  price,
  description,
  details,
  "imageSources": images[].asset->${IMAGE_ASSET},
  "category": category->name,
  "categorySlug": category->slug.current,
}`;

const CATEGORY_BY_SLUG_QUERY = `*[_type == "category" && slug.current == $slug][0] {
  "id": _id,
  name,
  "slug": slug.current,
  "imageSource": image.asset->${IMAGE_ASSET},
  "subcategories": *[_type == "category" && parent._ref == ^._id] | order(orderRank asc, name asc) {
    "id": _id,
    name,
    "slug": slug.current,
    "imageSource": image.asset->${IMAGE_ASSET}
  }
}`;

export async function fetchProductsByCategorySlug(slug: string): Promise<Product[]> {
  return sanityClient.fetch(PRODUCTS_BY_CATEGORY_QUERY, {slug});
}

export async function fetchProductsByCategorySlugs(slugs: string[]): Promise<Product[]> {
  if (slugs.length === 0) return [];
  return sanityClient.fetch(PRODUCTS_BY_CATEGORY_SLUGS_QUERY, {slugs});
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return sanityClient.fetch(CATEGORY_BY_SLUG_QUERY, {slug});
}

const CATEGORIES_QUERY = `*[_type == "category" && !defined(parent)] | order(orderRank asc, name asc) {
  "id": _id,
  name,
  "slug": slug.current,
  "imageSource": image.asset->${IMAGE_ASSET},
  "subcategories": *[_type == "category" && parent._ref == ^._id] | order(orderRank asc, name asc) {
    "id": _id,
    name,
    "slug": slug.current,
    "imageSource": image.asset->${IMAGE_ASSET}
  }
}`;

export async function fetchCategories(): Promise<Category[]> {
  return sanityClient.fetch(CATEGORIES_QUERY);
}

const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  "id": _id,
  name,
  price,
  description,
  details,
  "imageSources": images[].asset->${IMAGE_ASSET},
  "category": category->name,
  "categorySlug": category->slug.current,
  video,
  "drawingSource": drawing.asset->${IMAGE_ASSET},
  instructions
}`;

const PRODUCT_META_QUERY = `*[_type == "product" && slug.current == $slug][0] { name, description }`;

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return sanityClient.fetch(PRODUCT_BY_SLUG_QUERY, {slug});
}

export async function getProductMeta(slug: string) {
  return sanityClient.fetch(PRODUCT_META_QUERY, {slug});
}

export interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
}

export interface PortfolioItem {
  id: string;
  modelName: string;
  imageSources: SanityImageSource[];
  categoryId: string | null;
  categorySlug: string | null;
  categoryName: string | null;
}

const PORTFOLIO_CATEGORIES_QUERY = `*[_type == "portfolioCategory" && !defined(parent)] | order(orderRank asc, name asc) {
  "id": _id,
  name,
  "slug": slug.current
}`;

const PORTFOLIO_QUERY = `*[_type == "portfolioItem"] | order(orderRank asc, modelName asc) {
  "id": _id,
  modelName,
  "categoryId": category->_id,
  "categorySlug": category->slug.current,
  "categoryName": category->name,
  "imageSources": select(
    count(images) > 0 => images[].asset->${IMAGE_ASSET},
    defined(image.asset) => [image.asset->${IMAGE_ASSET}],
    []
  )
}`;

/** Без CDN — иначе свежие category/slug после миграции не видны минутами. */
const portfolioClient = sanityClient.withConfig({useCdn: false});

export async function fetchPortfolioCategories(): Promise<PortfolioCategory[]> {
  return portfolioClient.fetch(PORTFOLIO_CATEGORIES_QUERY);
}

export async function fetchPortfolioItems(): Promise<PortfolioItem[]> {
  return portfolioClient.fetch(PORTFOLIO_QUERY);
}

export type {SanityImageSource};
