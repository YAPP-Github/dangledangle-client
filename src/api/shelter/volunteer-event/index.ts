import api from '@/api/instance';
import { VolunteerEvent } from '@/types/volunteerEvent';

export type GetListResponse = {
  events: VolunteerEvent[];
  from: string;
  to: string;
};

export type GetListParams = {
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
}: GetListParams): Promise<GetListResponse> => {
  const data = await api
    .get(`shelter/${shelterId}/volunteer-event?from=${from}&to=${to}`)
    .json<{ events: VolunteerEvent[] }>();

  return {
    events: data.events,
    from,
    to
  };
};
