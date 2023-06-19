import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { ObservationAnimal, getAll } from './observation-animal';
import { shelterKey } from '../queryKey';

export default function useObservationAnimalList(
  options?: UseQueryOptions<ObservationAnimal[]>
) {
  return useQuery<ObservationAnimal[]>(
    shelterKey.animalList(),
    () => getAll(),
    {
      ...options
    }
  );
}
