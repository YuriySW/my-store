'use client';

import React from 'react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

export const AdvantagesSection = () => {
  return (
    <section className="py-20 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-20">
        {/* Левая часть: Изображение */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/images/advantages-fireplace.png"
            alt="Преимущества биокаминов"
            className="w-full max-w-[500px] h-auto object-contain mix-blend-multiply"
          />
        </div>

        {/* Правая часть: Текст */}
        <div className="flex flex-col items-start text-left">
          <h2 className="text-[28px] font-bold text-[#111] mb-8 font-['Open_Sans'] uppercase tracking-tight">
            Преимущества наших биокаминов
          </h2>
          
          <ul className="flex flex-col gap-4 mb-10 text-[#333] font-['Open_Sans'] text-[16px] leading-relaxed">
            <li>Собственное производство. Высокое качество и низкая цена</li>
            <li>Изготовим любой биокамин за 15 дней</li>
            <li>Не требует разрешений, прост в установке</li>
            <li>Пожаробезопасен, экологичен, мобилен</li>
            <li>Безопасная доставка по всей России</li>
            <li>Увеличенная гарантия 5 лет, нержавеющая сталь 2-3 мм</li>
          </ul>

          <Button 
            as={Link}
            href="/shop"
            className="bg-[#ff0000] text-white rounded-[4px] py-2 text-[18px] font-normal w-[200px] h-auto hover:bg-red-700 transition-colors text-center"
          >
            Перейти в каталог
          </Button>
        </div>
      </div>
    </section>
  );
};
