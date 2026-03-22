'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

/** Базовая длительность анимаций блока (медленнее ≈ +45%) */
const t = (delay = 0) => ({ duration: 1.15, ease, delay });

export const AboutUsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-zinc-400/25 py-16 md:py-20 lg:py-24"
    >
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br from-[#ebe9e7] via-[#d9d7d5] to-[#c5c3c1]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_100%_60%_at_80%_20%,rgba(255,255,255,0.45),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_10%_90%,rgba(255,255,255,0.2),transparent_50%)]"
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute -right-24 -top-24 z-[2] h-72 w-72 rounded-full bg-white/10 blur-3xl md:h-96 md:w-96"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, ease }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 -left-16 z-[2] h-64 w-64 rounded-full bg-black/[0.04] blur-3xl md:h-80 md:w-80"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, ease, delay: 0.18 }}
        aria-hidden
      />

      {/* md+: камин с верха секции, колонка как в сетке; <md — в потоке ниже */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-[5] hidden justify-center px-3 sm:px-4 md:flex"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
        transition={{ duration: 1.25, ease, delay: 0.35 }}
        aria-hidden
      >
        <div className="flex w-full max-w-[1200px] items-start gap-x-2 sm:gap-x-4 md:gap-x-8 lg:gap-x-10 xl:gap-x-14">
          <div className="min-w-0 max-w-xl flex-[1]" />
          <div className="relative min-h-[clamp(140px,46vw,620px)] w-full min-w-0 flex-[1.12] md:min-h-[min(72vw,720px)] md:flex-[1.22] lg:min-h-[min(62vw,680px)]">
            <Image
              src="/images/about-us.png"
              alt=""
              fill
              sizes="(max-width: 767px) 92vw, (max-width: 1024px) 52vw, 640px"
              className="rounded-tr-xl object-contain object-top"
            />
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-3 sm:px-4">
        <div className="mb-10 text-center md:mb-14">
          <motion.p
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5a5a5a] md:text-xs font-['Open_Sans',_Helvetica,_Arial,_sans-serif]"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={t(0)}
          >
            История бренда
          </motion.p>
          <motion.h2
            className="mb-5 text-[clamp(1.5rem,4vw,2.25rem)] font-bold uppercase tracking-tight text-[#1a1a1a] font-['Raleway',_Helvetica,_Arial,_sans-serif]"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={t(0.1)}
          >
            О нас
          </motion.h2>
          <motion.div
            className="mx-auto h-0.5 w-12 rounded-full bg-red-600"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.2 }}
            style={{ transformOrigin: 'center' }}
            aria-hidden
          />
        </div>

        <div className="grid min-w-0 grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] items-start gap-x-2 gap-y-0 sm:gap-x-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.22fr)] md:gap-x-8 lg:gap-x-10 xl:gap-x-14">
          <motion.div
            className="min-w-0 max-w-xl"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={t(0.28)}
          >
            <div className="space-y-2 rounded-lg border-l-2 border-zinc-500/35 pl-2 pt-0.5 sm:space-y-3 sm:pl-4 md:space-y-5 md:pl-8">
              <p className="text-pretty font-['Open_Sans',_Helvetica,_Arial,_sans-serif] text-[clamp(9px,2.35vw,15px)] font-medium leading-[1.38] text-[#1a1a1a] md:text-[clamp(11px,2.9vw,17px)] md:leading-[1.5]">
                Идея создания производства появилась после пятнадцатилетнего опыта работы в каминной
                сфере.
              </p>
              <p className="hyphens-auto text-pretty text-left text-[#3d3d3d] md:text-justify font-['Open_Sans',_Helvetica,_Arial,_sans-serif] text-[clamp(8.5px,2.15vw,14px)] font-normal leading-[1.52] md:text-[clamp(10px,2.65vw,16px)] md:leading-[1.72]">
                На рынке не хватало подвесных, островных каминов по приемлемой цене. А у нас было
                огромное желание создать качественный российский продукт, и это нам удалось. Мы
                постоянно работаем над развитием модельного ряда, в этом нам помогают клиенты, которые,
                не найдя подходящей модели, обращаются к нам с идеей, а мы воплощаем задумку в
                реальность.
              </p>
            </div>
          </motion.div>

          {/* Мобилка: gpt-notfon справа от текста; md+ — скрыто */}
          <div className="relative min-h-[min(52vw,260px)] w-full min-w-0 sm:min-h-[min(50vw,300px)] md:hidden">
            <Image
              src="/images/gpt-notfon.png"
              alt=""
              fill
              sizes="(max-width: 767px) 42vw, 100vw"
              className="object-contain object-top"
            />
          </div>

          <div
            className="relative hidden min-h-[clamp(140px,46vw,620px)] w-full min-w-0 md:block md:min-h-[min(72vw,720px)] lg:min-h-[min(62vw,680px)]"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
};
