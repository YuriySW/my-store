'use client';

import {useState, useRef} from 'react';
import {Button, useDisclosure} from '@nextui-org/react';
import {ShoppingCart, Phone, ChevronLeft, ChevronRight} from 'lucide-react';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '@/store/slices/cartSlice';
import {CallbackModal} from '@/components/UI/CallbackModal';
import {RootState} from '@/store/store';
import Link from 'next/link';
import type {Product} from '@/types/catalog';

interface ProductClientProps {
  product: Product & {_id?: string};
}

const THUMBNAILS_VISIBLE = 4;

export default function ProductClient({product}: ProductClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [thumbnailStart, setThumbnailStart] = useState(0);
  type TabId = 'description' | 'details' | 'reviews' | 'video' | 'drawing' | 'instructions';
  const [activeTab, setActiveTab] = useState<TabId>('description');
  const images = product.images ?? [];
  const hasManyImages = images.length > THUMBNAILS_VISIBLE;
  const dispatch = useDispatch();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const touchStartXRef = useRef<number | null>(null);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const productId = product._id ?? product.id;
  const isInCart = cartItems.some((item) => item.id === productId);

  const handleAddToCart = () => {
    dispatch(addToCart({...product, id: productId}));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextThumbnails = () => {
    setThumbnailStart((prev) => Math.min(prev + THUMBNAILS_VISIBLE, images.length - THUMBNAILS_VISIBLE));
  };

  const prevThumbnails = () => {
    setThumbnailStart((prev) => Math.max(0, prev - THUMBNAILS_VISIBLE));
  };

  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <CallbackModal isOpen={isOpen} onOpenChange={onOpenChange} productName={product.name} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

      {/* Левая колонка: Слайдер изображений */}
      <div className="flex flex-col gap-6">
        <div
          className="relative bg-[#f5f5f5] p-4 md:p-10 flex items-center justify-center rounded-sm min-h-[400px] group"
          onTouchStart={(e) => {
            if (images.length <= 1) return;
            touchStartXRef.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (images.length <= 1) return;
            if (touchStartXRef.current == null) return;
            const deltaX = e.changedTouches[0]?.clientX - touchStartXRef.current;
            touchStartXRef.current = null;
            if (Math.abs(deltaX) < 40) return;
            if (deltaX < 0) {
              nextImage();
            } else {
              prevImage();
            }
          }}
        >
          <img
            src={product.images?.[currentImageIndex]}
            alt={product.name}
            className="w-full h-auto max-h-[600px] object-contain mix-blend-multiply transition-all duration-500"
          />

          {product.images?.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 max-md:opacity-100 transition-opacity hover:bg-white text-black"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 max-md:opacity-100 transition-opacity hover:bg-white text-black"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Правая колонка: Информация */}
      <div className="flex flex-col">
        <nav className="flex gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-8 font-bold">
          <Link href="/" className="hover:text-black transition-colors text-gray-400">
            Главная
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black transition-colors text-gray-400">
            Каталог
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.category}</span>
        </nav>

        <h1 className="font-['Raleway',_sans-serif] text-[36px] font-bold leading-[1.2] text-left normal-case text-[#333] mb-6">
          {product.name}
        </h1>

        <p className="text-3xl md:text-4xl font-bold text-black mb-10">
          {product.price?.toLocaleString('ru-RU')} ₽
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button
            onPress={handleAddToCart}
            isDisabled={isInCart}
            className={`flex-1 rounded-lg h-[69px] sm:h-[55px] px-4 py-[7px] text-[13px] font-bold uppercase tracking-[0.15em] transition-all duration-300 group flex items-center justify-center ${
              isInCart
                ? 'bg-gray-200 text-gray-500 cursor-default'
                : 'bg-black text-white hover:bg-red-600'
            }`}
            startContent={
              !isInCart && (
                <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
              )
            }
          >
            {isInCart ? 'Товар в корзине' : 'В корзину'}
          </Button>
          <Button
            onPress={onOpen}
            variant="bordered"
            className="flex-1 border-2 border-black text-black py-[7px] rounded-lg h-[69px] sm:h-[55px] px-4 text-[13px] font-bold uppercase tracking-[0.15em] hover:bg-black hover:text-white transition-all duration-300 group flex items-center justify-center"
            startContent={
              <Phone size={20} className="group-hover:rotate-12 transition-transform" />
            }
          >
            Заказать звонок
          </Button>
        </div>

        <div className="relative">
          {hasManyImages && (
            <>
              <button
                type="button"
                onClick={prevThumbnails}
                disabled={thumbnailStart === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-black hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Предыдущие фото"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={nextThumbnails}
                disabled={thumbnailStart >= images.length - THUMBNAILS_VISIBLE}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-black hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Следующие фото"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          <div className="grid grid-cols-4 gap-4">
            {(hasManyImages ? images.slice(thumbnailStart, thumbnailStart + THUMBNAILS_VISIBLE) : images).map((img: string, idx: number) => {
              const realIndex = hasManyImages ? thumbnailStart + idx : idx;
              return (
                <div
                  key={realIndex}
                  onClick={() => setCurrentImageIndex(realIndex)}
                  className={`bg-[#f5f5f5] p-2 cursor-pointer transition-all border-2 rounded-sm ${currentImageIndex === realIndex ? 'border-black' : 'border-transparent hover:border-gray-200'}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${realIndex + 1}`}
                    className="w-full h-20 md:h-28 object-contain mix-blend-multiply"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>

      {/* Блок вкладок внизу: белый фон; под ним тоже белый до низа страницы */}
      <div className="w-screen relative left-1/2 -translate-x-1/2 bg-white border-t border-gray-100 pt-10 pb-16 flex-1 min-h-[30vh]">
        <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-wrap gap-4 md:gap-6 border-b border-gray-100 mb-8 overflow-x-auto pb-1">
          {(
            [
              ['description', 'Описание'],
              ['details', 'Детали'],
              ['reviews', 'Отзывы (0)'],
              ['video', 'Видео'],
              ['drawing', 'Чертеж'],
              ['instructions', 'Инструкция'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`pb-4 border-b-2 font-bold uppercase tracking-[0.2em] text-[12px] transition-all whitespace-nowrap ${
                activeTab === id ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-black'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="text-gray-600 leading-relaxed text-[16px] font-['Open_Sans'] max-w-4xl animate-in fade-in duration-300 min-h-[120px]">
          {activeTab === 'description' && (
            <div className="whitespace-pre-line">{product.description || 'Описание товара скоро появится.'}</div>
          )}
          {activeTab === 'details' && (
            <div className="space-y-6">
              {product.characteristics && product.characteristics.length > 0 && (
                <div className="flex flex-col gap-2">
                  {product.characteristics.map((char: any, idx: number) => (
                    <p key={idx} className="text-gray-700 text-[14px] font-medium">
                      <span className="uppercase tracking-wider text-gray-500">{char.key}:</span>{' '}
                      <span className="text-black">{char.value}</span>
                    </p>
                  ))}
                </div>
              )}
              {product.details?.trim() && product.details.trim() !== 'Детали' && (
                <div className="whitespace-pre-line">{product.details}</div>
              )}
              {(!product.details?.trim() || product.details.trim() === 'Детали') && !product.characteristics?.length && (
                <div className="text-gray-500">Детальная информация скоро появится.</div>
              )}
            </div>
          )}
          {activeTab === 'reviews' && (
            <p className="text-gray-500">Пока нет отзывов. Будьте первым, кто оставит отзыв после покупки.</p>
          )}
          {activeTab === 'video' && (
            <div className="aspect-video max-w-2xl">
              {product.video ? (
                (() => {
                  const url = product.video;
                  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
                  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
                  if (ytMatch) {
                    return (
                      <iframe
                        src={`https://www.youtube.com/embed/${ytMatch[1]}`}
                        title="Видео"
                        className="w-full h-full rounded-sm"
                        allowFullScreen
                      />
                    );
                  }
                  if (vimeoMatch) {
                    return (
                      <iframe
                        src={`https://player.vimeo.com/video/${vimeoMatch[1]}`}
                        title="Видео"
                        className="w-full h-full rounded-sm"
                        allowFullScreen
                      />
                    );
                  }
                  return <a href={url} target="_blank" rel="noopener noreferrer" className="text-red-600 underline">Смотреть видео</a>;
                })()
              ) : (
                <p className="text-gray-500">Видео для этого товара пока не добавлено.</p>
              )}
            </div>
          )}
          {activeTab === 'drawing' && (
            <div>
              {product.drawing ? (
                product.drawing.match(/\.(pdf|PDF)$/) ? (
                  <a
                    href={product.drawing}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-red-600 font-medium hover:underline"
                  >
                    Скачать чертеж (PDF)
                  </a>
                ) : (
                  <a href={product.drawing} target="_blank" rel="noopener noreferrer" className="block">
                    <img src={product.drawing} alt="Чертеж" className="max-w-full h-auto rounded-sm border border-gray-200" />
                  </a>
                )
              ) : (
                <p className="text-gray-500">Чертеж для этого товара пока не добавлен.</p>
              )}
            </div>
          )}
          {activeTab === 'instructions' && (
            <div>
              {product.instructions ? (
                product.instructions.startsWith('http') ? (
                  <a
                    href={product.instructions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-red-600 font-medium hover:underline"
                  >
                    Скачать инструкцию (PDF)
                  </a>
                ) : (
                  <div className="whitespace-pre-line">{product.instructions}</div>
                )
              ) : (
                <p className="text-gray-500">Инструкция для этого товара пока не добавлена.</p>
              )}
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
