import api from '@/api/instance';
import { VolunteerUpcommingEvent } from '@/types/volunteerEvent';

export type VolunteerMyResponse = VolunteerUpcommingEvent;

export const get = async () => {
  return await api
    .get('volunteer/my/volunteer-event/upcoming')
    .json<VolunteerMyResponse>();
};
