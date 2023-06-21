import { shelterKey } from '@/api/queryKey';
import { PutResponse, put } from './image';
import {
  UseMutationOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

export default function useUpdateImage(
  options?: UseMutationOptions<PutResponse, unknown, string>
) {
  const queryClient = useQueryClient();
  return useMutation<PutResponse, unknown, string>((url: string) => put(url), {
    onSuccess: (data, variables, context) => {
      options?.onSuccess && options.onSuccess(data, variables, context);
      return queryClient.invalidateQueries(shelterKey.info());
    },
    ...options
  });
}
