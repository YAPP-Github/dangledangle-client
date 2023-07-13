import {
  UseMutationOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import { VolEventWithdraw, withdraw } from './volunteer-event';
import { volteerEventKey } from './queryKey';

export type PostVolEventWidthdrawParams = {
  shelterId: number;
  volunteerEventId: number;
};
export default function useWithdrawVolEvent(
  options?: UseMutationOptions<
    VolEventWithdraw,
    unknown,
    PostVolEventWidthdrawParams
  >
) {
  const queryClient = useQueryClient();
  return useMutation<VolEventWithdraw, Error, PostVolEventWidthdrawParams>(
    ({ shelterId, volunteerEventId }) => withdraw(shelterId, volunteerEventId),
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
