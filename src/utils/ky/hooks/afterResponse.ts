import ky, { AfterResponseHook } from 'ky';
import Cookies from 'js-cookie';
import { COOKIE_REDIRECT_URL } from '@/constants/cookieKeys';
import { getRefresh } from '@/api/auth/volunteer/refresh';
import { ApiErrorResponse } from '@/types/apiTypes';
import { ExceptionCode } from '@/constants/exceptionCode';

type AfterResponseHookWithProcess = (
  process: NodeJS.Process
) => AfterResponseHook;

export const retryRequestOnUnauthorized: AfterResponseHookWithProcess =
  process => async (request, options, response) => {
    console.log('ky에서 에러를잡자', response);
    if (
      !(process.env?.NEXT_RUNTIME === 'nodejs') &&
      !(process.env?.NEXT_RUNTIME === 'edge')
    ) {
      const data = await response.json();
      console.log(data, 'data');
      if (data.exceptionCode === ExceptionCode.UNAUTHENTICATED) {
        const data = await getRefresh();
        if (data.success === true) {
          return ky(request, options);
        } else {
          window.location.href = '/login';
          return;
        }
      }
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

    throw responseData;
  }
};

export const deleteClientCokiesPath: AfterResponseHook = async () => {
  if (Cookies.get(COOKIE_REDIRECT_URL)) {
    Cookies.remove(COOKIE_REDIRECT_URL);
  }
};
