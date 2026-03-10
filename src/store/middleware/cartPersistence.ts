import type { Middleware } from '@reduxjs/toolkit';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../slices/cartSlice';

const CART_ACTIONS: Set<string> = new Set([
  addToCart.type,
  removeFromCart.type,
  updateQuantity.type,
  clearCart.type,
]);

export const cartPersistenceMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const type = action && typeof action === 'object' && 'type' in action ? (action as { type: string }).type : '';
  if (CART_ACTIONS.has(type) && typeof window !== 'undefined') {
    const cart = store.getState().cart;
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  return result;
};
