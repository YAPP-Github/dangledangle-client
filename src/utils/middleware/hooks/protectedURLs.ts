import {
  COOKIE_ACCESS_TOKEN_KEY,
  COOKIE_REDIRECT_URL
} from '@/constants/cookieKeys';
import decodeDangleToken from '@/utils/token/decodeDangleToken';
import { NextResponse, type NextRequest } from 'next/server';

interface HandleAdminURLsProps {
  req: NextRequest;
  requestHeaders: Headers;
}

export default function protectedURLs({
  req,
  requestHeaders
}: HandleAdminURLsProps) {
  const accessToken = req.cookies.get(COOKIE_ACCESS_TOKEN_KEY)?.value || '';
  const { dangle_role: role } = decodeDangleToken(accessToken);

  if (!accessToken) {
    if (req.nextUrl.pathname.startsWith('/admin')) {
      const { pathname, search, origin, basePath } = req.nextUrl;

      if (!req.cookies.get(COOKIE_REDIRECT_URL)?.value) {
        requestHeaders.append(
          'Set-Cookie',
          `${COOKIE_REDIRECT_URL}=${basePath}${pathname}${search}`
        );
      }
      const signUrl = new URL(`${basePath}/login`, origin);
      return {
        redirect: true,
        response: NextResponse.redirect(signUrl, { headers: requestHeaders })
      };
    }
  } else {
    if (
      req.nextUrl.pathname.startsWith('/admin/volunteer') &&
      role !== 'VOLUNTEER'
    ) {
      return {
        redirect: true,
        response: NextResponse.redirect(new URL('/', req.url))
      };
    } else if (
      req.nextUrl.pathname.startsWith('/admin/shelter') &&
      role !== 'SHELTER'
    ) {
      return {
        redirect: true,
        response: NextResponse.redirect(new URL('/', req.url))
      };
    }
  }

  // redirect 필요 없을 시
  return { redirect: false };
}
