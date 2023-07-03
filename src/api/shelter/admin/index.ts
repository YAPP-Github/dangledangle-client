import api from '@/api/instance';
import { ShelterInfo } from '@/types/shelter';

export const get = async () => {
  return await api.get('shelter/admin').json<ShelterInfo>();
};
