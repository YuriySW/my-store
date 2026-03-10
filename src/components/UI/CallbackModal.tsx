'use client';

import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react';
import { Phone, User, CheckCircle2, X } from 'lucide-react';

interface CallbackModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  productName?: string;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({
  isOpen,
  onOpenChange,
  productName,
}) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, productName }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Ошибка отправки');
      }
      setStatus('success');
    } catch (e) {
      setStatus('idle');
      console.error(e);
    }
  };

  const handleClose = (onClose: () => void) => {
    onClose();
    setTimeout(() => {
      setStatus('idle');
      setName('');
      setPhone('');
    }, 300);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange} 
      placement="center"
      backdrop="blur"
      hideCloseButton
      classNames={{
        base: "bg-white rounded-2xl shadow-2xl max-w-[400px]",
        header: "p-0",
        body: "p-0",
        footer: "p-0",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <div className="relative overflow-hidden">
            {/* Кнопка закрытия */}
            <button 
              onClick={() => handleClose(onClose)}
              className="absolute right-4 top-4 z-20 text-gray-400 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>

            {status === 'success' ? (
              <div className="p-10 flex flex-col items-center text-center gap-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={48} className="text-green-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black mb-2 font-['Open_Sans']">Заявка принята!</h3>
                  <p className="text-gray-500 leading-relaxed font-['Open_Sans']">
                    Спасибо, {name}! Мы свяжемся с вами в течение 15 минут.
                  </p>
                </div>
                <Button 
                  onPress={() => handleClose(onClose)} 
                  className="w-full bg-black text-white h-[50px] rounded-xl font-bold uppercase tracking-widest mt-4"
                >
                  Отлично
                </Button>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="p-8 pb-4">
                  <h3 className="text-2xl font-bold text-black uppercase tracking-tighter mb-2 font-['Open_Sans']">Заказать звонок</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-['Open_Sans']">
                    {productName 
                      ? `Оставьте данные для уточнения деталей по товару "${productName}"`
                      : 'Оставьте ваш номер телефона, и наш менеджер свяжется с вами.'}
                  </p>
                </div>

                <div className="p-8 pt-4 flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] uppercase tracking-widest font-bold text-gray-400 ml-1 font-['Open_Sans']">Ваше имя</label>
                    <Input
                      placeholder="Иван"
                      radius="lg"
                      value={name}
                      onValueChange={setName}
                      classNames={{
                        input: "text-black font-medium placeholder:text-gray-300",
                        inputWrapper: [
                          "bg-gray-50",
                          "border-gray-100",
                          "group-data-[focus=true]:border-black",
                          "group-data-[focus=true]:bg-white",
                          "!transition-all",
                          "h-[55px]",
                          "shadow-none",
                        ].join(" "),
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] uppercase tracking-widest font-bold text-gray-400 ml-1 font-['Open_Sans']">Телефон</label>
                    <Input
                      placeholder="+7 (___) ___-__-__"
                      radius="lg"
                      value={phone}
                      onValueChange={setPhone}
                      classNames={{
                        input: "text-black font-medium placeholder:text-gray-300",
                        inputWrapper: [
                          "bg-gray-50",
                          "border-gray-100",
                          "group-data-[focus=true]:border-black",
                          "group-data-[focus=true]:bg-white",
                          "!transition-all",
                          "h-[55px]",
                          "shadow-none",
                        ].join(" "),
                      }}
                    />
                  </div>

                  <Button
                    className="w-full bg-black text-white h-[60px] rounded-xl font-bold uppercase tracking-[0.15em] text-[13px] mt-4 shadow-xl shadow-black/10 hover:bg-red-600 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                    isLoading={status === 'loading'}
                    onPress={handleSubmit}
                    isDisabled={!phone || !name}
                  >
                    Жду звонка
                  </Button>
                  
                  <p className="text-[10px] text-center text-gray-400 px-4 font-['Open_Sans']">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};
