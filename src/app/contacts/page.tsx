'use client';

import React from 'react';

export default function ContactsPage() {
  return (
    <main className="max-w-7xl mx-auto w-full px-6 py-20">
      <h1 className="text-4xl font-bold uppercase tracking-tighter mb-10 text-gray-400">Контакты</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-600">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-1">Телефон</p>
            <a href="tel:+73432002883" className="text-xl font-medium hover:text-red-600 transition-colors">+7 343 200 28 83</a>
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-1">WhatsApp / Viber</p>
            <a href="tel:+79122252442" className="text-xl font-medium hover:text-red-600 transition-colors">+7 912 225 24 42</a>
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-1">Email</p>
            <a href="mailto:domkaminov@mail.ru" className="text-xl font-medium hover:text-red-600 transition-colors">domkaminov@mail.ru</a>
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-1">Адрес</p>
            <p className="text-xl font-medium">г. Екатеринбург, ул. Титова, 33А</p>
          </div>
        </div>
        <div className="bg-gray-50 p-8 rounded-lg border border-divider">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">График работы</p>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between border-b border-divider pb-2">
              <span>Понедельник - Воскресенье</span>
              <span className="font-bold text-black">11:00 - 19:00</span>
            </div>
            <p className="text-sm text-gray-500 mt-4 italic">Без перерывов и выходных</p>
          </div>
        </div>
      </div>
    </main>
  );
}
