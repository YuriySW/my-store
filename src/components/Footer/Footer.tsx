'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link, Divider, Button, useDisclosure } from '@nextui-org/react';
import NextLink from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { CallbackModal } from '@/components/UI/CallbackModal';
import { FeaturesBlock } from '@/components/UI/FeaturesBlock';
import { AdvantagesSection } from '@/components/UI/AdvantagesSection';

const fadeInDown = {
  hidden: { opacity: 0, y: -36 },
  visible: { opacity: 1, y: 0 },
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const itemTransition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

/** Как t.me/…: веб/приложение Max. Своя ссылка профиля — в .env NEXT_PUBLIC_MAX_MESSENGER_URL */
const MAX_MESSENGER_HREF =
  process.env.NEXT_PUBLIC_MAX_MESSENGER_URL?.trim() || 'https://max.ru/@domkaminov66';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const socialLinks = [
    { 
      name: 'vk', 
      href: 'https://m.vk.com/dom_kaminov',
      content: (
        <img
          src="/images/vkw.png"
          alt="ВКонтакте"
          className="h-10 w-10 object-contain"
        />
      ),
    },
    { 
      name: 'instagram', 
      href: 'https://www.instagram.com/domkaminov?igsh=OXN5dzgzY2F3bTBq&utm_source=qr',
      svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 3.174 4.919 4.851.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 1.679-1.667 4.705-4.92 4.852-1.265.058-1.645.069-4.849.069-3.205 0-3.584-.012-4.849-.069-3.254-.148-4.773-3.176-4.921-4.852-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.584.069-4.849.149-1.679 1.665-4.705 4.92-4.851 1.265-.058 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-5.838 2.435-5.838 5.838s2.435 5.838 5.838 5.838 5.838-2.435 5.838-5.838-2.435-5.838-5.838-5.838zm0 9.512c-2.029 0-3.673-1.645-3.673-3.674s1.644-3.673 3.673-3.673 3.673 1.644 3.673 3.673-1.644 3.674-3.673 3.674zm5.272-10.29c.73 0 1.322-.592 1.322-1.322 0-.73-.592-1.322-1.322-1.322s-1.322.592-1.322 1.322c0 .73.592 1.322 1.322 1.322z"/>
    },
    { 
      name: 'youtube', 
      href: 'https://www.youtube.com/channel/UCEEXpZmHXbkoyj2NeOM_QyA',
      svg: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    },
    { 
      name: 'telegram', 
      href: 'https://t.me/domkaminov66',
      svg: <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.891 8.221l-1.97 9.28c-.145.658-.537.818-1.084.482l-3-2.21-1.446 1.394c-.16.16-.294.294-.603.294l.215-3.052 5.554-5.019c.242-.214-.053-.333-.376-.136l-6.866 4.32-2.962-.924c-.644-.203-.658-.644.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
    },
    {
      name: 'max',
      href: MAX_MESSENGER_HREF,
      content: (
        <img
          src="/images/Max_log.png"
          alt="Max"
          className="h-7 w-7 object-contain"
        />
      ),
    },
    { 
      name: 'whatsapp', 
      href: 'https://api.whatsapp.com/send?phone=79122252442',
      svg: <path d="M17.472 14.382c-.301-.15-1.767-.872-2.036-.969-.27-.099-.463-.147-.66.15-.197.297-.767.969-.94 1.164-.173.199-.347.223-.647.075-.3-.15-1.263-.465-2.403-1.516-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.301-.347.451-.52.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.52-.075-.148-.66-1.592-.905-2.187-.239-.576-.48-.498-.66-.503-.171-.004-.367-.004-.563-.004-.195 0-.514.074-.783.422-.268.347-1.024 1.001-1.024 2.442 0 1.44 1.049 2.832 1.197 3.03.149.198 2.064 3.15 5.003 4.415.699.301 1.244.481 1.67.617.702.223 1.341.191 1.846.117.564-.083 1.767-.465 2.017-1.144.25-.678.25-1.263.174-1.382-.076-.118-.278-.199-.579-.349zM12 24c-2.162 0-4.273-.562-6.126-1.625L0 24l1.658-6.097C.599 16.05 0 14.058 0 12 0 5.383 5.383 0 12 0s12 5.383 12 12-5.383 12-12 12z"/>
    },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      <CallbackModal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
      />
      
      {/* Блок контактов */}
      <div
        ref={ref}
        className="relative py-20 px-6 flex flex-col items-center text-center bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/images/footer-image.png')",
        }}
      >
        <motion.div
          className="flex flex-col items-center w-full"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={container}
        >
        <motion.div variants={fadeInDown} transition={itemTransition}>
          <h2 className="text-4xl font-light mb-2 font-['Open_Sans']">Свяжитесь с нами</h2>
          <p className="text-gray-400 mb-12 font-['Open_Sans']">любым удобным способом</p>
        </motion.div>
        <motion.div className="w-20 h-[1px] bg-gray-600 mb-16" variants={fadeInDown} transition={itemTransition} />

        <motion.div
          className="max-w-[1200px] mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 md:gap-12 mb-16"
          variants={fadeInDown}
          transition={itemTransition}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <Phone size={28} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-400 text-sm uppercase tracking-widest">телефон</span>
              <a href="tel:+73432002883" className="text-lg font-medium hover:text-red-500 transition-colors">+7 343 200 28 83</a>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <MapPin size={28} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-400 text-sm uppercase tracking-widest">адрес</span>
              <span className="text-lg font-medium leading-tight">г. Екатеринбург,<br />ул. Титова, 33А</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <Phone size={28} strokeWidth={1.5} className="rotate-12" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-400 text-sm uppercase tracking-widest">telegram / max</span>
              <a href="tel:+79122252442" className="text-lg font-medium hover:text-red-500 transition-colors">+7 912 225 24 42</a>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <Mail size={28} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-400 text-sm uppercase tracking-widest">email</span>
              <a href="mailto:domkaminov@mail.ru" className="text-lg font-medium hover:text-red-500 transition-colors">domkaminov@mail.ru</a>
            </div>
          </div>
        </motion.div>

        {/* Соцсети и кнопка */}
        <motion.div className="flex flex-col items-center gap-10" variants={fadeInDown} transition={itemTransition}>
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((social) => {
              const openInNewTab = /^https?:\/\//i.test(social.href);
              return (
              <a 
                key={social.name} 
                href={social.href}
                {...(openInNewTab
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="w-14 h-14 border border-white/30 rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 cursor-pointer transition-all group"
              >
                {social.svg ? (
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-7 h-7 fill-white transition-transform group-hover:scale-110"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {social.svg}
                  </svg>
                ) : (
                  <div className="text-white transition-transform group-hover:scale-110">
                    {social.content}
                  </div>
                )}
              </a>
            );
            })}
          </div>

          <Button 
            onPress={onOpen}
            className="bg-[#ff0000] text-white rounded-[4px] py-2 text-[18px] font-normal w-[200px] h-auto hover:bg-red-700 transition-colors"
          >
            Обратный звонок
          </Button>
        </motion.div>

        {/* Нижнее меню */}
        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-light text-gray-300"
          variants={fadeInDown}
          transition={itemTransition}
        >
          <NextLink href="/about" className="text-inherit hover:text-white transition-colors">О компании</NextLink>
          <NextLink href="/designers" className="text-inherit hover:text-white transition-colors">Дизайнерам</NextLink>
          <NextLink href="/news" className="text-inherit hover:text-white transition-colors">Новости</NextLink>
          <NextLink href="/portfolio" className="text-inherit hover:text-white transition-colors">Портфолио</NextLink>
          <NextLink href="/payment" className="text-inherit hover:text-white transition-colors">Оплата</NextLink>
          <NextLink href="/delivery" className="text-inherit hover:text-white transition-colors">Доставка</NextLink>
          <NextLink href="/cooperation" className="text-inherit hover:text-white transition-colors">Сотрудничество</NextLink>
        </motion.div>
        </motion.div>
      </div>

      {/* Копирайт */}
      <div className="w-full bg-black/90 py-6 border-t border-white/5 text-center text-[11px] text-gray-500 uppercase tracking-[0.3em]">
        <p>© {currentYear} FIRELINE. Все права защищены.</p>
      </div>
    </footer>
  );
};
