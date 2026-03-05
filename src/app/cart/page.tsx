'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import { Button, Card, CardBody, Divider } from '@nextui-org/react';
import { Trash2, Minus, Plus, ShoppingBag, Phone } from 'lucide-react';
import Link from 'next/link';
import { CallbackModal } from '@/components/UI/CallbackModal';
import { useDisclosure } from '@nextui-org/react';

export default function CartPage() {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  if (items.length === 0) {
    return (
      <main className="flex-grow flex flex-col items-center justify-center gap-6 p-6 min-h-[60vh]">
        <ShoppingBag size={100} className="text-gray-400" />
        <h1 className="text-3xl font-bold text-gray-400">Ваша корзина пуста</h1>
        <p className="text-gray-400">Посмотрите наш каталог, чтобы найти что-то интересное.</p>
        <Button as={Link} href="/shop" color="default" variant="bordered" size="lg" className="text-gray-400 border-gray-400">
          Перейти в каталог
        </Button>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto w-full px-6 py-12">
      <CallbackModal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        productName={`Заказ на сумму ${total.toLocaleString('ru-RU')} ₽`}
      />
      <h1 className="text-4xl font-bold mb-10 uppercase tracking-tighter text-black">Корзина</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {items.map((item, index) => (
            <Card key={item.id || index} shadow="sm" className="bg-white border border-divider">
              <CardBody className="flex flex-row gap-6 p-4 items-center">
                <div className="w-[120px] h-[120px] bg-[#f5f5f5] rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={item.images?.[0] || '/images/placeholder.png'}
                    alt={item.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="flex-grow flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-black">{item.name}</h3>
                  <p className="text-black font-bold">{item.price.toLocaleString('ru-RU')} ₽</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-divider rounded-lg bg-white">
                    <Button isIconOnly variant="light" size="sm" className="text-black" onPress={() => handleQuantityChange(item.id, item.quantity - 1)}>
                      <Minus size={16} />
                    </Button>
                    <span className="w-8 text-center text-black font-medium">{item.quantity}</span>
                    <Button isIconOnly variant="light" size="sm" className="text-black" onPress={() => handleQuantityChange(item.id, item.quantity + 1)}>
                      <Plus size={16} />
                    </Button>
                  </div>
                  <Button isIconOnly color="danger" variant="light" onPress={() => handleRemove(item.id)}>
                    <Trash2 size={20} />
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
          <Button variant="light" color="danger" className="self-start uppercase tracking-widest font-bold text-xs" onPress={() => dispatch(clearCart())}>
            Очистить корзину
          </Button>
        </div>
        <div className="flex flex-col gap-6">
          <Card shadow="sm" className="p-6 bg-white border border-divider">
            <h2 className="text-2xl font-bold mb-6 text-black">Итого</h2>
            <div className="flex justify-between mb-4">
              <span className="text-gray-500">Товары ({items.length})</span>
              <span className="text-black font-medium">{total.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-500">Доставка</span>
              <span className="text-success font-medium">Бесплатно</span>
            </div>
            <Divider className="my-4 bg-divider" />
            <div className="flex justify-between mb-8">
              <span className="text-xl font-bold text-black">К оплате</span>
              <span className="text-xl font-bold text-black">{total.toLocaleString('ru-RU')} ₽</span>
            </div>
            <Button 
              onPress={onOpen}
              className="w-full bg-black text-white rounded-lg h-[55px] text-[13px] font-bold uppercase tracking-[0.15em] hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2"
              startContent={<Phone size={20} />}
            >
              Оформить заказ
            </Button>
          </Card>
        </div>
      </div>
    </main>
  );
}
