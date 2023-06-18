import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { ObservationAnimal, get } from './observation-animal';
import { shelterKey } from '../queryKey';

export default function useObservationAnimalList(
  options?: UseQueryOptions<ObservationAnimal[]>
) {
  return useQuery<ObservationAnimal[]>(shelterKey.animalList(), () => get(), {
    ...options
  });
}
