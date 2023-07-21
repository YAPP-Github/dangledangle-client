import {
  UseMutationOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import { DeleteResponse, queryKey, remove } from './volunteer-event';

export type DeleteEventPayload = DeleteResponse;

export default function useDeleteVolunteerEvent(
  options?: UseMutationOptions<DeleteResponse, unknown, DeleteEventPayload>
) {
  const queryClient = useQueryClient();
  return useMutation<DeleteResponse, unknown, DeleteEventPayload>(
    ({ volunteerEventId }) => remove(volunteerEventId),
    {
      onSuccess: (data, variables, context) => {
        options?.onSuccess && options.onSuccess(data, variables, context);
        return queryClient.invalidateQueries(queryKey.all);
      },
      ...options
    }
  );
}
