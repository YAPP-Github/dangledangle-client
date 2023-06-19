import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { ObservationAnimal, get } from './observation-animal';
import { shelterKey } from '../queryKey';

export default function useObservationAnimal(
  id: number,
  options?: UseQueryOptions<ObservationAnimal>
) {
  return useQuery<ObservationAnimal>(shelterKey.animal(id), () => get(id), {
    ...options
  });
}
