import api from '@/api/instance';

export interface PutResponse {
  url: string;
}

export const put = async (url: string) => {
  return await api
    .put('shelter/admin/image', {
      json: { url }
    })
    .json<PutResponse>();
};
