import {Metadata} from 'next';
import {getProductBySlug, getProductMeta} from '@/lib/sanity';
import ProductClient from './ProductClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
  const product = await getProductMeta(slug);
  return {
    title: product ? `${product.name} | Fireline` : 'Товар не найден',
    description: product?.description || 'Биокамины премиум качества',
  };
}

export default async function ProductPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-black">
        Товар не найден
      </div>
    );
  }

  return (
    <main className="w-full bg-[#f5f5f5] min-h-screen">
      <div className="max-w-[1200px] mx-auto w-full px-4 pt-12 md:pt-16 pb-0">
        <ProductClient product={product} />
      </div>
    </main>
  );
}
