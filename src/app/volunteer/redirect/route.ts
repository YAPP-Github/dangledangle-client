import {
  CLIENT_ACCESS_TOKEN_KEY,
  CLIENT_REFRESH_TOKEN_KEY
} from '@/api/cookieKeys';
import { RedirectType } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  /**
   * /redirect 뒤에 쿼리로 토큰을 전달받음
   * @param {boolean} isMember: 서버 DB에 유저 데이터가 있는지 여부
   * @param {string?} accessToken: 서버에서 발급된 accessToken
   * @param {string?} refreshToken: 서버에서 발급된 refreshToken
   * */
  const query = new URL(req.url).searchParams;
  const isMember = query.get('isMember') === 'true'; //string URL을 boolean으로 변환
  const receivedAccessToken = query.get('accessToken');
  const receivedRefreshToken = query.get('refreshToken');

  // console.log(req.nextUrl);

  if (!isMember) {
    const res = redirect(`/volunteer/register`, RedirectType.push);
    return res;
  }

  /** 토큰이 하나라도 없으면 로그인 페이지로 다시 리다이렉트 */
  if (!(receivedAccessToken && receivedRefreshToken)) {
    return redirect('/volunteer/login', RedirectType.replace);
  }

  /** next 서버에서 client로 쿠키 세팅*/
  const res = NextResponse.redirect(`${req.nextUrl.origin}/`);
  res.cookies.set(CLIENT_ACCESS_TOKEN_KEY, receivedAccessToken);
  res.cookies.set(CLIENT_REFRESH_TOKEN_KEY, receivedRefreshToken);

  return res;
}
