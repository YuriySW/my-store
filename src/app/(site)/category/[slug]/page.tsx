'use client';

import React, { useEffect, useState, use } from 'react';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import { Spinner } from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { fetchProductsRequest } from '@/store/slices/productsSlice';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state: RootState) => state.products);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProductsRequest());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (unwrappedParams.slug && products.length > 0) {
      const filtered = products.filter(p => 
        p.categorySlug === unwrappedParams.slug.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [unwrappedParams.slug, products]);

  return (
    <main className="max-w-7xl mx-auto w-full px-6 py-12">
      <div className="flex flex-col gap-8">
        <div className="border-b border-divider pb-6">
          <h1 className="text-3xl font-bold uppercase tracking-tighter text-black">
            Категория: {unwrappedParams.slug}
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" color="danger" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-400">
                В этой категории пока нет товаров.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
