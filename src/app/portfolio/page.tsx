'use client';

import React from 'react';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-20">
        <h1 className="text-4xl font-bold uppercase tracking-tighter mb-10">Портфолио</h1>
        <p className="text-gray-600">Раздел находится в разработке. Здесь скоро появятся наши реализованные проекты.</p>
      </main>
      <Footer />
    </div>
  );
}
