'use client';

import React from 'react';
import { Wrench, RussianRuble, Flame, Truck, LucideIcon } from 'lucide-react';

const iconProps = { size: 32 };

export const FeaturesBlock = () => {
  const features: {
    title: string;
    description: string;
    Icon: LucideIcon;
  }[] = [
    {
      title: 'Производство',
      description: 'Мы сами производим высококачественные камины и барбекю и даем гарантию 5 лет',
      Icon: Wrench,
    },
    {
      title: 'Цена',
      description: 'Мы используем качественные материалы и даем лучшее соотношение цена - качество',
      Icon: RussianRuble,
    },
    {
      title: 'На заказ',
      description: 'За 4 дня сделаем проект любой сложности и за 45 дней изготовим',
      Icon: Flame,
    },
    {
      title: 'Доставка',
      description: 'Безопасная доставка до вашего адреса, надежно отправим груз в любую точку России и СНГ',
      Icon: Truck,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.Icon;
            return (
            <div key={index} className="flex flex-col items-center text-center gap-6">
              <div
                className="w-20 h-20 [perspective:1000px] cursor-pointer"
                style={{ perspective: 1000 }}
              >
                <div
                  className="relative w-full h-full transition-transform duration-500 ease-in-out hover:[transform:rotateY(180deg)]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    className="absolute inset-0 rounded-full bg-[#111] flex items-center justify-center shadow-xl"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <Icon {...iconProps} className="text-white" />
                  </div>
                  <div
                    className="absolute inset-0 rounded-full bg-white flex items-center justify-center shadow-xl ring-2 ring-[#111]"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <Icon {...iconProps} className="text-[#111]" strokeWidth={2.5} />
                  </div>
                </div>
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
            );
          })}
        </div>
      </div>
    </section>
  );
};
