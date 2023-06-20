import {
  UseMutationOptions,
  useQueryClient,
  useMutation
} from '@tanstack/react-query';
import {
  PutResponse,
  ShelterEssentialInfoPayload,
  put
} from './essential-info';
import { shelterKey } from '@/api/queryKey';

export type UpdateEssentialInfoParams = {
  payload: ShelterEssentialInfoPayload;
};
export default function useUpdateEssentialInfo(
  options?: UseMutationOptions<PutResponse, unknown, UpdateEssentialInfoParams>
) {
  const queryClient = useQueryClient();
  return useMutation<PutResponse, unknown, UpdateEssentialInfoParams>(
    ({ payload }) => put(payload),
    {
      onSuccess: (data, variables, context) => {
        options?.onSuccess && options.onSuccess(data, variables, context);
        return queryClient.invalidateQueries(shelterKey.info());
      },
      ...options
    }
  );
}
