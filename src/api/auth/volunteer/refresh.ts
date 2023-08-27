import api, { fe } from '@/api/instance';

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
  const response = await fe.get(`auth/token/refresh`).then(res =>
    res.json<{
      success: boolean;
    }>()
  );

  return response;
};
