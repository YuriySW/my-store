import Link from 'next/link';
import { AdvantagesSection } from '@/components/UI/AdvantagesSection';
import { FeaturesBlock } from '@/components/UI/FeaturesBlock';
import { fetchCategories } from '@/lib/sanity';

export default async function Home() {
  const categories = await fetchCategories();

  return (
    <main className="text-black">
      <section className="relative w-[100vw] max-w-none overflow-hidden ml-[calc(50%-50vw)] min-h-[280px] max-[470px]:min-h-[200px]">
        <img
          src="/images/hero-fireplace.jpg"
          alt="Биокамин Fireline"
          className="w-full min-h-[280px] max-[470px]:min-h-0 max-[470px]:max-h-[200px] object-cover max-[470px]:object-contain object-center md:object-left lg:object-[35%] bg-white"
        />
        {/* Оверлей справа: пропорциональное масштабирование через clamp */}
        <div
          className="absolute inset-0 z-10 flex items-start pointer-events-none max-[470px]:!pt-6"
          style={{ paddingTop: 'clamp(5rem, 14vh, 10.25rem)' }}
        >
          <div className="pointer-events-auto max-w-[1200px] mx-auto w-full px-[clamp(0.75rem,4vw,1.5rem)] flex justify-end box-border">
            <div
              className="text-right min-w-0"
              style={{ maxWidth: 'clamp(8.75rem, 35vw, 28rem)' }}
            >
              <p
                className="font-['Raleway',_sans-serif] font-semibold tracking-tight text-black leading-tight"
                style={{ fontSize: 'clamp(0.8125rem, 1.8vw + 0.5rem, 1.875rem)' }}
              >
                Премиальные камины по адекватным ценам
              </p>
              <Link
                href="/shop"
                className="inline-block mt-[clamp(0.5rem,1.5vw,1rem)] bg-red-600 text-white font-['Raleway',_sans-serif] font-bold uppercase tracking-[0.15em] rounded-lg shadow-lg shadow-red-900/30 hover:bg-red-500 hover:shadow-xl hover:shadow-red-900/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                style={{
                  padding: 'clamp(0.375rem, 1.2vw, 0.875rem) clamp(0.75rem, 3vw, 2rem)',
                  fontSize: 'clamp(0.5625rem, 1.2vw + 0.35rem, 0.8125rem)',
                }}
              >
                В каталог
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <p className="font-['Open_Sans',_Helvetica,_Arial,_sans-serif] text-[16px] font-normal leading-[1.618] text-[#333]">
            Биокамины Fireline. Производство биокаминов премиум качества по ценам производителя. Изготовление биокаминов на заказ по вашим размерам
          </p>
        </div>
      </section>

      <section className="py-24 max-w-[1200px] mx-auto px-4 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.slug}`} className="group">
              <div className="bg-[#f5f5f5] p-8 mb-0 overflow-hidden flex items-center justify-center h-[250px]">
                <img
                  src={cat.image || '/images/placeholder.png'}
                  alt={cat.name}
                  className="group-hover:scale-110 transition-transform duration-500 object-contain h-full"
                />
              </div>
              <h3 className="text-center font-['Raleway',_sans-serif] uppercase text-[13px] font-semibold tracking-[1px] text-[#2d2d2d] mt-[5px] mb-[20px] group-hover:text-red-600 transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      <AdvantagesSection />
      <FeaturesBlock />
    </main>
  );
}
