import { MetadataRoute } from 'next';
import { sanityClient } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const [products, categories] = await Promise.all([
    sanityClient.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "product"] { "slug": slug.current, _updatedAt }`
    ),
    sanityClient.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "category"] { "slug": slug.current, _updatedAt }`
    ),
  ]);

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
  }));

  const categoryUrls = categories.map((c) => ({
    url: `${baseUrl}/category/${c.slug}`,
    lastModified: c._updatedAt ? new Date(c._updatedAt) : new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/shop`, lastModified: new Date() },
    { url: `${baseUrl}/cart`, lastModified: new Date() },
    ...categoryUrls,
    ...productUrls,
  ];
}
