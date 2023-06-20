import { BeforeRequestHook } from 'ky';
import Cookies from 'js-cookie';
import { CLIENT_ACCESS_TOKEN_KEY } from '@/api/cookieKeys';

export const setAuthorizationHeader: BeforeRequestHook = async (
  request,
  options
) => {
  console.log('setAuthorizationHeader');

  const accessToken = Cookies.get(CLIENT_ACCESS_TOKEN_KEY);

  request.headers.set('Authorization', `Bearer ${accessToken}`);
};
