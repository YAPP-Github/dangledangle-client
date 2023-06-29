import ky from 'ky';
import { setAuthorizationHeader } from '@/utils/ky/hooks/beforeRequest';
import {
  retryRequestOnUnauthorized,
  throwServerErrorMessage
} from '@/utils/ky/hooks/afterResponse';

const api = ky.create({
  prefixUrl: 'https://yapp-dangledangle.com/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  hooks: {
    beforeRequest: [setAuthorizationHeader],
    afterResponse: [retryRequestOnUnauthorized, throwServerErrorMessage]
  }
});

export default api;
