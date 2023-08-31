import api from '@/api/instance';
import { Options } from 'ky';

export interface VolunteerMyResponse {
  nickName: string;
  historyStat: {
    done: number;
    waiting: number;
    joining: number;
  };
  phoneNumber: string;
  alarm: boolean;
}

export const get = async (option: Options) => {
  return await api.get('volunteer/my', option).json<VolunteerMyResponse>();
};
