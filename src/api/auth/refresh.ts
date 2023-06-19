import api from '@/api/instance';

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export const fetchRefresh = async () => {
  const response = await api
    .get(`auth/refresh`)
    .then(res => res.json<LoginResponse>());

  return response;
};
