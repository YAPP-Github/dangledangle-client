import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { queryKey, get } from './volunteer-event';
import { VolunteerEventDetail } from '@/types/volunteerEvent';

export default function useAdminVolunteerEvent(
  eventId: number,
  options?: UseQueryOptions<VolunteerEventDetail>
) {
  return useQuery<VolunteerEventDetail>(
    queryKey.detail(eventId),
    () => get(eventId),
    {
      ...options
    }
  );
}
