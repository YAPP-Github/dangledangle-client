import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import appendHeaderTitle from './utils/middleware/hooks/appendHeaderProps';
import protectedURLs from './utils/middleware/hooks/protectedURLs';

export async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);

  const adminURLsResult = protectedURLs({ req, requestHeaders });
  if (adminURLsResult.redirect) {
    return adminURLsResult.response;
  }

  appendHeaderTitle({ req, requestHeaders });

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
