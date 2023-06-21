import api from '@/api/instance';
import { ApiErrorResponse } from '@/types/apiTypes';

export type NickNamePayload = string;

export type NickNameResponse = boolean | ApiErrorResponse;

export const fetchCheckNickname = async (query: NickNamePayload) => {
  const response = await api
    .get(`user/nickname?nickname=${query}`)
    .then(res => res.json<NickNameResponse>());

  return response;
};
