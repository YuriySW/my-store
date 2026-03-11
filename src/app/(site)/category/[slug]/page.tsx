import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ProductCard} from '@/components/ProductCard/ProductCard';
import {getCategoryBySlug, fetchProductsByCategorySlugs} from '@/lib/sanity';

export default async function CategoryPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const slugs = [slug, ...(category.subcategories ?? []).map((s) => s.slug)];
  const products = await fetchProductsByCategorySlugs(slugs);

  return (
    <main className="max-w-[1200px] mx-auto w-full px-4 py-12">
      <div className="flex flex-col gap-8">
        <div className="border-b border-divider pb-6">
          <h1 className="text-3xl font-bold uppercase tracking-tighter text-black">
            {category.name}
          </h1>
          {category.subcategories && category.subcategories.length > 0 && (
            <nav className="mt-4 flex flex-wrap gap-2" aria-label="Подкатегории">
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/category/${sub.slug}`}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  {sub.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
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
