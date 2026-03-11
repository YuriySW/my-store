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
      <div className="flex flex-col gap-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase tracking-[0.2em] text-black font-['Open_Sans']">
            {category.name}
          </h1>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4" />
        </div>

        {category.subcategories && category.subcategories.length > 0 && (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {category.subcategories.map((sub) => (
                <Link key={sub.id} href={`/category/${sub.slug}`} className="group">
                  <div className="bg-[#f5f5f5] p-10 mb-6 overflow-hidden flex items-center justify-center h-[300px] rounded-sm transition-all group-hover:shadow-xl">
                    <img
                      src={sub.image || '/images/placeholder.png'}
                      alt={sub.name}
                      className="group-hover:scale-110 transition-transform duration-700 object-contain h-full mix-blend-multiply"
                    />
                  </div>
                  <h3 className="text-center font-bold uppercase tracking-[0.15em] text-lg text-black group-hover:text-red-600 transition-colors font-['Open_Sans']">
                    {sub.name}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        {(!category.subcategories || category.subcategories.length === 0) && (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.length > 0 ? (
                products.map((product) => <ProductCard key={product.id} product={product} />)
              ) : (
                <div className="col-span-full text-center py-20 text-gray-400">
                  В этой категории пока нет товаров.
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
