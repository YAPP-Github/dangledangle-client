import ky, { AfterResponseHook } from 'ky';
import Cookies from 'js-cookie';
import {
  COOKIE_ACCESS_TOKEN_KEY,
  COOKIE_REFRESH_TOKEN_KEY
} from '@/constants/cookieKeys';
import { fetchRefresh } from '@/api/auth/volunteer/refresh';
import { UNREGISTERED } from '@/constants/exceptionCode';
import { ApiErrorResponse } from '@/types/apiTypes';

export const retryRequestOnUnauthorized: AfterResponseHook = async (
  request,
  options,
  response
) => {
  const data = await response.json();

  if (data.exceptionCode === UNREGISTERED) {
    const data = await fetchRefresh();

    const newAccessToken = data.accessToken;
    const newRefreshToken = data.refreshToken;

    Cookies.set(COOKIE_ACCESS_TOKEN_KEY, newAccessToken);
    Cookies.set(COOKIE_REFRESH_TOKEN_KEY, newRefreshToken);

    return ky(request, options);
  }
};

/** api 요청 과정에서 에러 발생시
 *  ky 에러가 아닌 서버에서 전달받은 에러 throw
 */
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
