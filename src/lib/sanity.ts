import { createClient } from '@sanity/client';
import type { Product } from '@/types/catalog';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i6jto0ep';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2023-05-03',
});

const PRODUCTS_QUERY = `*[_type == "product"] {
  "id": _id,
  name,
  "slug": slug.current,
  price,
  description,
  details,
  "images": images[].asset->url,
  "category": category->name,
  "categorySlug": category->slug.current,
  characteristics
}`;

export async function fetchAllProducts() {
  return sanityClient.fetch(PRODUCTS_QUERY);
}

const PRODUCTS_BY_CATEGORY_QUERY = `*[_type == "product" && category->slug.current == $slug] {
  "id": _id,
  name,
  "slug": slug.current,
  price,
  description,
  details,
  "images": images[].asset->url,
  "category": category->name,
  "categorySlug": category->slug.current,
  characteristics
}`;

export async function fetchProductsByCategorySlug(slug: string): Promise<Product[]> {
  return sanityClient.fetch(PRODUCTS_BY_CATEGORY_QUERY, { slug });
}

const CATEGORIES_QUERY = `*[_type == "category"] {
  "id": _id,
  name,
  "slug": slug.current,
  "image": image.asset->url
}`;

export async function fetchCategories() {
  return sanityClient.fetch(CATEGORIES_QUERY);
}

const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  "id": _id,
  name,
  price,
  description,
  details,
  "images": images[].asset->url,
  "category": category->name,
  "categorySlug": category->slug.current,
  characteristics
}`;

const PRODUCT_META_QUERY = `*[_type == "product" && slug.current == $slug][0] { name, description }`;

export async function getProductBySlug(slug: string) {
  return sanityClient.fetch(PRODUCT_BY_SLUG_QUERY, { slug });
}

export async function getProductMeta(slug: string) {
  return sanityClient.fetch(PRODUCT_META_QUERY, { slug });
}
