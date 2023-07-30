import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import appendHeaderTitle from './utils/middleware/hooks/appendHeaderProps';

export async function middleware(req: NextRequest) {
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
