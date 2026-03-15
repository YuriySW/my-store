import {createClient} from '@sanity/client';
import type {Product} from '@/types/catalog';
import type {Category} from '@/types/catalog';

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

const PRODUCTS_BY_CATEGORY_SLUGS_QUERY = `*[_type == "product" && category->slug.current in $slugs] {
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

const CATEGORY_BY_SLUG_QUERY = `*[_type == "category" && slug.current == $slug][0] {
  "id": _id,
  name,
  "slug": slug.current,
  "image": image.asset->url,
  "subcategories": subcategories[]->{
    "id": _id,
    name,
    "slug": slug.current,
    "image": image.asset->url
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

const CATEGORIES_QUERY = `*[_type == "category" && !(_id in *[_type == "category"].subcategories[]._ref) && !(("drafts." + _id) in *[_type == "category"].subcategories[]._ref)] {
  "id": _id,
  name,
  "slug": slug.current,
  "image": image.asset->url,
  "subcategories": subcategories[]->{
    "id": _id,
    name,
    "slug": slug.current,
    "image": image.asset->url
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
  "images": images[].asset->url,
  "category": category->name,
  "categorySlug": category->slug.current,
  characteristics,
  video,
  "drawing": drawing.asset->url,
  instructions
}`;

const PRODUCT_META_QUERY = `*[_type == "product" && slug.current == $slug][0] { name, description }`;

export async function getProductBySlug(slug: string) {
  return sanityClient.fetch(PRODUCT_BY_SLUG_QUERY, {slug});
}

export async function getProductMeta(slug: string) {
  return sanityClient.fetch(PRODUCT_META_QUERY, {slug});
}
