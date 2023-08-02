import api from '@/api/instance';

export interface ShelterMyResponse {
  name: string;
  historyStat: {
    done: number;
    inProgress: number;
  };
}

export const get = async () => {
  return await api.get('shelter/admin/my').json<ShelterMyResponse>();
};
