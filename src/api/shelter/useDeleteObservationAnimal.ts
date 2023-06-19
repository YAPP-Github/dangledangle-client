import {
  UseMutationOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import { remove, DeleteResponse } from './observation-animal';
import { shelterKey } from '../queryKey';

export type DeleteObservationAnimalParams = {
  observationAnimalId: number;
};
export default function useDeleteObservationAnimal(
  options?: UseMutationOptions<
    DeleteResponse,
    unknown,
    DeleteObservationAnimalParams
  >
) {
  const queryClient = useQueryClient();
  return useMutation<DeleteResponse, unknown, DeleteObservationAnimalParams>(
    ({ observationAnimalId }) => remove(observationAnimalId),
    {
      onSuccess: (data, variables, context) => {
        options?.onSuccess && options.onSuccess(data, variables, context);
        return queryClient.invalidateQueries(shelterKey.animalList());
      },
      ...options
    }
  );
}
