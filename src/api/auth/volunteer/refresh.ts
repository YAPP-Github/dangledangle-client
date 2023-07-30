import api from '@/api/instance';

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};
/** 아직 개발되지 않은 api입니다 */
export const fetchRefresh = async () => {
  const response = await api
    .get(`auth/token/refresh`)
    .then(res => res.json<LoginResponse>());

  return response;
};
