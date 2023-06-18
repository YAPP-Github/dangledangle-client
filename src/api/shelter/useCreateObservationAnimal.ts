import {
  UseMutationOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import {
  ObservationAnimalPayload,
  PostResponse,
  post
} from './observation-animal';
import { shelterKey } from '../queryKey';

export type CreateObservationAnimalParams = {
  payload: ObservationAnimalPayload;
};
export default function useCreateObservationAnimal(
  options?: UseMutationOptions<
    PostResponse,
    unknown,
    CreateObservationAnimalParams
  >
) {
  const queryClient = useQueryClient();
  return useMutation<PostResponse, unknown, CreateObservationAnimalParams>(
    ({ payload }) => post(payload),
    {
      onSuccess: (data, variables, context) => {
        options?.onSuccess && options.onSuccess(data, variables, context);
        return queryClient.invalidateQueries(shelterKey.animalList());
      },
      ...options
    }
  );
}
