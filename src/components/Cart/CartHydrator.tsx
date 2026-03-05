'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initCart } from '@/store/slices/cartSlice';

export const CartHydrator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          dispatch(initCart(parsed));
        } catch (e) {
          console.error('Ошибка при загрузке корзины из localStorage:', e);
        }
      }
    }
  }, [dispatch]);

  return null;
};
