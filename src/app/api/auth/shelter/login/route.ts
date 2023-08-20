import { loginShelter } from '@/api/shelter/auth/login';
import {
  COOKIE_ACCESS_TOKEN_KEY,
  COOKIE_REFRESH_TOKEN_KEY
} from '@/constants/cookieKeys';
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

    res.cookies.set(COOKIE_ACCESS_TOKEN_KEY, accessToken, {
      sameSite: 'strict',
      httpOnly: true
    });
    res.cookies.set(COOKIE_REFRESH_TOKEN_KEY, refreshToken, {
      sameSite: 'strict',
      httpOnly: true
    });
    return res;
  } catch (e) {
    const err = e as Error;
    return NextResponse.json({
      error: err.message,
      status: 400
    });
  }
}
