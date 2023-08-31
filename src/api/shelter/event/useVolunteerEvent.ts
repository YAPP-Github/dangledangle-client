import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { VolunteerEvent, get } from './volunteer-event';
import { queryKey } from '../volunteer-event';

export default function useVolunteerEvent(
  shelterId: number,
  volunteerEventId: number,
  options?: UseQueryOptions<VolunteerEvent>
) {
  return useQuery<VolunteerEvent>(
    queryKey.detail(volunteerEventId),
    () => get(shelterId, volunteerEventId),
    {
      ...options
    }
  );
}
