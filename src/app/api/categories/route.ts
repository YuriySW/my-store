import { NextResponse } from 'next/server';
import { fetchCategories } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await fetchCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Categories API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
