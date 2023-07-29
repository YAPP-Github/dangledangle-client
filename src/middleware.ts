import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import appendHeaderTitle from './utils/middleware/hooks/appendHeaderProps';
import appendPathName from './utils/middleware/hooks/appendPathName';

export async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);

  appendPathName({ req, requestHeaders });
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
