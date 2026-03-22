'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Button, useDisclosure } from '@nextui-org/react';
import { CallbackModal } from '@/components/UI/CallbackModal';

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

const COOPERATION_ADVANTAGES = [
  {
    src: '/images/deliver-1.png',
    alt: 'Доставка',
    title: 'Доставка.',
    body:
      'Отправляем товары транспортными компаниями по всей России, а также в Казахстан и Белоруссию. Доставка может осуществляться как до терминала транспортной компании в вашем городе, так и «до двери».',
  },
  {
    src: '/images/cooperation.png',
    alt: 'Сотрудничество',
    title: 'Сотрудничество.',
    body:
      'Своим партнёрам предлагаем специальные условия сотрудничества и индивидуальный подход. Гибкая система скидок. Мы демократичны и всегда открыты к общению.',
  },
  {
    src: '/images/help.png',
    alt: 'Поддержка',
    title: 'Поддержка.',
    body:
      'Предоставляем своим партнёрам широкую информационную и техническую базу и поддержку. По необходимости предоставляем печатные материалы. Гарантируем поставку заказов в срок.',
  },
  {
    src: '/images/installation.png',
    alt: 'Монтаж',
    title: 'Монтаж.',
    body:
      'Осуществляем профессиональный монтаж. Опыт наших монтажников более 15 лет, выполнено огромное количество проектов разной сложности. Используйте надёжную и проверенную монтажную компанию, чтобы быть уверенным в качестве работ.',
  },
  {
    src: '/images/good-ideas.png',
    alt: 'Отличная цена',
    title: 'Отличная цена.',
    body:
      'Мы предлагаем продукцию как эконом, так и премиум-класса по доступным ценам. Поэтому в нашем каталоге вы найдёте необходимый продукт на любой вкус и кошелёк.',
  },
  {
    src: '/images/sertif.png',
    alt: 'Инструкция и сертификаты',
    title: 'Инструкция и сертификаты.',
    body:
      'На каждый продаваемый нами продукт предоставляется сертификат, гарантийный талон и инструкция. Гарантийный срок на продукцию достигает 5 лет и даётся заводом-изготовителем.',
  },
  {
    src: '/images/individual.png',
    alt: 'Индивидуальное изготовление',
    title: 'Индивидуальное изготовление.',
    body:
      'Любой из наших продуктов мы можем изготовить под заказ по вашим размерам. Наши возможности очень широки, и мы с радостью и энтузиазмом возьмёмся за любой ваш проект.',
  },
] as const;

export default function CooperationPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const advantagesRef = useRef<HTMLElement>(null);
  const advantagesInView = useInView(advantagesRef, { once: true, amount: 0.15 });

  return (
    <main className="w-full bg-[#f5f5f5] min-h-screen">
      <CallbackModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className="max-w-[1200px] mx-auto w-full px-4 pt-10 pb-20">
        <div className="mb-6 md:mb-8">
          <img
            src="/images/design.png"
            alt="Сотрудничество"
            className="w-full h-auto object-contain block"
          />
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 font-['Raleway',_Helvetica,_Arial,_sans-serif] text-[#333] text-justify leading-snug">
          Приглашаем к сотрудничеству дилеров, дизайнеров и архитекторов
        </h1>

        <div className="w-full text-[#333] font-['Open_Sans',_Helvetica,_Arial,_sans-serif] text-[15px] leading-[1.7] text-justify hyphens-auto mb-10">
          <p>
            Мы приглашаем вступить в число наших партнёров — строителей, специалистов по
            интерьерам пространств, архитекторов и дизайнеров, а также всех желающих.
            Сотрудничество с компанией «Фаерлайн» открывает для наших партнёров новые
            возможности и большие ресурсы для деятельности и развития. Для постоянных
            партнёров действует система скидок.
          </p>
        </div>

        <div className="flex justify-center mb-20">
          <Button
            onPress={onOpen}
            className="cursor-pointer bg-[#ff0000] text-white rounded-[4px] py-2 px-8 text-[18px] font-normal h-auto min-w-[200px] hover:bg-red-700 transition-colors font-['Open_Sans',_Helvetica,_Arial,_sans-serif]"
          >
            Стать партнёром
          </Button>
        </div>

        <h2 className="mx-auto max-w-5xl text-center text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight mb-12 font-['Raleway',_Helvetica,_Arial,_sans-serif] text-[#333] leading-snug">
          Преимущества сотрудничества с компанией «Фаерлайн»:
        </h2>

        <motion.section
          ref={advantagesRef}
          className="mx-auto max-w-5xl space-y-8 pb-8"
          initial="hidden"
          animate={advantagesInView ? 'visible' : 'hidden'}
          variants={container}
        >
          {COOPERATION_ADVANTAGES.map((item, index) => {
            /** нечётные пункты (2,4,6…): текст слева от цифры, картинка справа; чётные — наоборот */
            const fromRight = index % 2 === 1;
            const size = 168;
            const step = index + 1;

            const numberCircle = (
              <div
                className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#d4d4d4] font-['Open_Sans',_Helvetica,_Arial,_sans-serif] text-[17px] font-bold text-[#4a4a4a] md:col-start-2 md:row-start-1 md:justify-self-center"
                aria-hidden
              >
                {step}
              </div>
            );

            const imageBlock = (
              <div
                className={`flex shrink-0 justify-center md:row-start-1 md:w-full ${
                  fromRight
                    ? 'md:col-start-3 md:justify-start'
                    : 'md:col-start-1 md:justify-end'
                }`}
              >
                <div
                  className="relative rounded-full overflow-hidden bg-gray-200"
                  style={{ width: size, height: size }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes={`${size}px`}
                    priority={index === 0}
                  />
                </div>
              </div>
            );

            const textBlock = (
              <div
                className={`max-w-xl w-full md:row-start-1 md:w-full ${
                  fromRight
                    ? 'md:col-start-1 md:justify-self-end text-center md:text-right'
                    : 'md:col-start-3 md:justify-self-start text-center md:text-left'
                }`}
              >
                <h3 className="text-[20px] font-semibold text-[#333] mb-2 font-['Raleway',_Helvetica,_Arial,_sans-serif]">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-[13px] leading-relaxed font-['Open_Sans',_Helvetica,_Arial,_sans-serif]">
                  {item.body}
                </p>
              </div>
            );

            return (
              <motion.article
                key={item.src}
                className="flex w-full max-w-5xl flex-col items-center gap-4 md:mx-auto md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-x-6 md:gap-y-0 lg:gap-x-10"
                variants={fromRight ? slideInRight : slideInLeft}
                transition={transition}
              >
                {imageBlock}
                {numberCircle}
                {textBlock}
              </motion.article>
            );
          })}
        </motion.section>
      </div>
    </main>
  );
}
