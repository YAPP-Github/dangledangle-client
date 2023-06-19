import {
  UseMutationOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import {
  ObservationAnimalPayload,
  remove,
  DeleteResponse
} from './observation-animal';
import { shelterKey } from '../queryKey';

export type RemoveObservationAnimalParams = {
  observationAnimalId: number;
  payload: ObservationAnimalPayload;
};
export default function useRemoveObservationAnimal(
  options?: UseMutationOptions<
    DeleteResponse,
    unknown,
    RemoveObservationAnimalParams
  >
) {
  const queryClient = useQueryClient();
  return useMutation<DeleteResponse, unknown, RemoveObservationAnimalParams>(
    ({ observationAnimalId, payload }) => remove(observationAnimalId, payload),
    {
      onSuccess: (data, variables, context) => {
        options?.onSuccess && options.onSuccess(data, variables, context);
        return queryClient.invalidateQueries(shelterKey.animalList());
      },
      ...options
    }
  );
}
