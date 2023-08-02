import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { COOKIE_ACCESS_TOKEN_KEY } from './constants/cookieKeys';
import appendHeaderTitle from './utils/middleware/hooks/appendHeaderProps';

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(COOKIE_ACCESS_TOKEN_KEY)?.value || '';

  if (!accessToken) {
    if (req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  const requestHeaders = new Headers(req.headers);
  appendHeaderTitle({ req, requestHeaders });

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: '/((?!.*\\.).*)'
};
