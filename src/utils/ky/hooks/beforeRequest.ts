import { BeforeRequestHook } from 'ky';
import Cookies from 'js-cookie';
import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/cookieKeys';

export const setAuthorizationHeader: BeforeRequestHook = async (
  request,
  options
) => {
  console.log('setAuthorizationHeader');

  const accessToken = Cookies.get(COOKIE_ACCESS_TOKEN_KEY);

  if (accessToken)
    request.headers.set('Authorization', `Bearer ${accessToken}`);
  else request.headers.delete('Authorization');
};
