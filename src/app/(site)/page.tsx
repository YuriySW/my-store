'use client';

import React from 'react';
import Link from 'next/link';
import { AdvantagesSection } from '@/components/UI/AdvantagesSection';
import { FeaturesBlock } from '@/components/UI/FeaturesBlock';
import { useCategories } from '@/hooks/useCategories';

export default function Home() {
  const { categories } = useCategories();

  return (
    <main className="text-black">
      {/* Hero Section */}
      <section className="relative w-full bg-white py-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-center items-center">
          <img
            src="/images/hero-fireplace.jpg"
            alt="Биокамин Fireline"
            className="w-full h-auto object-contain scale-110"
          />
        </div>
      </section>

      {/* Centered Description */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-['Open_Sans',_Helvetica,_Arial,_sans-serif] text-[16px] font-normal leading-[1.618] text-[#333]">
            Биокамины Fireline. Производство биокаминов премиум качества по ценам производителя. Изготовление биокаминов на заказ по вашим размерам
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.length > 0 ? categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.slug}`} className="group">
              <div className="bg-[#f5f5f5] p-8 mb-0 overflow-hidden flex items-center justify-center h-[250px]">
                <img
                  src={cat.image || '/images/placeholder.png'}
                  alt={cat.name}
                  className="group-hover:scale-110 transition-transform duration-500 object-contain h-full"
                />
              </div>
              <h3 className="text-center font-['Raleway',_sans-serif] uppercase text-[13px] font-semibold tracking-[1px] text-[#2d2d2d] mt-[5px] mb-[20px] group-hover:text-red-600 transition-colors">
                {cat.name}
              </h3>
            </Link>
          )) : (
            <div className="col-span-full text-center text-gray-400">Загрузка категорий...</div>
          )}
        </div>
      </section>

      <AdvantagesSection />
      <FeaturesBlock />
    </main>
  );
}
