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
        const cached = await redis.get<unknown>('all_products');
        if (cached != null) {
          // Старый кэш мог быть записан как объект (не строка). Поддерживаем оба варианта.
          if (typeof cached === 'string') {
            return NextResponse.json(JSON.parse(cached));
          }
          return NextResponse.json(cached);
        }
      } catch (e) {
        console.warn('Redis Cache Error:', e);
        // Пытаемся самовосстановиться: удаляем битый кэш
        try {
          await redis.del('all_products');
        } catch {
          // ignore
        }
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
