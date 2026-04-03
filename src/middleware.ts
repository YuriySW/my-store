import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Если с кастомного домена из РФ не доходят до edge Vercel те же IP, что для *.vercel.app,
 * HTML отдаётся, а `/_next/*` и `/images/*` таймаутятся. Тогда задаём в Vercel:
 * VERCEL_ASSET_FALLBACK_HOST=my-store-five-silk.vercel.app (без https://)
 * — браузер получит 307 на рабочий хост только для статики/картинок.
 */
function maybeRedirectAssetsToFallbackHost(request: NextRequest): NextResponse | null {
  const fallback = process.env.VERCEL_ASSET_FALLBACK_HOST?.trim();
  if (!fallback) return null;

  const host = request.headers.get('host')?.split(':')[0] ?? '';
  if (!host || host === fallback) return null;

  const { pathname } = request.nextUrl;
  const isAssetPath =
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') ||
    pathname === '/favicon.ico';

  if (!isAssetPath) return null;

  const u = request.nextUrl.clone();
  u.hostname = fallback;
  u.protocol = 'https';
  return NextResponse.redirect(u, 307);
}

export function middleware(request: NextRequest) {
  const assetRedirect = maybeRedirectAssetsToFallbackHost(request);
  if (assetRedirect) return assetRedirect;

  // Проверяем только пути, начинающиеся с /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASS = process.env.ADMIN_PASS;
    if (!ADMIN_USER || !ADMIN_PASS) {
      return new NextResponse('Admin auth not configured', { status: 503 });
    }

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      });
    }

    const auth = authHeader.split(' ')[1];
    const [user, pass] = Buffer.from(auth, 'base64').toString().split(':');

    if (user !== ADMIN_USER || pass !== ADMIN_PASS) {
      return new NextResponse('Invalid credentials', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/_next/:path*', '/images/:path*', '/favicon.ico'],
};
