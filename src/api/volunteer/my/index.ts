import api from '@/api/instance';

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

export const get = async () => {
  return await api.get('volunteer/my').json<VolunteerMyResponse>();
};
