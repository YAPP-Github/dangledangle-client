import ky from 'ky';
import { setAuthorizationHeader } from '@/utils/ky/hooks/beforeRequest';
import {
  deleteClientCokiesPath,
  retryRequestOnUnauthorized,
  throwServerErrorMessage
} from '@/utils/ky/hooks/afterResponse';

/**
 * client 사이드에서 httponly 쿠키 사용이 불가능하므로 객체에 저장
 * beforeRequest 훅에서 여기 있는 store를 꺼내서 헤더에 넣어준다.
 */
export const store: { [key in string]: string } = {};

export const setStore = (key: string, value: string) => {
  store[key] = value;
};
export const removeStore = (key: string) => {};

const api = ky.extend({
  prefixUrl: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  },
  hooks: {
    beforeRequest: [setAuthorizationHeader(process)],
    afterResponse: [
      retryRequestOnUnauthorized(process),
      throwServerErrorMessage,
      deleteClientCokiesPath
    ]
  }
});

export const fe = ky.extend({
  prefixUrl: process.env.NEXT_PUBLIC_FRONT_ENDPOINT
});

export default api;
