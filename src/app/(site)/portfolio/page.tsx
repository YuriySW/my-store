import type {Metadata} from 'next';
import {PortfolioGallery} from '@/components/Portfolio/PortfolioGallery';
import {fetchPortfolioItems} from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Портфолио — Fireline',
  description: 'Реализованные проекты и установки каминов Fireline.',
};

export default async function PortfolioPage() {
  const items = await fetchPortfolioItems();

  return (
    <main className="bg-white text-black">
      <section className="mx-auto w-full max-w-[1200px] px-4 pb-16 pt-10 sm:pb-20 sm:pt-14">
        <header className="mb-8 sm:mb-12">
          <p className="mb-2 font-['Raleway',_Helvetica,_Arial,_sans-serif] text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e10600]">
            Fireline
          </p>
          <h1 className="font-['Raleway',_Helvetica,_Arial,_sans-serif] text-[clamp(1.75rem,4vw,2.75rem)] font-bold uppercase tracking-tight text-[#1a1a1a]">
            Портфолио
          </h1>
        </header>

        <PortfolioGallery items={items} />
      </section>
    </main>
  );
}
