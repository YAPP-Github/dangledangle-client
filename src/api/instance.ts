import ky from 'ky';
import { setAuthorizationHeader } from '@/utils/ky/hooks/beforeRequest';
import {
  retryRequestOnUnauthorized,
  throwServerErrorMessage
} from '@/utils/ky/hooks/afterResponse';

const api = ky.create({
  prefixUrl: 'http://3.34.243.139:8080/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  hooks: {
    beforeRequest: [setAuthorizationHeader],
    afterResponse: [retryRequestOnUnauthorized]
  }
});

export default api;
