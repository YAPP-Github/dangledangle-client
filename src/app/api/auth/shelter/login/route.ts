import { loginShelter } from '@/api/shelter/auth/login';
import {
  COOKIE_ACCESS_TOKEN_KEY,
  COOKIE_REFRESH_TOKEN_KEY
} from '@/constants/cookieKeys';
import { getCookieConfig } from '@/utils/token/cookieConfig';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const cookies = req.cookies;
  const redirectPath = cookies.get('redirectUrl')?.value || '/';
  const redirectTo = `${req.nextUrl.origin}${decodeURIComponent(redirectPath)}`;
  const { email = '', password = '' } = await req.json();

  try {
    if (!email || !password) {
      throw new Error('이메일과 비밀번호를 입력해주세요.');
    }
    const { accessToken, refreshToken } = await loginShelter({
      email,
      password
    });
    const res = NextResponse.json({
      redirectURI: redirectTo,
      success: true,
      status: 200
    });

    const cookieConfig = getCookieConfig(req);

    res.cookies.set(COOKIE_ACCESS_TOKEN_KEY, accessToken, cookieConfig);
    res.cookies.set(COOKIE_REFRESH_TOKEN_KEY, refreshToken, cookieConfig);
    return res;
  } catch (e) {
    const err = e as Error;
    return NextResponse.json({
      error: err.message,
      status: 400
    });
  }
}
