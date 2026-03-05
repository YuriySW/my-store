'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { NextUIProvider } from '@nextui-org/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </Provider>
  );
}
