import Link from 'next/link';
import { fetchCategories } from '@/lib/sanity';

export default async function ShopPage() {
  const categories = await fetchCategories();

  return (
    <main className="max-w-[1200px] mx-auto w-full px-4 py-12">
      <div className="flex flex-col gap-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase tracking-[0.2em] text-black font-['Open_Sans']">Каталог</h1>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.slug}`} className="group">
              <div className="bg-[#f5f5f5] p-10 mb-6 overflow-hidden flex items-center justify-center h-[300px] rounded-sm transition-all group-hover:shadow-xl">
                <img
                  src={cat.image || '/images/placeholder.png'}
                  alt={cat.name}
                  className="group-hover:scale-110 transition-transform duration-700 object-contain h-full mix-blend-multiply"
                />
              </div>
              <h3 className="text-center font-bold uppercase tracking-[0.15em] text-lg text-black group-hover:text-red-600 transition-colors font-['Open_Sans']">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
