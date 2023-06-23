import { BeforeRequestHook } from 'ky';
import Cookies from 'js-cookie';
import { COOKIE_ACCESS_TOKEN_KEY } from '@/api/cookieKeys';

export const setAuthorizationHeader: BeforeRequestHook = async (
  request,
  options
) => {
  const accessToken = Cookies.get(COOKIE_ACCESS_TOKEN_KEY);
  if (!accessToken) return request;
  request.headers.set('Authorization', `Bearer ${accessToken}`);
};
