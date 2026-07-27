import Link from 'next/link';
import {AdvantagesSection} from '@/components/UI/AdvantagesSection';
import {FeaturesBlock} from '@/components/UI/FeaturesBlock';
import {AboutUsSection} from '@/components/UI/AboutUsSection';
import {fetchCategories} from '@/lib/sanity';
import {productImageUrl} from '@/lib/sanityImage';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const categories = await fetchCategories();

  return (
    <main className="text-black">
      <div className="w-full bg-[#f5f5f5]">
        {/* Десктоп (lg+): картинка + текст справа без карточки */}
        <section className="relative w-[100vw] max-w-none overflow-hidden ml-[calc(50%-50vw)] min-h-[280px] hidden lg:block">
          <img
            src="/images/hero-fireplace.png"
            alt="Биокамин Fireline"
            className="w-full min-h-[280px] object-cover object-[30%] bg-[#f5f5f5]"
          />
          <div className="absolute inset-0 z-10 flex items-start pointer-events-none pt-[clamp(5rem,14vh,10.25rem)]">
            <div className="pointer-events-auto max-w-[1200px] mx-auto w-full px-[clamp(0.75rem,4vw,1.5rem)] flex justify-end box-border">
              <div
                className="min-w-0 text-right"
                style={{maxWidth: 'clamp(14rem, 32vw, 24rem)'}}
              >
                <h1
                  className="font-['Raleway',_-apple-system,_BlinkMacSystemFont,'Segoe_UI',sans-serif] font-bold text-[#1d1d1f] tracking-[-0.035em] leading-[1.08]"
                  style={{fontSize: 'clamp(1.25rem, 1.6vw + 0.55rem, 2.1rem)'}}
                >
                  Премиальные камины по адекватным ценам
                </h1>
                <p
                  className="mt-[clamp(0.5rem,1vw,0.75rem)] ml-auto font-['Raleway',_-apple-system,_BlinkMacSystemFont,'Segoe_UI',sans-serif] font-normal text-[#1d1d1f]/80 tracking-[-0.01em] leading-[1.35]"
                  style={{
                    fontSize: 'clamp(0.8125rem, 0.4vw + 0.65rem, 0.95rem)',
                    maxWidth: '22rem',
                  }}
                >
                  Наши камины это не просто источник тепла. Это дизайнерский элемент, который
                  придаёт характер и создаёт особую атмосферу в любом интерьере.
                </p>
                <Link
                  href="/shop"
                  className="mt-[clamp(0.75rem,1.5vw,1.15rem)] inline-flex items-center justify-center rounded-full bg-[#e10600] px-6 py-2.5 font-['Raleway',_-apple-system,_BlinkMacSystemFont,'Segoe_UI',sans-serif] text-[14px] font-medium text-white tracking-[-0.01em] shadow-[0_4px_14px_rgba(225,6,0,0.28)] transition-all duration-300 hover:bg-[#c90500] hover:-translate-y-0.5 active:translate-y-0"
                >
                  В каталог
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Планшет / моб: картинка сверху, текст снизу — без перекрытия */}
        <section className="w-full lg:hidden">
          <div className="max-w-[1200px] mx-auto w-full px-4 pt-4 pb-6">
            <img
              src="/images/hero-fireplace.png"
              alt="Биокамин Fireline"
              className="w-full h-auto mb-5 object-contain bg-[#f5f5f5]"
            />
            <div className="text-center sm:text-left sm:max-w-xl sm:mx-auto">
              <h1 className="font-['Raleway',_-apple-system,_BlinkMacSystemFont,'Segoe_UI',sans-serif] text-[24px] sm:text-[28px] font-bold leading-[1.1] tracking-[-0.03em] text-[#1d1d1f]">
                Премиальные камины по адекватным ценам
              </h1>
              <p className="mt-3 font-['Raleway',_-apple-system,_BlinkMacSystemFont,'Segoe_UI',sans-serif] text-[15px] font-normal leading-[1.4] tracking-[-0.01em] text-[#1d1d1f]/80">
                Наши камины это не просто источник тепла. Это дизайнерский элемент, который придаёт
                характер и создаёт особую атмосферу в любом интерьере.
              </p>
              <Link
                href="/shop"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-[#e10600] px-7 py-2.5 font-['Raleway',_-apple-system,_BlinkMacSystemFont,'Segoe_UI',sans-serif] text-[15px] font-medium text-white tracking-[-0.01em] shadow-[0_4px_14px_rgba(225,6,0,0.28)] transition-colors hover:bg-[#c90500]"
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
            Фаерлайн — бренд премиальных каминов, биокаминов, электрокаминов и барбекю комплексов.
            Наше производство отличается своим качеством и стильным дизайном. Каждый наш продукт
            является истинным произведением искусства, который добавляет уют и элегантность в любое
            помещение.
          </p>
        </div>
      </section>

      <section className="py-6 max-w-[1200px] mx-auto px-4 bg-white">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.slug}`} className="group">
              <div className="bg-[#f5f5f5] p-4 sm:p-6 lg:p-8 mb-0 overflow-hidden flex items-center justify-center aspect-square">
                <img
                  src={productImageUrl(cat.imageSource, 'category')}
                  alt={cat.name}
                  width={600}
                  height={600}
                  loading="lazy"
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
