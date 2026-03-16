import {NextResponse} from 'next/server';
import {fetchAllProducts} from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await fetchAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({error: 'Failed to fetch products'}, {status: 500});
  }
}
