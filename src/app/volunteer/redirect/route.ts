import { getTokens } from '@/api/auth/volunteer/token';
import {
  COOKIE_ACCESS_TOKEN_KEY,
  COOKIE_REDIRECT_URL,
  COOKIE_REFRESH_TOKEN_KEY,
  COOKIE_REGISTER_EMAIL_KEY
} from '@/constants/cookieKeys';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { VOLUNTEER_REDIRECT_PATH_REGISTER } from '../register/[...slug]/CurrentComponentTypes';

export async function GET(req: NextRequest) {
  const query = new URL(req.url).searchParams;
  const isMember = query.get('isMember')?.toString() === 'true'; //string으로 전달되는 URL을 boolean으로 변환
  const email = query.get('email')?.toString();
  const authToken = query.get('authToken')?.toString();

  const originUrl = req.nextUrl.origin; // localhost:3000

  /**
   * 유저 없을 시 다음과 같은 url로 리다이렉트
   * /redirect?isMember=false&email=<유저이메일>
   */
  if (isMember === false && email) {
    const res = NextResponse.redirect(
      `${req.nextUrl.origin}${VOLUNTEER_REDIRECT_PATH_REGISTER}`
    );

    /* 현재시간보다 5분 뒤에 expires (5m * 60s * 1000ms */
    const expires = new Date(Date.now() + 5 * 60 * 1000);
    res.cookies.set(COOKIE_REGISTER_EMAIL_KEY, email, { expires });
    return res;
  }

  /**
   * register 이후, /oauth2/authorization/kakao 로 접근했을 경우 다음과 같이 리다이렉트
   * /redirect?authToken=<인증코드>
   */

  if (!authToken) return NextResponse.redirect(originUrl);

  try {
    const { accessToken, refreshToken } = await getTokens({ authToken });

    // TODO : 로그인 이후 리다이렉트 url 변경 필요
    const cookieStore = cookies();
    const redirectPath =
      (await cookieStore.get(COOKIE_REDIRECT_URL)?.value) || '/volunteer';
    const redirectTo = `${originUrl}${decodeURIComponent(redirectPath)}`;
    const res = NextResponse.redirect(redirectTo);

    res.cookies.set(COOKIE_ACCESS_TOKEN_KEY, accessToken, {
      sameSite: 'lax',
      httpOnly: false
    });
    res.cookies.set(COOKIE_REFRESH_TOKEN_KEY, refreshToken, {
      sameSite: 'lax',
      httpOnly: false
    });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.redirect(originUrl);
  }
}
