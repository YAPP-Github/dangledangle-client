import {
  UseMutationOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import { VolInfoPayload, VolResponse, postMyVolInfo, queryKey } from './mypage';

export default function useUpdateVolInfo(
  options?: UseMutationOptions<VolResponse, unknown, VolInfoPayload>
) {
  const queryClient = useQueryClient();
  return useMutation<VolResponse, unknown, VolInfoPayload>(postMyVolInfo, {
    onSuccess: (data, variables, context) => {
      options?.onSuccess && options.onSuccess(data, variables, context);
      return queryClient.invalidateQueries(queryKey.all);
    },
    ...options
  });
}
