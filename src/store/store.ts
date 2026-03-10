import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import { cartPersistenceMiddleware } from './middleware/cartPersistence';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartPersistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
