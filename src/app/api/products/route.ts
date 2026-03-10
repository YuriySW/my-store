import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { fetchAllProducts } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

const hasRedis =
  !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
const redis = hasRedis
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

export async function GET() {
  try {
    if (redis) {
      try {
        const cached = await redis.get<string>('all_products');
        if (cached) {
          return NextResponse.json(JSON.parse(cached));
        }
      } catch (e) {
        console.warn('Redis Cache Error:', e);
      }
    }

    const products = await fetchAllProducts();

    if (redis) {
      await redis.set('all_products', JSON.stringify(products), { ex: 3600 });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
