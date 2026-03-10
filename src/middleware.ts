import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
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
  matcher: '/admin/:path*',
};
