import { BeforeRequestHook } from 'ky';
import Cookies from 'js-cookie';
import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/cookieKeys';

export const setAuthorizationHeader: BeforeRequestHook = async (
  request,
  options
) => {
  console.log('setAuthorizationHeader');

  // 서버사이드에서 작동하지 않음
  // TODO : 서버사이드에서 ky 사용할 수 있는지 체크 필요
  if (process.env?.NEXT_RUNTIME === 'nodejs') return;

  const accessToken = Cookies.get(COOKIE_ACCESS_TOKEN_KEY);

  if (accessToken)
    request.headers.set('Authorization', `Bearer ${accessToken}`);
  else request.headers.delete('Authorization');
};
