import { BeforeRequestHook } from 'ky';
import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/cookieKeys';
import { store } from '@/api/instance';
import { runtimeCheck } from '@/utils/runtimeCheck';

type BeforeRequestHookWithProcess = (
  process: NodeJS.Process
) => BeforeRequestHook;

export const setAuthorizationHeader: BeforeRequestHookWithProcess =
  process => async (request, options) => {
    if (runtimeCheck() === 'browser') {
      const accessToken = store[COOKIE_ACCESS_TOKEN_KEY];
      if (accessToken) {
        request.headers.delete('Authorization');
        request.headers.set('Authorization', `Bearer ${accessToken}`);
      } else {
        throw new Error('beforeRequest, accessToken is not exist');
      }
    }
  };
