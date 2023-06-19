import ky, { AfterResponseHook } from 'ky';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/api/cookieKeys';
import { fetchRefresh } from '@/api/auth/refresh';
import { UNREGISTERED } from '@/api/authErrorCode';

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

    Cookies.set(ACCESS_TOKEN_KEY, newAccessToken);
    Cookies.set(REFRESH_TOKEN_KEY, newRefreshToken);

    return ky(request, options);
  }
};
