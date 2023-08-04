import {
  RegionOptions,
  VolunteerEventCategory
} from '@/constants/volunteerEvent';
import api from '../instance';
import { EventStatus, HomeVolunteerEvent } from '@/types/volunteerEvent';

export type HomeEventFilter = {
  category?: 'all' | VolunteerEventCategory;
  status?: 'all' | EventStatus;
  longitude?: number;
  latitude?: number;
  address?: '내 주변' | RegionOptions;
  isFavorite?: boolean;
};

export const queryKey = {
  all: 'all-volunteer-event' as const,
  list: (filter: Omit<HomeEventFilter, 'longitude' | 'latitude'>) => [
    queryKey.all,
    filter
  ]
};

export type GetParams = {
  from: string;
  to: string;
  category: VolunteerEventCategory | null;
  status: EventStatus | null;
  longitude: number | null;
  latitude: number | null;
  address: RegionOptions | null;
  isFavorite: boolean | null;
};

export type GetResponse = {
  events: HomeVolunteerEvent[];
  from: string;
  to: string;
};

export const get = async (
  params: HomeEventFilter,
  from: string,
  to: string
): Promise<GetResponse> => {
  const payload: GetParams = {
    category: params.category === 'all' ? null : params.category || null,
    status: params.status === 'all' ? null : params.status || null,
    from,
    to,
    longitude: params.longitude || null,
    latitude: params.latitude || null,
    address: params.address === '내 주변' ? null : params.address || null,
    isFavorite: params.isFavorite || null
  };

  const data = await api
    .post('volunteer-event', { json: payload })
    .json<HomeVolunteerEvent[]>();
  return {
    events: data,
    from,
    to
  };
};
