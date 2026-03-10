import { useEffect, useState } from 'react';
import type { Category } from '@/types/catalog';

const cache: { data: Category[] | null } = { data: null };

export function useCategories() {
  const [categories, setCategories] = useState<Category[] | null>(cache.data);
  const [loading, setLoading] = useState(!cache.data);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache.data) {
      setLoading(false);
      return;
    }
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data: Category[]) => {
        cache.data = data;
        setCategories(data);
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : 'Ошибка загрузки категорий');
      })
      .finally(() => setLoading(false));
  }, []);

  return { categories: categories ?? [], loading, error };
}
