'use client';

import React from 'react';
import { Wrench, RussianRuble, Flame, Truck } from 'lucide-react';

export const FeaturesBlock = () => {
  const features = [
    {
      title: 'Производство',
      description: 'Мы сами производим высококачественные биокамины и даем гарантию 5 лет',
      icon: <Wrench size={32} className="text-white" />,
    },
    {
      title: 'Цена',
      description: 'Мы используем качественные материалы и даем лучшее соотношение цена - качество',
      icon: <RussianRuble size={32} className="text-white" />,
    },
    {
      title: 'На заказ',
      description: 'За 2 дня сделаем проект любой сложности и за 15 изготовим',
      icon: <Flame size={32} className="text-white" />,
    },
    {
      title: 'Доставка',
      description: 'Бесплатная доставка до вашего адреса, надежно отправим груз в любую точку России',
      icon: <Truck size={32} className="text-white" />,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-6">
              <div className="w-20 h-20 bg-[#111] rounded-full flex items-center justify-center shadow-xl">
                {feature.icon}
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-[20px] font-bold text-[#111] font-['Open_Sans']">
                  {feature.title}
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed font-['Open_Sans'] max-w-[250px]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
