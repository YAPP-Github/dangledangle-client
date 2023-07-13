import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { VolunteerEvent, get } from './volunteer-event';
import { volteerEventKey } from './queryKey';

export default function useVolunteerEvent(
  shelterId: number,
  volunteerEventId: number,
  options?: UseQueryOptions<VolunteerEvent>
) {
  return useQuery<VolunteerEvent>(
    volteerEventKey.volEvent(shelterId, volunteerEventId),
    () => get(shelterId, volunteerEventId),
    {
      ...options
    }
  );
}
