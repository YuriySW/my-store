'use client';

import {useCallback, useEffect, useId, useMemo, useState} from 'react';
import {createPortal} from 'react-dom';
import {ChevronLeft, ChevronRight, X} from 'lucide-react';
import type {PortfolioCategory, PortfolioItem} from '@/lib/sanity';
import {productImageUrl} from '@/lib/sanityImage';

const fontDisplay = "font-['Raleway']";
const fontBody = "font-['Open_Sans']";

type Props = {
  items: PortfolioItem[];
  categories: PortfolioCategory[];
};

export function PortfolioGallery({items, categories}: Props) {
  const [filter, setFilter] = useState<string>('all');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [slide, setSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useEffect(() => setMounted(true), []);

  const visible = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter((item) => item.categorySlug === filter);
  }, [filter, items]);

  const active = items.find((item) => item.id === activeId) ?? null;
  const slides = active?.imageSources?.filter(Boolean) ?? [];
  const slideCount = slides.length;
  const current = slides[slide] ?? slides[0];

  const open = useCallback((id: string) => {
    setActiveId(id);
    setSlide(0);
  }, []);

  const close = useCallback(() => {
    setActiveId(null);
    setSlide(0);
  }, []);

  const go = useCallback(
    (dir: -1 | 1) => {
      if (slideCount <= 1) return;
      setSlide((prev) => (prev + dir + slideCount) % slideCount);
    },
    [slideCount],
  );

  useEffect(() => {
    if (!active) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [active, close, go]);

  if (items.length === 0) {
    return (
      <p className={`${fontBody} text-[15px] leading-relaxed text-[#666]`}>
        Пока нет работ в портфолио. Добавьте изображения в админке → Портфолио.
      </p>
    );
  }

  return (
    <>
      <nav
        aria-label="Категории портфолио"
        className="mb-8 border-b border-black/10 sm:mb-10"
      >
        <ul className="-mb-px flex flex-wrap gap-x-1 gap-y-0">
          <li>
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`relative px-2.5 py-3 ${fontDisplay} text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors sm:px-3.5 sm:text-[12px] sm:tracking-[0.14em] ${
                filter === 'all'
                  ? 'text-[#1a1a1a]'
                  : 'text-[#888] hover:text-[#1a1a1a]'
              }`}
            >
              Все
              <span
                aria-hidden
                className={`absolute inset-x-2.5 bottom-0 h-[2px] bg-[#e10600] transition-opacity sm:inset-x-3.5 ${
                  filter === 'all' ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          </li>
          {categories.map((cat) => {
            const activeTab = filter === cat.slug;
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => setFilter(cat.slug)}
                  className={`relative px-2.5 py-3 text-left ${fontDisplay} text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors sm:px-3.5 sm:text-[12px] sm:tracking-[0.14em] ${
                    activeTab ? 'text-[#1a1a1a]' : 'text-[#888] hover:text-[#1a1a1a]'
                  }`}
                >
                  {cat.name}
                  <span
                    aria-hidden
                    className={`absolute inset-x-2.5 bottom-0 h-[2px] bg-[#e10600] transition-opacity sm:inset-x-3.5 ${
                      activeTab ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {visible.length === 0 ? (
        <p className={`${fontBody} text-[15px] text-[#666]`}>
          В этой категории пока нет работ.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {visible.map((item) => {
            const cover = item.imageSources?.[0];
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => open(item.id)}
                  className="group relative block w-full cursor-pointer overflow-hidden bg-white text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e10600]"
                >
                  <div className="aspect-square w-full overflow-hidden">
                    <img
                      src={productImageUrl(cover, 'gallery')}
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
                    {item.categoryName && (
                      <p
                        className={`${fontBody} mb-1 text-[11px] uppercase tracking-[0.16em] text-white/70`}
                      >
                        {item.categoryName}
                      </p>
                    )}
                    <p
                      className={`${fontDisplay} text-[13px] font-semibold uppercase tracking-[0.14em] text-white sm:text-[14px]`}
                    >
                      {item.modelName}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {mounted &&
        active &&
        current &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-8"
          >
            <button
              type="button"
              aria-label="Закрыть"
              className="absolute inset-0 bg-black/70 backdrop-blur-[2px] transition-opacity"
              onClick={close}
            />

            <div className="relative z-10 flex w-full max-w-[min(96vw,1100px)] flex-col items-center animate-in fade-in zoom-in-95 duration-200">
              <div className="flex w-full items-center justify-center gap-2 sm:gap-4">
                {slideCount > 1 ? (
                  <button
                    type="button"
                    aria-label="Предыдущее фото"
                    onClick={(e) => {
                      e.stopPropagation();
                      go(-1);
                    }}
                    className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20 sm:h-12 sm:w-12"
                  >
                    <ChevronLeft size={24} strokeWidth={1.75} />
                  </button>
                ) : (
                  <span className="hidden w-12 shrink-0 sm:block" aria-hidden />
                )}

                <div className="relative inline-block max-h-[min(78vh,820px)] max-w-[min(100%,calc(100%-6.5rem))] sm:max-w-[min(100%,calc(100%-7.5rem))]">
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Закрыть"
                    className="absolute right-2 top-2 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80"
                  >
                    <X size={18} strokeWidth={1.75} />
                  </button>

                  <img
                    src={productImageUrl(current, 'lightbox')}
                    alt={active.modelName}
                    className="max-h-[min(78vh,820px)] w-auto max-w-full object-contain"
                  />
                </div>

                {slideCount > 1 ? (
                  <button
                    type="button"
                    aria-label="Следующее фото"
                    onClick={(e) => {
                      e.stopPropagation();
                      go(1);
                    }}
                    className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20 sm:h-12 sm:w-12"
                  >
                    <ChevronRight size={24} strokeWidth={1.75} />
                  </button>
                ) : (
                  <span className="hidden w-12 shrink-0 sm:block" aria-hidden />
                )}
              </div>

              <p
                id={titleId}
                className={`mt-4 ${fontDisplay} text-[15px] font-semibold uppercase tracking-[0.16em] text-white sm:text-[16px]`}
              >
                {active.modelName}
              </p>
              {active.categoryName && (
                <p className={`mt-1 ${fontBody} text-[12px] tracking-wide text-white/55`}>
                  {active.categoryName}
                </p>
              )}
              {slideCount > 1 && (
                <p className={`mt-1.5 ${fontBody} text-[12px] tracking-wide text-white/60`}>
                  {slide + 1} / {slideCount}
                </p>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
