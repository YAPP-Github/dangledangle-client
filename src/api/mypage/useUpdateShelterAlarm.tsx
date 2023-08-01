import {
  UseMutationOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import {
  BasePayload,
  ShelterResponse,
  postShelterAlarm,
  queryKey
} from './mypage';

export default function useUpdateShelterAlarm(
  options?: UseMutationOptions<ShelterResponse, unknown, BasePayload>
) {
  const queryClient = useQueryClient();
  return useMutation<ShelterResponse, unknown, BasePayload>(postShelterAlarm, {
    onSuccess: (data, variables, context) => {
      options?.onSuccess && options.onSuccess(data, variables, context);
      return queryClient.invalidateQueries(queryKey.all);
    },
    ...options
  });
}
