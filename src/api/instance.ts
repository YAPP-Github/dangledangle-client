import ky from 'ky';
import { setAuthorizationHeader } from '@/utils/ky/hooks/beforeRequest';
import {
  deleteClientCokiesPath,
  retryRequestOnUnauthorized,
  throwServerErrorMessage
} from '@/utils/ky/hooks/afterResponse';

/**
 * cookie에 있는 authroitoken 저장하는 공간,
 * beforeRequest 훅에서 여기 있는 store를 꺼내서 헤더에 넣어준다.
 */
export const store: { [key in string]: string } = {};

export const setStore = (key: string, value: string) => {
  store[key] = value;
};

const api = ky.extend({
  prefixUrl: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  },
  hooks: {
    beforeRequest: [setAuthorizationHeader(process)],
    afterResponse: [
      retryRequestOnUnauthorized,
      throwServerErrorMessage,
      deleteClientCokiesPath
    ]
  }
});

export default api;
