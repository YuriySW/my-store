'use client';

import React from 'react';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

export default function ContactsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-20">
        <h1 className="text-4xl font-bold uppercase tracking-tighter mb-10">Контакты</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-600">
          <div>
            <p className="mb-4"><strong>Телефон:</strong> +7 (912) 225 24 42</p>
            <p className="mb-4"><strong>Email:</strong> info@fireline.pro</p>
            <p className="mb-4"><strong>Адрес:</strong> г. Екатеринбург, ул. Примерная, 123</p>
          </div>
          <div>
            <p>Мы работаем ежедневно с 9:00 до 21:00</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
