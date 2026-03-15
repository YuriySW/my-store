'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const slideInLeft = {
  hidden: { opacity: 0, x: '-50vw' },
  visible: { opacity: 1, x: 0 },
};
const slideInRight = {
  hidden: { opacity: 0, x: '50vw' },
  visible: { opacity: 1, x: 0 },
};
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.35, delayChildren: 0.08 } },
};
const transition = { duration: 1.15, ease: [0.22, 1, 0.36, 1] as const };

export default function DeliveryPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  return (
    <main className="w-full min-h-screen">
      <div className="w-full bg-[#f5f5f5]">
        <div className="max-w-[1200px] mx-auto w-full px-4 py-20">
      <h1
        className="text-4xl font-bold uppercase tracking-tighter mb-10 font-['Raleway',_Helvetica,_Arial,_sans-serif] text-[#333] text-center"
      >
        Условия доставки
      </h1>

      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-[26px] font-semibold text-[#333] font-['Raleway',_Helvetica,_Arial,_sans-serif]">
          Доставка
        </h2>
        <p className="text-[#333] text-[15px] mb-2">Как мы доставляем заказы</p>
        <div className="border-b border-gray-200 w-64 mx-auto mb-12" />
      </div>

      <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-center">
        Осуществляем доставку Ваших заказов по всей России, а так же в Казахстан и
        Белоруссию.
      </p>

      <div className="flex justify-center mb-12">
        <Image
          src="/images/dostavka22.png"
          alt="Доставка"
          width={896}
          height={200}
          className="w-full max-w-4xl h-auto object-contain"
        />
      </div>

      <motion.section
        ref={sectionRef}
        className="space-y-16 max-w-4xl mx-auto"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={container}
      >
        <motion.article
          className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-8"
          variants={slideInLeft}
          transition={transition}
        >
          <div className="relative w-[160px] h-[160px] shrink-0 rounded-full overflow-hidden bg-gray-100">
            <Image
              src="/images/deliver-1.png"
              alt="Доставка по Екатеринбургу"
              fill
              className="object-cover"
              sizes="160px"
              priority
            />
          </div>

          <div className="max-w-xl text-center">
            <h2 className="text-[20px] font-semibold text-[#333] mb-2 font-['Raleway',_Helvetica,_Arial,_sans-serif]">
              Доставка по Екатеринбургу
            </h2>
            <p className="text-gray-600 text-[13px] leading-relaxed">
              Доставка по Екатеринбургу и области осуществляется нашим транспортом в
              течение 3–4 дней с момента заказа товара (при наличии на складе).
              Доставка по Екатеринбургу составляет 2000 рублей. Доставка по
              Свердловской области 2000 рублей + 20 рублей за 1 км. Разгрузка не
              входит в стоимость доставки.
            </p>
          </div>
        </motion.article>

        <motion.article
          className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-8 md:flex-row-reverse"
          variants={slideInRight}
          transition={transition}
        >
          <div className="relative w-[170px] h-[170px] shrink-0 rounded-full overflow-hidden bg-gray-100">
            <Image
              src="/images/deliver-2.png"
              alt="Доставка по России"
              fill
              className="object-cover"
              sizes="170px"
            />
          </div>

          <div className="max-w-xl text-center">
            <h2 className="text-[20px] font-semibold text-[#333] mb-2 font-['Raleway',_Helvetica,_Arial,_sans-serif]">
              Доставка по России
            </h2>
            <p className="text-gray-600 text-[13px] leading-relaxed">
              Наша компания осуществляет доставку нашей продукции и в другие города
              России. Для доставки мы пользуемся услугами проверенных транспортных
              компаний «ТК КИТ», «ТК ПЭК», «ТК ДЕЛОВЫЕ ЛИНИИ». Доставка может
              осуществляться как до терминала транспортной компании в Вашем городе,
              так и «до двери».
            </p>
          </div>
        </motion.article>
      </motion.section>
        </div>
      </div>

      <div className="w-full bg-white py-20">
        <div className="max-w-[1200px] mx-auto w-full px-4">
      <section className="max-w-4xl mx-auto py-8 px-6">
        <div className="text-center">
          <h2 className="text-[26px] font-semibold text-[#333] font-['Raleway',_Helvetica,_Arial,_sans-serif]">
            Рассчитать стоимость доставки
          </h2>
          <p className="mt-2 text-gray-500 text-[13px]">С помощью калькулятора</p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {[
            {
              name: 'ПЭК',
              href: 'https://pecom.ru/ru/newcalc/',
              src: '/images/delivery-companies/pek.png',
            },
            {
              name: 'КИТ (GTD)',
              href: 'https://gtdel.com/',
              src: '/images/delivery-companies/kit.png',
            },
            {
              name: 'Деловые Линии',
              href: 'https://widgets.dellin.ru/calculator/',
              src: '/images/delivery-companies/dellin.png',
            },
            {
              name: 'ЖелДорЭкспедиция',
              href: 'https://api.jde.ru/widget/calculator/',
              src: '/images/delivery-companies/jde.png',
            },
            {
              name: 'РАТЭК',
              href: 'https://rateksib.com/',
              src: '/images/delivery-companies/ratek.png',
            },
            {
              name: 'Автотрейдинг',
              href: 'http://www.autotrading.ru/api/calculator/',
              src: '/images/delivery-companies/autotrading.png',
            },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-[86px] h-[86px] rounded-full overflow-hidden bg-transparent transition-transform hover:scale-[1.03]"
              aria-label={item.name}
              title={item.name}
            >
              <Image
                src={item.src}
                alt={item.name}
                fill
                className="object-cover"
                sizes="172px"
                quality={100}
                unoptimized
              />
            </a>
          ))}
        </div>

        <p className="mt-10 text-center text-gray-600 text-[13px]">
          Доставка осуществляется в любой город России, Белоруссии и Казахстана.
        </p>
      </section>
        </div>
      </div>
    </main>
  );
}
