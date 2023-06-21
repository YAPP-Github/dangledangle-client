import ky, { AfterResponseHook } from 'ky';
import Cookies from 'js-cookie';
import {
  CLIENT_ACCESS_TOKEN_KEY,
  CLIENT_REFRESH_TOKEN_KEY
} from '@/api/cookieKeys';
import { fetchRefresh } from '@/api/auth/refresh';
import { UNREGISTERED } from '@/api/authErrorCode';
import { ApiErrorResponse } from '@/types/apiTypes';

export const retryRequestOnUnauthorized: AfterResponseHook = async (
  request,
  options,
  response
) => {
  const data = await response.json();
  if (data?.errorCodes === UNREGISTERED) {
    const data = await fetchRefresh();

    const newAccessToken = data.accessToken;
    const newRefreshToken = data.refreshToken;

    Cookies.set(CLIENT_ACCESS_TOKEN_KEY, newAccessToken);
    Cookies.set(CLIENT_REFRESH_TOKEN_KEY, newRefreshToken);

    return ky(request, options);
  }
};

/** ky 에러가 아닌 서버에서 전달받은 에러 throw */
export const throwServerErrorMessage: AfterResponseHook = async (
  request,
  options,
  response
) => {
  if (response.status >= 400) {
    const responseData = (await response.json()) as ApiErrorResponse;
    const { message } = responseData;
    throw new Error(message);
  }
};
