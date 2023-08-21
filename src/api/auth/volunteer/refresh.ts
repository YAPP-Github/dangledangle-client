import api from '@/api/instance';
import ky from 'ky';

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};
export type LoginPayload = LoginResponse;

export const fetchRefresh = async (data: LoginResponse) => {
  const response = await api
    .post(`auth/token/refresh`, {
      json: data
    })
    .then(res => res.json<LoginResponse>());
  return response;
};

export const getRefresh = async () => {
  const response = await ky
    .get(`auth/token/refresh`, {
      prefixUrl: process.env.NEXT_PUBLIC_FRONT_ENDPOINT
    })
    .then(res =>
      res.json<{
        success: boolean;
      }>()
    );

  return response;
};
