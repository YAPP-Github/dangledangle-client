import {
  UseMutationOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import {
  ObservationAnimalPayload,
  PutResponse,
  put
} from './observation-animal';
import { shelterKey } from '../queryKey';

export type UpdateObservationAnimalParams = {
  observationAnimalId: number;
  payload: ObservationAnimalPayload;
};
export default function useUpdateObservationAnimal(
  options?: UseMutationOptions<
    PutResponse,
    unknown,
    UpdateObservationAnimalParams
  >
) {
  const queryClient = useQueryClient();
  return useMutation<PutResponse, unknown, UpdateObservationAnimalParams>(
    ({ observationAnimalId, payload }) => put(observationAnimalId, payload),
    {
      onSuccess: (data, variables, context) => {
        options?.onSuccess && options.onSuccess(data, variables, context);
        return queryClient.invalidateQueries(shelterKey.animalList());
      },
      ...options
    }
  );
}
