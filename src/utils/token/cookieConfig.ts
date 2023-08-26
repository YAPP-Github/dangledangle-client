import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest } from 'next/server';

export const getCookieConfig: (
  req: NextRequest
) => Partial<ResponseCookie> = req => ({
  sameSite: 'lax',
  httpOnly: true,
  secure: req?.url.match('localhost') ? false : true
});
