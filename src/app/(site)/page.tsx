import Link from 'next/link';
import { AdvantagesSection } from '@/components/UI/AdvantagesSection';
import { FeaturesBlock } from '@/components/UI/FeaturesBlock';
import { AboutUsSection } from '@/components/UI/AboutUsSection';
import { fetchCategories } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const categories = await fetchCategories();

  return (
    <main className="text-black">
      <div className="w-full bg-[#f5f5f5]">
        {/* Десктопный герой: картинка + текст поверх справа */}
        <section className="relative w-[100vw] max-w-none overflow-hidden ml-[calc(50%-50vw)] min-h-[280px] max-[760px]:hidden">
          <img
            src="/images/hero-fireplace.png"
            alt="Биокамин Fireline"
            className="w-full min-h-[280px] object-cover object-center md:object-left lg:object-[35%] bg-[#f5f5f5]"
          />
          <div className="absolute inset-0 z-10 flex items-start pointer-events-none pt-[clamp(5rem,14vh,10.25rem)]">
            <div className="pointer-events-auto max-w-[1200px] mx-auto w-full px-[clamp(0.75rem,4vw,1.5rem)] flex justify-end box-border">
              <div
                className="text-right min-w-0"
                style={{ maxWidth: 'clamp(8.75rem, 35vw, 28rem)' }}
              >
                <p
                  className="font-['Raleway',_sans-serif] font-semibold tracking-tight text-black leading-tight uppercase"
                  style={{ fontSize: 'clamp(0.8125rem, 1.8vw + 0.5rem, 1.875rem)' }}
                >
                  Премиальные камины по адекватным ценам
                </p>
                <p
                  className="mt-[clamp(0.375rem,1vw,0.625rem)] font-['Raleway',_sans-serif] text-black/80 leading-snug"
                  style={{ fontSize: 'clamp(0.6875rem, 1vw + 0.4rem, 0.875rem)' }}
                >
                  Наши камины это не просто источник тепла. Это дизайнерский элемент, который придаёт характер и создаёт особую атмосферу в любом интерьере.
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

        {/* Мобильный герой: картинка сверху, текст и кнопка под ней */}
        <section className="w-full max-[760px]:block hidden">
          <div className="max-w-[1200px] mx-auto w-full px-4 pt-4 pb-6">
            <img
              src="/images/hero-fireplace.png"
              alt="Биокамин Fireline"
              className="w-full h-auto mb-4 object-contain bg-[#f5f5f5]"
            />
            <div className="text-center">
              <p className="font-['Raleway',_sans-serif] font-semibold tracking-tight text-black leading-tight uppercase text-[18px]">
                Премиальные камины по адекватным ценам
              </p>
              <p className="mt-2 hyphens-auto text-justify font-['Raleway',_sans-serif] text-black/80 leading-snug text-[13px]">
                Наши камины это не просто источник тепла. Это дизайнерский элемент, который придаёт характер и создаёт особую атмосферу в любом интерьере.
              </p>
              <Link
                href="/shop"
                className="inline-block mt-4 bg-red-600 text-white font-['Raleway',_sans-serif] font-bold uppercase tracking-[0.15em] rounded-lg shadow-lg shadow-red-900/30 hover:bg-red-500 hover:shadow-xl hover:shadow-red-900/40 transition-all duration-300 px-6 py-2 text-[11px]"
              >
                В каталог
              </Link>
            </div>
          </div>
        </section>
      </div>

      <section className="py-10 max-[468px]:pt-4 max-[468px]:pb-6 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <p className="font-['Open_Sans',_Helvetica,_Arial,_sans-serif] text-[16px] font-normal leading-[1.618] text-[#333] text-justify">
            Фаерлайн — бренд премиальных каминов, биокаминов, электрокаминов и барбекю комплексов. Наше производство отличается своим качеством и стильным дизайном. Каждый наш продукт является истинным произведением искусства, который добавляет уют и элегантность в любое помещение.
          </p>
        </div>
      </section>

      <section className="py-6 max-w-[1200px] mx-auto px-4 bg-white">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.slug}`} className="group">
              <div className="bg-[#f5f5f5] p-4 sm:p-6 lg:p-8 mb-0 overflow-hidden flex items-center justify-center aspect-square">
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
      <AboutUsSection />
    </main>
  );
}
