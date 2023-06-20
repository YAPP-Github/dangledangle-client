import ky, { AfterResponseHook } from 'ky';
import Cookies from 'js-cookie';
import {
  CLIENT_ACCESS_TOKEN_KEY,
  CLIENT_REFRESH_TOKEN_KEY
} from '@/api/cookieKeys';
import { fetchRefresh } from '@/api/auth/refresh';
import { UNREGISTERED } from '@/api/authErrorCode';
import { AuthErrorResponse } from '@/types/apiTypes';

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

export const returnErrorMessage: AfterResponseHook = async (
  request,
  options,
  response
) => {
  if (response.status > 400) {
    const responseData = await response.json();
    console.log(responseData);
    if (!responseData.exceptionCode)
      throw new Error('에러 형식이 잘못되었습니다');

    return new Response(JSON.stringify(responseData));
  }
};
