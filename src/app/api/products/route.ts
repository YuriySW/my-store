import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import { Redis } from '@upstash/redis';

export const dynamic = 'force-dynamic';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i6jto0ep';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2023-05-03',
});

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
  try {
    // 1. Пробуем взять из кэша Redis, если он настроен
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      try {
        const cachedProducts = await redis.get('all_products');
        if (cachedProducts) {
          return NextResponse.json(cachedProducts);
        }
      } catch (redisError) {
        console.warn('Redis Cache Error:', redisError);
      }
    }

    // 2. Берем из Sanity
    const query = `*[_type == "product"] {
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
    
    const products = await sanityClient.fetch(query);

    // 3. Сохраняем в кэш, если Redis настроен
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      await redis.set('all_products', products, { ex: 3600 });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
