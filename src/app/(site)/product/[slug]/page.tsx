import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@sanity/client';
import ProductClient from './ProductClient';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i6jto0ep',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    "id": _id,
    name,
    price,
    description,
    details,
    "images": images[].asset->url,
    "category": category->name,
    characteristics
  }`;
  return await sanityClient.fetch(query, { slug });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const query = `*[_type == "product" && slug.current == $slug][0] { name, description }`;
  const product = await sanityClient.fetch(query, { slug });

  return {
    title: product ? `${product.name} | Fireline` : 'Товар не найден',
    description: product?.description || 'Биокамины премиум качества',
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-black">
        Товар не найден
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto w-full px-6 py-12 md:py-16">
      <ProductClient product={product} />
    </main>
  );
}
