import api from '@/api/instance';
import { VolunteerEvent } from '@/types/volunteerEvent';

export type GetListByMonthResponse = {
  events: VolunteerEvent[];
};

export type GetListByMonthParams = {
  shelterId: number;
  from: string;
  to: string;
};

export const queryKey = {
  all: ['volunteer-event'] as const,
  list: (shelterId: number) => [...queryKey.all, shelterId, 'list']
};

export const getList = async ({
  shelterId,
  from,
  to
}: GetListByMonthParams) => {
  const data = await api
    .get(`shelter/${shelterId}/volunteer-event?from=${from}&to=${to}`)
    .json<GetListByMonthResponse>();

  return data.events;
};
