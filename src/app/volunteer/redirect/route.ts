import { getTokens } from '@/api/auth/volunteer/token';
import {
  COOKIE_ACCESS_TOKEN_KEY,
  COOKIE_REFRESH_TOKEN_KEY,
  COOKIE_REGISTER_EMAIL_KEY
} from '@/api/cookieKeys';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const query = new URL(req.url).searchParams;
  const isMember = query.get('isMember')?.toString() === 'true'; //string으로 전달되는 URL을 boolean으로 변환
  const email = query.get('email')?.toString();
  const authCode = query.get('authCode')?.toString();

  const originUrl = req.nextUrl.origin; // localhost:3000

  console.log('redirect router, ', query);
  console.log('req.nextUrl', req.nextUrl);

  /**
   * 유저 없을 시 다음과 같은 url로 리다이렉트
   * /redirect?isMember=false&email=<유저이메일>
   */
  if (isMember === false && email) {
    const res = NextResponse.redirect(
      `${req.nextUrl.origin}/volunteer/register`
    );

    /* 현재시간보다 5분 뒤에 expires (5m * 60s * 1000ms */
    const expires = new Date(Date.now() + 5 * 60 * 1000);
    res.cookies.set(COOKIE_REGISTER_EMAIL_KEY, email, { expires });
    return res;
  }

  /**
   * register 이후, /oauth2/authorization/kakao 로 접근했을 경우 다음과 같이 리다이렉트
   * /redirect?authCode=<인증코드>
   */
  if (!authCode) return NextResponse.redirect(originUrl);

  try {
    const { accessToken, refreshToken } = await getTokens({ authCode });

    // TODO : 로그인 이후 리다이렉트 url 변경 필요
    const res = NextResponse.redirect(`${originUrl}/volunteer`);
    res.cookies.set(COOKIE_ACCESS_TOKEN_KEY, accessToken, {
      sameSite: 'lax',
      httpOnly: true
    });
    res.cookies.set(COOKIE_REFRESH_TOKEN_KEY, refreshToken, {
      sameSite: 'lax',
      httpOnly: true
    });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.redirect(originUrl);
  }
}
