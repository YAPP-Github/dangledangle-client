import { useQuery } from '@tanstack/react-query';
import { get } from './observation-animal';
import { shelterKey } from '../../queryKey';

export default function useObservationAnimalListAtHome({
  shelterId,
  page
}: {
  shelterId: number;
  page: number;
}) {
  return useQuery(shelterKey.observationAnimal(), () =>
    get({ shelterId, page })
  );
}
