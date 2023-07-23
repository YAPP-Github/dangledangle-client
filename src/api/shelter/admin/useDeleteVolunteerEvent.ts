import {
  UseMutationOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import { DeleteResponse, remove } from './volunteer-event';
import { queryKey } from '../volunteer-event';

export interface DeleteEventPayload extends DeleteResponse {
  shelterId: number;
}

export default function useDeleteVolunteerEvent(
  options?: UseMutationOptions<DeleteResponse, unknown, DeleteEventPayload>
) {
  const queryClient = useQueryClient();
  return useMutation<DeleteResponse, unknown, DeleteEventPayload>(
    ({ shelterId, volunteerEventId }) => remove(volunteerEventId),
    {
      onSuccess: (data, variables, context) => {
        options?.onSuccess && options.onSuccess(data, variables, context);
        return queryClient.invalidateQueries(
          queryKey.list(variables.shelterId)
        );
      },
      ...options
    }
  );
}
