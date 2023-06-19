import api from '@/api/instance';
import { ApiErrorResponse } from '@/types/apiTypes';

export interface LoginPayload {
  email: string;
  password: string;
}

export type LoginResponse =
  | {
      accessToken: string;
      refreshToken: string;
    }
  | ApiErrorResponse;

export const loginShelter = async (data: LoginPayload) => {
  const response = await api
    .post(`auth/shelter/login`, {
      json: data
    })
    .then(res => res.json<LoginResponse>());

  return response;
};
