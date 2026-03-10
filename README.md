# Fireline — интернет-магазин биокаминов

Современный интернет-магазин на Next.js с headless CMS и кэшированием.

## Стек

| Слой | Технологии |
|------|------------|
| **Framework** | Next.js 16 (App Router), React 19 |
| **Язык** | TypeScript |
| **Стили** | Tailwind CSS 4 |
| **UI** | NextUI, Framer Motion, Lucide React |
| **State** | Redux Toolkit (createAsyncThunk, кастомный middleware для корзины) |
| **CMS** | Sanity (товары, категории) |
| **Кэш** | Upstash Redis (опционально, для API продуктов) |
| **API** | Next.js Route Handlers (`/api/products`, `/api/categories`, `/api/callback`) |

## Основной функционал

- Каталог и категории из Sanity, страница категории — SSR.
- Карточка товара: SSR, слайдер изображений, характеристики, SEO-метаданные.
- Корзина: добавление/удаление, изменение количества, сохранение в localStorage (middleware).
- Поиск по товарам в Header (данные загружаются при первом открытии).
- Форма «Заказать звонок» (CallbackModal) → `POST /api/callback`.
- Генерация `sitemap.xml` из Sanity.
- Админка Sanity Studio по пути `/admin` с Basic Auth.

## Запуск

```bash
npm install
# создать .env.local и заполнить переменные (см. таблицу ниже)
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000).

## Переменные окружения (.env.local)

| Переменная | Описание |
|------------|----------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID проекта Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | Датасет (например `production`) |
| `ADMIN_USER` | Логин для Basic Auth админки (`/admin`) |
| `ADMIN_PASS` | Пароль для Basic Auth админки |
| `UPSTASH_REDIS_REST_URL` | (Опционально) URL Redis для кэша API |
| `UPSTASH_REDIS_REST_TOKEN` | (Опционально) Токен Redis |
| `NEXT_PUBLIC_SITE_URL` | (Опционально) Базовый URL сайта для sitemap (на проде — домен) |

**Админка:** доступ к `/admin` защищён Basic Auth. Логин и пароль берутся из `ADMIN_USER` и `ADMIN_PASS` в `.env.local` (при деплое — из переменных окружения). Без этих переменных админка вернёт 503.

## Деплой (Vercel)

1. В настройках проекта добавить переменные окружения (в т.ч. `ADMIN_USER`, `ADMIN_PASS` для админки).
2. В Sanity Management Console → Settings → API → CORS Origins добавить URL сайта на Vercel с включённым **Allow credentials**.

## Скрипты

- `npm run dev` — разработка
- `npm run build` — сборка
- `npm run start` — production-сервер
- `npm run lint` — ESLint
