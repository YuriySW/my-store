import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-03',
});

export async function GET() {
  try {
    const query = `*[_type == "category"] {
      "id": _id,
      name,
      "slug": slug.current,
      "image": image.asset->url
    }`;
    
    const categories = await sanityClient.fetch(query);
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Categories API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
