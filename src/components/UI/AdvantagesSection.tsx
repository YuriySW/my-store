'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

const slideInLeft = {
  hidden: { opacity: 0, x: '-50vw' },
  visible: { opacity: 1, x: 0 },
};

const slideInRight = {
  hidden: { opacity: 0, x: '50vw' },
  visible: { opacity: 1, x: 0 },
};

const transition = { duration: 1.35, ease: [0.22, 1, 0.36, 1] as const };

export const AdvantagesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.25 });

  return (
    <section ref={ref} className="overflow-x-hidden py-12 sm:py-16 md:py-20 bg-[#e8e4de]">
      <div className="mx-auto grid min-w-0 max-w-[1200px] grid-cols-2 items-center gap-3 px-3 sm:gap-6 sm:px-4 md:gap-12 lg:gap-20">
        <motion.div
          className="flex min-w-0 justify-center md:justify-end"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideInLeft}
          transition={transition}
        >
          <img
            src="/images/advantages-fireplace.png"
            alt="Преимущества каминов"
            className="h-auto w-full max-w-[min(500px,42vw)] object-contain mix-blend-multiply sm:max-w-[min(500px,46vw)] md:max-w-[500px]"
          />
        </motion.div>

        <motion.div
          className="flex min-w-0 flex-col items-start text-left"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideInRight}
          transition={transition}
        >
          <h2 className="mb-3 font-['Open_Sans'] text-[clamp(0.75rem,2.8vw,1.75rem)] font-bold uppercase tracking-tight text-[#111] sm:mb-5 md:mb-8 md:text-[28px]">
            Преимущества наших каминов
          </h2>

          <ul className="mb-4 flex flex-col gap-1.5 font-['Open_Sans'] text-[clamp(0.625rem,2.1vw,1rem)] leading-snug text-[#333] sm:gap-2 sm:mb-6 md:gap-4 md:mb-10 md:leading-relaxed">
            <li>Собственное производство. Высокое качество и низкая цена</li>
            <li>Изготовим любой камин за 45 дней</li>
            <li>15 лет опыта</li>
            <li>Пожаробезопасен, экологичен на 100%</li>
            <li>Доставка по всей России и странам СНГ</li>
            <li>Увеличенная гарантия 5 лет</li>
          </ul>

          <Button
            as={Link}
            href="/shop"
            className="h-auto w-[min(200px,100%)] rounded-[4px] bg-[#ff0000] py-1.5 text-center text-[clamp(0.75rem,2.2vw,1.125rem)] font-normal text-white transition-colors hover:bg-red-700 sm:py-2"
          >
            Перейти в каталог
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
