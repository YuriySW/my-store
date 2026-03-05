'use client';

import React from 'react';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

export default function DeliveryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-20">
        <h1 className="text-4xl font-bold uppercase tracking-tighter mb-10">Доставка</h1>
        <p className="text-gray-600">Осуществляем бережную доставку биокаминов по всей России и странам СНГ.</p>
      </main>
      <Footer />
    </div>
  );
}
