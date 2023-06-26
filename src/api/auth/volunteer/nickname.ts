import api from '@/api/instance';
import { ApiErrorResponse } from '@/types/apiTypes';

export type NickNamePayload = string;

export type NickNameResponse = {
  isExist: boolean;
};

export const checkNickname = async (query: NickNamePayload) => {
  const response = await api
    .get(`auth/volunteer/nickname/exist?nickname=${query}`)
    .then(res => res.json<NickNameResponse>());

  return response;
};
