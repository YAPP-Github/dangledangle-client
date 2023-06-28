import api from '@/api/instance';

export type NickNamePayload = string;

export type NickNameResponse = {
  isExist: boolean;
};

export const checkNicknameExist = async (query: NickNamePayload) => {
  const response = await api
    .get(`auth/volunteer/exist?type=NICKNAME&value=${query}`)
    .then(res => res.json<NickNameResponse>());

  return response;
};
