'use client';

import React, { useRef, useState, useEffect } from 'react';
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

const fadeInDown = {
  hidden: { opacity: 0, y: -36 },
  visible: { opacity: 1, y: 0 },
};

const containerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const transition = { duration: 1.35, ease: [0.22, 1, 0.36, 1] as const };
const transitionDown = { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const };

export const AdvantagesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.25 });
  const [isNarrow, setIsNarrow] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsNarrow(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <section ref={ref} className="py-20 bg-[#f5f5f5]">
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-20">
        {isNarrow ? (
          <motion.div
            className="col-span-full flex flex-col items-center gap-12 lg:gap-20"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerStagger}
          >
            <motion.div
              className="flex justify-center w-full"
              variants={fadeInDown}
              transition={transitionDown}
            >
              <img
                src="/images/advantages-fireplace.png"
                alt="Преимущества каминов"
                className="w-full max-w-[500px] h-auto object-contain mix-blend-multiply"
              />
            </motion.div>
            <motion.div
              className="flex flex-col items-start text-left w-full"
              variants={fadeInDown}
              transition={transitionDown}
            >
              <h2 className="text-[28px] font-bold text-[#111] mb-8 font-['Open_Sans'] uppercase tracking-tight">
                Преимущества наших каминов
              </h2>
              <ul className="flex flex-col gap-4 mb-10 text-[#333] font-['Open_Sans'] text-[16px] leading-relaxed">
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
                className="bg-[#ff0000] text-white rounded-[4px] py-2 text-[18px] font-normal w-[200px] h-auto hover:bg-red-700 transition-colors text-center"
              >
                Перейти в каталог
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <>
        {/* Левая часть: Изображение — выезжает слева направо */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideInLeft}
          transition={transition}
        >
          <img
            src="/images/advantages-fireplace.png"
            alt="Преимущества каминов"
            className="w-full max-w-[500px] h-auto object-contain mix-blend-multiply"
          />
        </motion.div>

        {/* Правая часть: Текст — выезжает справа налево */}
        <motion.div
          className="flex flex-col items-start text-left"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideInRight}
          transition={transition}
        >
          <h2 className="text-[28px] font-bold text-[#111] mb-8 font-['Open_Sans'] uppercase tracking-tight">
            Преимущества наших каминов
          </h2>
          
          <ul className="flex flex-col gap-4 mb-10 text-[#333] font-['Open_Sans'] text-[16px] leading-relaxed">
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
            className="bg-[#ff0000] text-white rounded-[4px] py-2 text-[18px] font-normal w-[200px] h-auto hover:bg-red-700 transition-colors text-center"
          >
            Перейти в каталог
          </Button>
        </motion.div>
          </>
        )}
      </div>
    </section>
  );
};
