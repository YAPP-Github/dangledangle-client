import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getAll } from './observation-animal';
import { shelterKey } from '../../queryKey';
import { ObservationAnimal } from '@/types/shelter';

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
