import { useQuery } from '@tanstack/react-query';
import { get } from '.';
import { shelterKey } from '../../queryKey';

export default function useShelterHomeInfo(id: number) {
  return useQuery(shelterKey.homeInfo(), () => get(id));
}
