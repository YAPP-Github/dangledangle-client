import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { get } from './observation-animal';
import { shelterKey } from '../../queryKey';
import { ObservationAnimal } from '@/types/shelter';

export default function useObservationAnimal(
  id: number,
  options?: UseQueryOptions<ObservationAnimal>
) {
  return useQuery<ObservationAnimal>(shelterKey.animal(id), () => get(id), {
    ...options
  });
}
