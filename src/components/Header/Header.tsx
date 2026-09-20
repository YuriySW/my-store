'use client';

import React, {useState, useEffect, useRef} from 'react';
import {ShoppingCart, Search, Phone, Menu, X, ChevronRight} from 'lucide-react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '@/store/store';
import {fetchProducts} from '@/store/slices/productsSlice';
import NextLink from 'next/link';
import {Input} from '@nextui-org/react';
import {useRouter, usePathname} from 'next/navigation';
import {useCategories} from '@/hooks/useCategories';
import type {Product} from '@/types/catalog';
import {productImageUrl} from '@/lib/sanityImage';

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const products = useSelector((state: RootState) => state.products.items);
  const {categories} = useCategories();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const CATALOG_CLOSE_DELAY_MS = 1200;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isCatalogHoverLocked, setIsCatalogHoverLocked] = useState(false);
  const [hoveredCatId, setHoveredCatId] = useState<string | null>(null);
  const catalogCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobileCatalogOpen, setIsMobileCatalogOpen] = useState(false);
  const [expandedMobileCategoryId, setExpandedMobileCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = products
        .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, products]);

  useEffect(() => {
    return () => {
      catalogCloseTimerRef.current && clearTimeout(catalogCloseTimerRef.current);
    };
  }, []);

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (searchRef.current && !searchRef.current.contains(target)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
      if (catalogRef.current && !catalogRef.current.contains(target)) {
        setIsCatalogOpen(false);
        setIsCatalogHoverLocked(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (slug: string) => {
    setIsSearchOpen(false);
    setIsMenuOpen(false);
    setSearchQuery('');
    router.push(`/product/${slug}`);
  };

  const handleCategoryClick = (slug: string) => {
    setIsCatalogOpen(false);
    setIsMobileCatalogOpen(false);
    setIsMenuOpen(false);
    router.push(`/category/${slug}`);
  };

  const menuItems = [
    {name: 'Каталог', href: '/shop', hasDropdown: true},
    {name: 'Портфолио', href: '/portfolio'},
    {name: 'Новости', href: '/news'},
    {name: 'Оплата', href: '/payment'},
    {name: 'Гарантия', href: '/warranty'},
    {name: 'Доставка', href: '/delivery'},
    {name: 'Сотрудничество', href: '/cooperation'},
    {name: 'Контакты', href: '/contacts'},
  ];

  return (
    <header className="w-full bg-white pt-4 min-[880px]:pt-8 pb-4 sticky top-0 z-50 border-b border-divider min-[880px]:border-none">
      <div className="max-w-[1200px] mx-auto px-4 relative" ref={searchRef}>
        {/* Top Row: Logo and Icons */}
        <div className="flex justify-between items-center mb-4 min-[880px]:mb-8">
          <div className="flex items-center min-[880px]:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#333] p-2">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          <div className="flex-1 flex justify-center min-[880px]:justify-start items-center">
            <NextLink href="/">
              <img
                src="/images/logo.png"
                alt="FIRELINE"
                className="w-[150px] min-[880px]:w-[190px] h-auto block"
              />
            </NextLink>
          </div>

          <div className="flex items-center gap-4 min-[880px]:gap-6">
            {/* Поиск (Desktop) */}
            <div className="hidden min-[880px]:relative min-[880px]:flex items-center">
              {isSearchOpen ? (
                <div className="absolute right-0 flex items-center animate-in slide-in-from-right-4 duration-300 z-50">
                  <Input
                    autoFocus
                    placeholder="Поиск камина..."
                    size="sm"
                    variant="bordered"
                    className="w-[300px] bg-white"
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    classNames={{
                      input: "text-[#333] font-['Open_Sans',_Helvetica,_Arial,_sans-serif]",
                      inputWrapper: 'border-[#divider] focus-within:!border-[#333]',
                    }}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="text-[#333] hover:text-red-600 transition-colors"
                >
                  <Search size={24} strokeWidth={1.5} />
                </button>
              )}
            </div>

            {/* Поиск (Mobile Toggle) */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="min-[880px]:hidden text-[#333] hover:text-red-600 transition-colors"
            >
              {isSearchOpen ? <X size={24} /> : <Search size={24} strokeWidth={1.5} />}
            </button>

            <NextLink
              href="/cart"
              className="relative text-[#333] hover:text-red-600 transition-colors"
            >
              <ShoppingCart size={24} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </NextLink>
          </div>
        </div>

        {/* Mobile Search Bar (Below Logo) */}
        {isSearchOpen && (
          <div className="min-[880px]:hidden w-full mb-4 animate-in slide-in-from-top-2 duration-300">
            <Input
              autoFocus
              placeholder="Поиск камина..."
              size="md"
              variant="bordered"
              className="w-full bg-white"
              value={searchQuery}
              onValueChange={setSearchQuery}
              classNames={{
                input: "text-[#333] font-['Open_Sans']",
                inputWrapper: 'border-divider focus-within:!border-[#333]',
              }}
            />
          </div>
        )}

        {/* Результаты поиска (Shared) */}
        {isSearchOpen && searchResults.length > 0 && (
          <div className="absolute top-full left-4 right-4 min-[880px]:left-auto min-[880px]:right-0 mt-2 min-[880px]:w-[400px] bg-white shadow-2xl border border-divider rounded-xl overflow-hidden z-[60] animate-in fade-in zoom-in-95 duration-200">
            {searchResults.map((product) => (
              <div
                key={product.id}
                onClick={() => handleResultClick(product.slug)}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 cursor-pointer border-b border-divider last:border-none transition-colors"
              >
                <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                  <img
                    src={productImageUrl(product.imageSources?.[0], 'thumb')}
                    alt={product.name}
                    width={48}
                    height={48}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#333] line-clamp-1">{product.name}</span>
                  <span className="text-xs text-red-600 font-medium">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Row: Menu and Phone (Desktop only) */}
        <div className="hidden min-[880px]:flex justify-between items-center relative">
          <nav className="flex gap-6 lg:gap-10">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative group/item"
                ref={item.hasDropdown ? catalogRef : null}
                onMouseEnter={
                  item.hasDropdown
                    ? () => {
                        if (catalogCloseTimerRef.current) {
                          clearTimeout(catalogCloseTimerRef.current);
                        }
                        setIsCatalogOpen(true);
                      }
                    : undefined
                }
                onMouseLeave={
                  item.hasDropdown
                    ? () => {
                        if (isCatalogHoverLocked) return;
                        catalogCloseTimerRef.current = setTimeout(() => {
                          setIsCatalogOpen(false);
                          setIsCatalogHoverLocked(false);
                          setHoveredCatId(null);
                        }, CATALOG_CLOSE_DELAY_MS);
                      }
                    : undefined
                }
              >
                {item.hasDropdown ? (
                  <button
                    type="button"
                    className="text-[13px] font-normal text-[#333] hover:text-red-600 transition-all font-['Open_Sans',_Helvetica,_Arial,_sans-serif] relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-red-600 after:transition-all hover:after:w-full cursor-pointer"
                  >
                    {item.name}
                  </button>
                ) : (
                  <NextLink
                    href={item.href}
                    className={`text-[13px] font-normal transition-all font-['Open_Sans',_Helvetica,_Arial,_sans-serif] relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-red-600 after:transition-all ${
                      pathname === item.href
                        ? 'text-red-600 after:w-full'
                        : 'text-[#333] after:w-0 hover:text-red-600 hover:after:w-full'
                    }`}
                  >
                    {item.name}
                  </NextLink>
                )}

                {/* Выпадающее меню каталога: открывается по наведению, подкатегории выезжают при hover на категорию */}
                {item.hasDropdown && isCatalogOpen && (
                  <div
                    className="absolute top-full left-0 mt-1 z-[100] animate-in fade-in slide-in-from-top-2 duration-200"
                    onMouseEnter={() => {
                      if (catalogCloseTimerRef.current) clearTimeout(catalogCloseTimerRef.current);
                      setIsCatalogHoverLocked(true);
                    }}
                    onMouseLeave={() => {
                      setIsCatalogHoverLocked(false);
                      catalogCloseTimerRef.current = setTimeout(() => {
                        setIsCatalogOpen(false);
                        setHoveredCatId(null);
                      }, CATALOG_CLOSE_DELAY_MS);
                    }}
                  >
                    <div className="flex items-start">
                      {(() => {
                        const hoveredCat =
                          categories.find((c) => c.id === hoveredCatId) ?? null;
                        const hoveredHasSubs = (hoveredCat?.subcategories?.length ?? 0) > 0;

                        return (
                          <>
                            {/* Колонка 1: категории */}
                            <div
                              className={`w-[260px] bg-[#333] overflow-y-auto max-h-[80vh] overflow-hidden shadow-xl ${
                                hoveredHasSubs ? 'rounded-l-md' : 'rounded-md'
                              }`}
                            >
                              {categories.map((cat) => {
                                const hasSubs = (cat.subcategories?.length ?? 0) > 0;
                                return (
                                  <div
                                    key={cat.id}
                                    className="relative"
                                    onMouseEnter={() => setHoveredCatId(cat.id)}
                                  >
                                    <button
                                      type="button"
                                      onClick={() => handleCategoryClick(cat.slug)}
                                      className="h-10 px-3 text-left text-white text-[13px] font-normal hover:bg-red-600 transition-colors font-['Open_Sans'] w-full flex items-center justify-between"
                                    >
                                      {cat.name}
                                      {hasSubs ? (
                                        <ChevronRight
                                          size={14}
                                          className={`opacity-70 transition-transform ${hoveredCatId === cat.id ? 'translate-x-0.5' : ''}`}
                                        />
                                      ) : null}
                                    </button>
                                  </div>
                                );
                              })}
                              <NextLink
                                href="/shop"
                                onClick={() => setIsCatalogOpen(false)}
                                className="mx-2 mt-1 px-3 py-2 text-left text-white text-[13px] font-bold hover:bg-red-600 transition-colors border-t border-white/10 font-['Open_Sans'] rounded block"
                              >
                                Все категории
                              </NextLink>
                            </div>

                            {/* Колонка 2: подкатегории */}
                            {hoveredHasSubs ? (
                              <div className="w-[260px] bg-[#333] border-l border-white/10 overflow-y-auto max-h-[80vh] overflow-hidden rounded-r-md shadow-xl">
                                {hoveredCat?.subcategories?.map((sub) => (
                                  <button
                                    key={sub.id}
                                    type="button"
                                    onClick={() => handleCategoryClick(sub.slug)}
                                    className="h-10 px-3 text-left text-white/90 text-[12px] hover:bg-red-600 transition-colors font-['Open_Sans'] w-full"
                                  >
                                    {sub.name}
                                  </button>
                                ))}
                              </div>
                            ) : null}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2 text-[#333] font-['Open_Sans',_Helvetica,_Arial,_sans-serif]">
            <Phone size={18} strokeWidth={1.5} />
            <a
              href="tel:+73432002883"
              className="text-[15px] font-normal hover:text-red-600 transition-colors"
            >
              +7 (343) 200-28-83
            </a>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="min-[880px]:hidden fixed inset-0 top-[70px] bg-white z-50 flex flex-col p-6 gap-6 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-500">
            {menuItems.map((item) => (
              <div key={item.name} className="flex flex-col gap-4">
                {item.hasDropdown ? (
                  <>
                    <div
                      className="flex justify-between items-center border-b border-divider pb-4 cursor-pointer select-none"
                      onClick={() => {
                        setIsMobileCatalogOpen((v) => !v);
                        if (isMobileCatalogOpen) {
                          setExpandedMobileCategoryId(null);
                        }
                      }}
                    >
                      <span className="text-xl font-medium text-[#333]">{item.name}</span>
                      <div className="p-2 bg-gray-50 rounded-full">
                        <ChevronRight
                          size={20}
                          className={`transition-transform text-[#333] ${isMobileCatalogOpen ? 'rotate-90' : ''}`}
                        />
                      </div>
                    </div>
                    {isMobileCatalogOpen && (
                      <div className="flex flex-col gap-4 pl-4 animate-in slide-in-from-top-2 duration-500">
                        {categories.map((cat) => {
                          const hasSubs = (cat.subcategories?.length ?? 0) > 0;
                          const isExpanded = expandedMobileCategoryId === cat.id;

                          return (
                            <div key={cat.id}>
                              <div
                                onClick={() => {
                                  if (hasSubs) {
                                    setExpandedMobileCategoryId((id) =>
                                      id === cat.id ? null : cat.id,
                                    );
                                  } else {
                                    handleCategoryClick(cat.slug);
                                  }
                                }}
                                className="flex items-center justify-between text-lg text-gray-600 border-b border-gray-100 pb-2 cursor-pointer"
                              >
                                <span>{cat.name}</span>
                                {hasSubs ? (
                                  <ChevronRight
                                    size={20}
                                    className={`flex-shrink-0 text-gray-400 transition-transform ${
                                      isExpanded ? 'rotate-90' : ''
                                    }`}
                                  />
                                ) : null}
                              </div>
                              {isExpanded && hasSubs
                                ? cat.subcategories?.map((sub) => (
                                    <div
                                      key={sub.id}
                                      onClick={() => handleCategoryClick(sub.slug)}
                                      className="py-2 pl-4 text-base text-gray-500 cursor-pointer hover:bg-gray-50 rounded border-b border-gray-50"
                                    >
                                      {sub.name}
                                    </div>
                                  ))
                                : null}
                            </div>
                          );
                        })}
                        <div
                          onClick={() => {
                            setIsMenuOpen(false);
                            setExpandedMobileCategoryId(null);
                            router.push('/shop');
                          }}
                          className="text-lg font-bold text-red-600 cursor-pointer"
                        >
                          Все категории
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <NextLink
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-xl font-medium border-b border-divider pb-4 ${pathname === item.href ? 'text-red-600' : 'text-[#333]'}`}
                  >
                    {item.name}
                  </NextLink>
                )}
              </div>
            ))}
            <div className="flex items-center gap-4 text-[#333] mt-4">
              <Phone size={24} strokeWidth={1.5} />
              <a href="tel:+73432002883" className="text-lg font-bold">
                +7 (343) 200-28-83
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
