import { useCallback, useState } from 'react';

export type ShelterFilter = 'IN_PROGRESS' | 'DONE' | '';
export type VolunteerFilter = 'NONE' | 'JOINING' | 'WAITING' | 'DONE' | '';

export default function useEventFilter() {
  const [shelterFilter, setShelterFilter] = useState<
    Record<string, VolunteerFilter | ShelterFilter>
  >({
    status: ''
  });

  const handleChipInput = useCallback((name: string, value: string) => {
    let status = value as VolunteerFilter | ShelterFilter;
    setShelterFilter(shelterFilter => ({ ...shelterFilter, [name]: status }));
  }, []);
  return { shelterFilter, handleChipInput };
}
