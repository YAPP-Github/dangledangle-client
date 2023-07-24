import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { headerServerSideRenderProp } from './utils/setting/headerServerSideRenderProp';
import { matchURL } from './utils/matchUrl';

export async function middleware(req: NextRequest) {
  const matchHeaderURL = matchURL(headerServerSideRenderProp);
  const matchedIndex = matchHeaderURL(req.nextUrl.pathname);

  if (matchedIndex !== null) {
    console.log('passed,req.nextUrl.pathname', req.nextUrl.pathname);
    console.log(
      'str',
      JSON.stringify(headerServerSideRenderProp[matchedIndex])
    );
    const requestHeaders = new Headers(req.headers);
    const str = JSON.stringify(headerServerSideRenderProp[matchedIndex]);
    const buffer = Buffer.from(str, 'utf8');
    const base64String = buffer.toString('base64');
    requestHeaders.set('X-My-Custom-Header', base64String);

    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/(.*)'
};
