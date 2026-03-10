import { Metadata } from 'next';
import { getProductBySlug, getProductMeta } from '@/lib/sanity';
import ProductClient from './ProductClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductMeta(slug);
  return {
    title: product ? `${product.name} | Fireline` : 'Товар не найден',
    description: product?.description || 'Биокамины премиум качества',
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

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
