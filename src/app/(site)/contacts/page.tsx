'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

// ул. Титова, 33А, Екатеринбург — координаты 56.7715, 60.6145
const YANDEX_MAP_EMBED_URL =
  'https://yandex.ru/map-widget/v1/?ll=60.6145%2C56.7715&z=17&pt=60.6145,56.7715&l=map';

export default function ContactsPage() {
  return (
    <main className="w-full bg-[#f5f5f5] min-h-screen">
      <div className="max-w-[1200px] mx-auto w-full px-4 py-20">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
        {/* Левая колонка: текст и контакты */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Магазины</h1>
          <p className="text-gray-600 leading-relaxed mb-8">
            Компания ДомКаминов является эксклюзивным представителем завода Fireline. Наш основной офис
            находится в г. Екатеринбурге. Обязательно приходите к нам на чашку кофе. Совместно
            обсудим ваши проекты и предложим рекомендации! Осуществляем профессиональный монтаж
            теплового оборудования уже более 15 лет.
          </p>

          <div className="flex flex-col gap-5">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-red-600">
                <MapPin size={22} strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-0.5">
                  Адрес
                </p>
                <p className="text-gray-900">
                  620085, г. Екатеринбург, ул. Титова, 33А
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-red-600">
                <Phone size={22} strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-0.5">
                  Телефон
                </p>
                <a
                  href="tel:+73432002883"
                  className="text-gray-900 hover:text-red-600 transition-colors"
                >
                  +7 (343) 200-28-83
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-red-600">
                <Mail size={22} strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-0.5">
                  E-mail
                </p>
                <a
                  href="mailto:domkaminov@mail.ru"
                  className="text-gray-900 hover:text-red-600 transition-colors"
                >
                  domkaminov@mail.ru
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-red-600">
                <Clock size={22} strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-0.5">
                  Режим работы
                </p>
                <div className="text-gray-900 space-y-0.5">
                  <p>Пн-Пт: с 11:00 до 19:00</p>
                  <p>Сб: с 12:00 до 18:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Правая колонка: Яндекс.Карта */}
        <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[520px] rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
          <iframe
            src={YANDEX_MAP_EMBED_URL}
            width="100%"
            height="100%"
            className="absolute inset-0 w-full h-full border-0"
            title="Яндекс.Карта — ДомКаминов, ул. Титова, 33А"
            allowFullScreen
          />
        </div>
      </section>
      </div>
    </main>
  );
}
