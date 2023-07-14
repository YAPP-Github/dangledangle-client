import {
  UseMutationOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import { queryKey } from '../admin/volunteer-event';
import { VolEventJoin, participate } from './volunteer-event';

export type PostVolEventParticipateParams = {
  shelterId: number;
  volunteerEventId: number;
};
export default function useParticipateVolEvent(
  options?: UseMutationOptions<
    VolEventJoin,
    unknown,
    PostVolEventParticipateParams
  >
) {
  const queryClient = useQueryClient();
  return useMutation<VolEventJoin, Error, PostVolEventParticipateParams>(
    ({ shelterId, volunteerEventId }) =>
      participate(shelterId, volunteerEventId),
    {
      onSuccess: (data, variables, context) => {
        options?.onSuccess && options.onSuccess(data, variables, context);
        return queryClient.invalidateQueries(
          queryKey.detail(variables.volunteerEventId)
        );
      },
      ...options
    }
  );
}
