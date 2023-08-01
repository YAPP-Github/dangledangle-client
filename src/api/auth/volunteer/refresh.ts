import api from '@/api/instance';

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};
type LoginPayload = LoginResponse;

export const fetchRefresh = async (data: LoginPayload) => {
  const response = await api
    .get(`auth/token/refresh`, {
      json: data
    })
    .then(res => res.json<LoginResponse>());

  return response;
};
