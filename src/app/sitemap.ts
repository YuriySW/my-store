import { MetadataRoute } from 'next';
import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-03',
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'http://localhost:3000'; // Замените на ваш домен при деплое

  // Получаем все товары
  const productsQuery = `*[_type == "product"] { "slug": slug.current, _updatedAt }`;
  const products = await sanityClient.fetch(productsQuery);

  // Получаем все категории
  const categoriesQuery = `*[_type == "category"] { "slug": slug.current, _updatedAt }`;
  const categories = await sanityClient.fetch(categoriesQuery);

  const productUrls = products.map((p: any) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: p._updatedAt,
  }));

  const categoryUrls = categories.map((c: any) => ({
    url: `${baseUrl}/category/${c.slug}`,
    lastModified: c._updatedAt,
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/shop`, lastModified: new Date() },
    { url: `${baseUrl}/cart`, lastModified: new Date() },
    ...categoryUrls,
    ...productUrls,
  ];
}
