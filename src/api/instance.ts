import ky from 'ky';
import { setAuthorizationHeader } from '@/utils/ky/hooks/beforeRequest';
import { retryRequestOnUnauthorized } from '@/utils/ky/hooks/afterResponse';
const api = ky.create({
  prefixUrl: 'http://152.67.202.74:9090/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  hooks: {
    beforeRequest: [setAuthorizationHeader],
    afterResponse: [retryRequestOnUnauthorized]
  }
});
export default api;

interface Success<T> {
  data: T;
  statusCode: number;
  exceptionCode: string;
}

export const get = async <T>(url: string) => {
  const response = await api(url);
  const data = (await response.json()) as Success<T>;
  const result = { ...data, statusCode: response.status };
  return result;
};

export const post = async <T>(url: string) => {
  const response = await api.post(url);
  const data = (await response.json()) as Success<T>;
  const result = { ...data, statusCode: response.status };
  return result;
};
