'use client';

import React, { useState } from 'react';
import { Button, useDisclosure } from '@nextui-org/react';
import { ShoppingCart, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { CallbackModal } from '@/components/UI/CallbackModal';
import { RootState } from '@/store/store';
import Link from 'next/link';

export default function ProductClient({ product }: { product: any }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'details'>('description');
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some(item => item.id === product.id || item.id === product._id);

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      id: product._id || product.id
    }));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
      <CallbackModal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        productName={product.name} 
      />
      
      {/* Левая колонка: Слайдер изображений */}
      <div className="flex flex-col gap-6">
        <div className="relative bg-[#f9f9f9] p-4 md:p-10 flex items-center justify-center rounded-sm min-h-[400px] group">
          <img
            src={product.images?.[currentImageIndex]}
            alt={product.name}
            className="w-full h-auto max-h-[600px] object-contain mix-blend-multiply transition-all duration-500"
          />
          
          {product.images?.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-black"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-black"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {product.images?.map((img: string, idx: number) => (
            <div 
              key={idx} 
              onClick={() => setCurrentImageIndex(idx)}
              className={`bg-[#f9f9f9] p-2 cursor-pointer transition-all border-2 rounded-sm ${currentImageIndex === idx ? 'border-black' : 'border-transparent hover:border-gray-200'}`}
            >
              <img
                src={img}
                alt={`${product.name} ${idx + 1}`}
                className="w-full h-20 md:h-28 object-contain mix-blend-multiply"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Правая колонка: Информация */}
      <div className="flex flex-col">
        <nav className="flex gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-8 font-bold">
          <Link href="/" className="hover:text-black transition-colors text-gray-400">Главная</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black transition-colors text-gray-400">Каталог</Link>
          <span>/</span>
          <span className="text-gray-900">{product.category}</span>
        </nav>

        <h1 className="font-['Raleway',_sans-serif] text-[36px] font-bold leading-[1.2] text-left normal-case text-[#333] mb-6">
          {product.name}
        </h1>

        {product.characteristics && product.characteristics.length > 0 && (
          <div className="flex flex-col gap-1 mb-8">
            {product.characteristics.map((char: any, idx: number) => (
              <p key={idx} className="text-gray-500 text-[13px] uppercase tracking-widest font-medium">
                {char.key}: <span className="text-black">{char.value}</span>
              </p>
            ))}
          </div>
        )}
        
        <p className="text-3xl md:text-4xl font-bold text-black mb-10">
          {product.price?.toLocaleString('ru-RU')} ₽
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button
            onPress={handleAddToCart}
            isDisabled={isInCart}
            className={`flex-1 rounded-lg h-[55px] text-[13px] font-bold uppercase tracking-[0.15em] transition-all duration-300 group flex items-center justify-center ${
              isInCart 
                ? "bg-gray-200 text-gray-500 cursor-default" 
                : "bg-black text-white hover:bg-red-600"
            }`}
            startContent={!isInCart && <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />}
          >
            {isInCart ? "Товар в корзине" : "В корзину"}
          </Button>
          <Button
            onPress={onOpen}
            variant="bordered"
            className="flex-1 border-2 border-black text-black rounded-lg h-[55px] text-[13px] font-bold uppercase tracking-[0.15em] hover:bg-black hover:text-white transition-all duration-300 group flex items-center justify-center"
            startContent={<Phone size={20} className="group-hover:rotate-12 transition-transform" />}
          >
            Заказать звонок
          </Button>
        </div>

        <div className="border-t border-gray-100 pt-10">
          <div className="flex gap-10 border-b border-gray-100 mb-8">
            <button 
              onClick={() => setActiveTab('description')}
              className={`pb-4 border-b-2 font-bold uppercase tracking-[0.2em] text-[12px] transition-all ${activeTab === 'description' ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-black'}`}
            >
              Описание
            </button>
            <button 
              onClick={() => setActiveTab('details')}
              className={`pb-4 border-b-2 font-bold uppercase tracking-[0.2em] text-[12px] transition-all ${activeTab === 'details' ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-black'}`}
            >
              Детали
            </button>
            <button className="pb-4 text-gray-300 font-bold uppercase tracking-[0.2em] text-[12px] cursor-not-allowed">Отзывы (0)</button>
          </div>
          <div className="text-gray-600 leading-relaxed text-[16px] font-['Open_Sans'] whitespace-pre-line max-w-xl animate-in fade-in duration-500">
            {activeTab === 'description' 
              ? (product.description || 'Описание товара скоро появится.')
              : (product.details || 'Детальная информация скоро появится.')
            }
          </div>
        </div>
      </div>
    </div>
  );
}
