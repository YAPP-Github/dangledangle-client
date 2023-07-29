import { BeforeRequestHook } from 'ky';
import Cookies from 'js-cookie';
import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/cookieKeys';

type BeforeRequestHookWithProcess = (
  process: NodeJS.Process
) => BeforeRequestHook;

export const setAuthorizationHeader: BeforeRequestHookWithProcess =
  process => async (request, options) => {
    if (process.env?.NEXT_RUNTIME === 'nodejs') return;

    const accessToken = Cookies.get(COOKIE_ACCESS_TOKEN_KEY);

    if (accessToken)
      request.headers.set('Authorization', `Bearer ${accessToken}`);
    else request.headers.delete('Authorization');
  };
