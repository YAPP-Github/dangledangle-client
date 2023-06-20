import {
  UseMutationOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import {
  PutResponse,
  ShelterAdditionalInfoPayload,
  put
} from './additional-info';
import { shelterKey } from '@/api/queryKey';

export type UpdateAdditionalInfoParams = {
  payload: ShelterAdditionalInfoPayload;
};
export default function useUpdateAdditionalInfo(
  options?: UseMutationOptions<PutResponse, unknown, UpdateAdditionalInfoParams>
) {
  const queryClient = useQueryClient();
  return useMutation<PutResponse, unknown, UpdateAdditionalInfoParams>(
    ({ payload }) => put(payload),
    {
      onSuccess: (data, variables, context) => {
        options?.onSuccess && options.onSuccess(data, variables, context);
        return queryClient.invalidateQueries(shelterKey.additionalInfo());
      },
      ...options
    }
  );
}
