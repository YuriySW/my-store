'use client';

import {useCallback, useEffect, useId, useState} from 'react';
import {createPortal} from 'react-dom';
import {X} from 'lucide-react';
import type {PortfolioItem} from '@/lib/sanity';
import {productImageUrl} from '@/lib/sanityImage';

type Props = {
  items: PortfolioItem[];
};

export function PortfolioGallery({items}: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useEffect(() => setMounted(true), []);

  const active = items.find((item) => item.id === activeId) ?? null;

  const close = useCallback(() => setActiveId(null), []);

  useEffect(() => {
    if (!active) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [active, close]);

  if (items.length === 0) {
    return (
      <p className="font-['Open_Sans',_Helvetica,_Arial,_sans-serif] text-[15px] leading-relaxed text-[#666]">
        Пока нет работ в портфолио. Добавьте изображения в админке → Портфолио.
      </p>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setActiveId(item.id)}
              className="group relative block w-full cursor-pointer overflow-hidden bg-[#eceae6] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e10600]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={productImageUrl(item.imageSource, 'gallery')}
                  alt={item.modelName}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/75 via-black/35 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="font-['Raleway',_Helvetica,_Arial,_sans-serif] text-[13px] font-semibold uppercase tracking-[0.14em] text-white sm:text-[14px]">
                  {item.modelName}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {mounted &&
        active &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          >
            <button
              type="button"
              aria-label="Закрыть"
              className="absolute inset-0 bg-black/70 backdrop-blur-[2px] transition-opacity"
              onClick={close}
            />

            <div className="relative z-10 flex max-h-[min(92vh,920px)] w-full max-w-[min(92vw,980px)] flex-col items-center animate-in fade-in zoom-in-95 duration-200">
              <div className="relative inline-block max-h-[min(78vh,820px)] max-w-full">
                <button
                  type="button"
                  onClick={close}
                  aria-label="Закрыть"
                  className="absolute right-2 top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80"
                >
                  <X size={18} strokeWidth={1.75} />
                </button>

                <img
                  src={productImageUrl(active.imageSource, 'lightbox')}
                  alt={active.modelName}
                  className="max-h-[min(78vh,820px)] w-auto max-w-full object-contain"
                />
              </div>

              <p
                id={titleId}
                className="mt-4 font-['Raleway',_Helvetica,_Arial,_sans-serif] text-[15px] font-semibold uppercase tracking-[0.16em] text-white sm:text-[16px]"
              >
                {active.modelName}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
