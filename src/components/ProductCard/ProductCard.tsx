'use client';

import React from 'react';
import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/store/slices/cartSlice';
import { RootState } from '@/store/store';
import type { Product } from '@/types/catalog';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some(item => item.id === product.id);

  const handleCardClick = () => {
    router.push(`/product/${product.slug}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className="flex flex-col bg-white">
        {/* Кликабельная область карточки (переход в товар) */}
        <button
          type="button"
          onClick={handleCardClick}
          className="flex flex-col text-left cursor-pointer"
        >
          {/* Изображение товара */}
          <div className="bg-[#f5f5f5] aspect-square overflow-hidden flex items-center justify-center p-6 mb-4 rounded-sm relative">
            <img
              src={product.images?.[0] || '/images/placeholder.png'}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Информация о товаре (кроме кнопки) */}
          <div className="flex flex-col gap-1 px-1">
            <h3 className="text-center font-['Raleway',_sans-serif] uppercase text-[13px] font-semibold tracking-[1px] text-[#2d2d2d] mt-[5px] mb-[5px] line-clamp-1">
              {product.name}
            </h3>
            
            {/* Характеристики на превью */}
            {product.characteristics && product.characteristics.length > 0 && (
              <div className="flex flex-col items-center mb-[10px]">
                {product.characteristics.slice(0, 2).map((char, idx) => (
                  <span key={idx} className="text-[11px] text-gray-400 uppercase tracking-wider font-['Raleway']">
                    {char.key}: {char.value}
                  </span>
                ))}
              </div>
            )}

            <p className="text-center text-[16px] font-bold text-black mb-[20px] font-['Open_Sans']">
              {product.price.toLocaleString('ru-RU')} ₽
            </p>
          </div>
        </button>

        {/* Кнопка добавления в корзину — вне кликабельной области карточки */}
        <div className="flex flex-col gap-1 px-1">
          <Button
            onPress={() => {
              if (!isInCart) {
                dispatch(addToCart(product));
              }
            }}
            isDisabled={isInCart}
            className={`w-full rounded-lg h-[45px] sm:h-[59px] px-4 text-[12px] font-bold uppercase tracking-[0.1em] transition-all duration-300 flex items-center justify-center gap-2 ${
              isInCart 
                ? "bg-gray-200 text-gray-500 cursor-default" 
                : "bg-black text-white hover:bg-red-600"
            }`}
          >
            {isInCart ? "Товар в корзине" : <><ShoppingCart size={16} /> В корзину</>}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
