import { ProductCard } from '@/components/ProductCard/ProductCard';
import { fetchProductsByCategorySlug } from '@/lib/sanity';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await fetchProductsByCategorySlug(slug);

  return (
    <main className="max-w-[1200px] mx-auto w-full px-4 py-12">
      <div className="flex flex-col gap-8">
        <div className="border-b border-divider pb-6">
          <h1 className="text-3xl font-bold uppercase tracking-tighter text-black">
            Категория: {slug}
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-400">
              В этой категории пока нет товаров.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
