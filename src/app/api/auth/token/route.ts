import { fetchRefresh } from '@/api/auth/volunteer/refresh';
import {
  COOKIE_ACCESS_TOKEN_KEY,
  COOKIE_REFRESH_TOKEN_KEY
} from '@/constants/cookieKeys';
import { getCookieConfig } from '@/utils/token/cookieConfig';
import { NextRequest, NextResponse } from 'next/server';

export default async function GET(req: NextRequest) {
  const cookies = req.cookies;
  const beforeAccessToken = cookies.get(COOKIE_ACCESS_TOKEN_KEY)?.value;
  const beforeRefreshToken = cookies.get(COOKIE_REFRESH_TOKEN_KEY)?.value;
  try {
    if (!(beforeAccessToken && beforeRefreshToken)) {
      throw new Error(
        `${beforeAccessToken || 'accessToken'} ${
          beforeRefreshToken || 'refreshToken'
        } is not exist`
      );
    }
    const data = await fetchRefresh({
      accessToken: beforeAccessToken,
      refreshToken: beforeRefreshToken
    });

    const { accessToken, refreshToken } = data;
    const res = NextResponse.json({
      accessToken,
      refreshToken
    });
    const cookieConfig = getCookieConfig(req);

    res.cookies.set(COOKIE_ACCESS_TOKEN_KEY, accessToken, cookieConfig);
    res.cookies.set(COOKIE_REFRESH_TOKEN_KEY, refreshToken, cookieConfig);

    return res;
  } catch (e) {
    const err = e as Error;
    return NextResponse.json({
      success: false,
      message: err.message
    });
  }
}
