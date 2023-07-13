import {
  UseMutationOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import { VolEventJoin, participate } from './volunteer-event';
import { volteerEventKey } from './queryKey';

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
          volteerEventKey.volEvent(
            variables.shelterId,
            variables.volunteerEventId
          )
        );
      },
      ...options
    }
  );
}
