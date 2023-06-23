import api from '@/api/instance';
import { ApiErrorResponse } from '@/types/apiTypes';

export interface RegisterPayload {
  authCode: string;
}

export type RegisterResponse = {
  accessToken: string;
  refreshToken: string;
};

export const getTokens = async (payload: RegisterPayload) => {
  const response = await api
    .post(`auth/volunteer/token`, {
      json: payload
    })
    .then(res => res.json<RegisterResponse>());

  return response;
};
