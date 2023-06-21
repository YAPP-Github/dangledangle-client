import api from '@/api/instance';

export interface PutResponse {
  url: string;
}

export const put = async (url: string) => {
  return await api
    .put('shelter/admin/image', {
      body: JSON.stringify({
        url
      })
    })
    .json<PutResponse>();
};
